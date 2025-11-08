import express from 'express'
import db, { query } from '../config/database.js'

const router = express.Router()

// POST /api/orders - 주문 생성
router.post('/', async (req, res) => {
  try {
    const { items, totalAmount } = req.body

    // 요청 데이터 검증
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: true,
        message: '주문 항목이 필요합니다.',
        code: 'ITEMS_REQUIRED'
      })
    }

    if (totalAmount === undefined || totalAmount === null) {
      return res.status(400).json({
        error: true,
        message: '총 금액이 필요합니다.',
        code: 'TOTAL_AMOUNT_REQUIRED'
      })
    }

    // 재고 확인 및 주문 처리 (트랜잭션)
    const insertOrder = db.transaction((items, totalAmount) => {
      // 1. 재고 확인
      const checkStock = db.prepare(`
        SELECT id, name, stock
        FROM menus
        WHERE id = ?
      `)

      for (const item of items) {
        const menu = checkStock.get(item.menuId)

        if (!menu) {
          throw new Error(`메뉴 ID ${item.menuId}를 찾을 수 없습니다.`)
        }

        if (menu.stock < item.quantity) {
          throw new Error(`${menu.name}의 재고가 부족합니다. (현재: ${menu.stock}, 요청: ${item.quantity})`)
        }
      }

      // 2. 주문 생성
      const insertOrderStmt = db.prepare(`
        INSERT INTO orders (order_time, total_amount, status)
        VALUES (CURRENT_TIMESTAMP, ?, 'received')
      `)
      const orderResult = insertOrderStmt.run(totalAmount)
      const orderId = orderResult.lastInsertRowid

      // 3. 주문 항목 생성 및 재고 차감
      const insertOrderItem = db.prepare(`
        INSERT INTO order_items (order_id, menu_id, menu_name, quantity, price, options, item_total)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)
      
      const updateStock = db.prepare(`
        UPDATE menus
        SET stock = stock - ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)

      for (const item of items) {
        // 주문 항목 생성
        const optionsJson = JSON.stringify(item.options || [])
        insertOrderItem.run(
          orderId,
          item.menuId,
          item.name,
          item.quantity,
          item.price,
          optionsJson,
          item.itemTotal
        )

        // 재고 차감
        updateStock.run(item.quantity, item.menuId)
      }

      return orderId
    })

    const result = insertOrder(items, totalAmount)

    // 주문 정보 조회
    const order = query(`
      SELECT id, order_time, total_amount, status
      FROM orders
      WHERE id = ?
    `, [result])

    res.status(201).json({
      orderId: result,
      orderTime: order[0].order_time,
      totalAmount: order[0].total_amount,
      message: '주문이 완료되었습니다.'
    })
  } catch (error) {
    console.error('주문 생성 오류:', error)
    
    if (error.message.includes('재고가 부족') || error.message.includes('찾을 수 없습니다')) {
      return res.status(400).json({
        error: true,
        message: error.message,
        code: 'INSUFFICIENT_STOCK'
      })
    }

    res.status(500).json({
      error: true,
      message: '주문을 생성하는 중 오류가 발생했습니다.',
      code: 'ORDER_CREATE_ERROR'
    })
  }
})

// GET /api/orders - 주문 목록 조회
router.get('/', async (req, res) => {
  try {
    const { status, limit, offset } = req.query

    let sql = `
      SELECT o.id, o.order_time, o.total_amount, o.status, o.created_at, o.updated_at
      FROM orders o
    `

    const params = []

    if (status) {
      sql += ' WHERE o.status = ?'
      params.push(status)
    }

    sql += ' ORDER BY o.order_time DESC'

    if (limit) {
      const limitNum = parseInt(limit)
      if (!isNaN(limitNum) && limitNum > 0) {
        sql += ' LIMIT ?'
        params.push(limitNum)

        if (offset) {
          const offsetNum = parseInt(offset)
          if (!isNaN(offsetNum) && offsetNum >= 0) {
            sql += ' OFFSET ?'
            params.push(offsetNum)
          }
        }
      }
    }

    const orders = query(sql, params)

    // 각 주문의 항목 조회
    const ordersWithItems = orders.map(order => {
      const items = query(`
        SELECT menu_id as menuId, menu_name as menuName, quantity, price, options, item_total as itemTotal
        FROM order_items
        WHERE order_id = ?
        ORDER BY id
      `, [order.id])

      // options를 JSON 문자열에서 배열로 파싱
      const itemsWithParsedOptions = items.map(item => ({
        menuId: item.menuId,
        menuName: item.menuName,
        quantity: item.quantity,
        price: item.price,
        options: item.options ? JSON.parse(item.options) : [],
        itemTotal: item.itemTotal
      }))

      return {
        id: order.id,
        orderTime: order.order_time,
        totalAmount: order.total_amount,
        status: order.status,
        items: itemsWithParsedOptions
      }
    })

    res.json(ordersWithItems)
  } catch (error) {
    console.error('주문 목록 조회 오류:', error)
    res.status(500).json({
      error: true,
      message: '주문 목록을 조회하는 중 오류가 발생했습니다.',
      code: 'ORDER_LIST_ERROR'
    })
  }
})

// GET /api/orders/:orderId - 주문 상세 조회
router.get('/:orderId', async (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId)

    if (isNaN(orderId)) {
      return res.status(400).json({
        error: true,
        message: '유효하지 않은 주문 ID입니다.',
        code: 'INVALID_ORDER_ID'
      })
    }

    // 주문 조회
    const order = query(`
      SELECT id, order_time, total_amount, status, created_at, updated_at
      FROM orders
      WHERE id = ?
    `, [orderId])

    if (order.length === 0) {
      return res.status(404).json({
        error: true,
        message: '주문을 찾을 수 없습니다.',
        code: 'ORDER_NOT_FOUND'
      })
    }

    // 주문 항목 조회
    const items = query(`
      SELECT menu_id as menuId, menu_name as menuName, quantity, price, options, item_total as itemTotal
      FROM order_items
      WHERE order_id = ?
      ORDER BY id
    `, [orderId])

    // options를 JSON 문자열에서 배열로 파싱
    const itemsWithParsedOptions = items.map(item => ({
      menuId: item.menuId,
      menuName: item.menuName,
      quantity: item.quantity,
      price: item.price,
      options: item.options ? JSON.parse(item.options) : [],
      itemTotal: item.itemTotal
    }))

    res.json({
      id: order[0].id,
      orderTime: order[0].order_time,
      totalAmount: order[0].total_amount,
      status: order[0].status,
      items: itemsWithParsedOptions
    })
  } catch (error) {
    console.error('주문 상세 조회 오류:', error)
    res.status(500).json({
      error: true,
      message: '주문 정보를 조회하는 중 오류가 발생했습니다.',
      code: 'ORDER_DETAIL_ERROR'
    })
  }
})

// PATCH /api/orders/:orderId/status - 주문 상태 변경
router.patch('/:orderId/status', async (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId)
    const { status } = req.body

    if (isNaN(orderId)) {
      return res.status(400).json({
        error: true,
        message: '유효하지 않은 주문 ID입니다.',
        code: 'INVALID_ORDER_ID'
      })
    }

    if (!status) {
      return res.status(400).json({
        error: true,
        message: '주문 상태를 입력해주세요.',
        code: 'STATUS_REQUIRED'
      })
    }

    const validStatuses = ['received', 'inProgress', 'completed', 'cancelled']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: true,
        message: `유효하지 않은 주문 상태입니다. (가능한 값: ${validStatuses.join(', ')})`,
        code: 'INVALID_STATUS'
      })
    }

    // 주문 조회
    const order = query(`
      SELECT id, status
      FROM orders
      WHERE id = ?
    `, [orderId])

    if (order.length === 0) {
      return res.status(404).json({
        error: true,
        message: '주문을 찾을 수 없습니다.',
        code: 'ORDER_NOT_FOUND'
      })
    }

    const currentStatus = order[0].status

    // 상태 전이 규칙 검증
    if (currentStatus === 'completed' || currentStatus === 'cancelled') {
      return res.status(400).json({
        error: true,
        message: `${currentStatus} 상태의 주문은 변경할 수 없습니다.`,
        code: 'STATUS_TRANSITION_INVALID'
      })
    }

    if (currentStatus === 'received' && !['inProgress', 'cancelled'].includes(status)) {
      return res.status(400).json({
        error: true,
        message: 'received 상태에서는 inProgress 또는 cancelled로만 변경할 수 있습니다.',
        code: 'STATUS_TRANSITION_INVALID'
      })
    }

    if (currentStatus === 'inProgress' && !['completed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        error: true,
        message: 'inProgress 상태에서는 completed 또는 cancelled로만 변경할 수 있습니다.',
        code: 'STATUS_TRANSITION_INVALID'
      })
    }

    // 상태 업데이트
    query(`
      UPDATE orders
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [status, orderId])

    res.json({
      orderId: orderId,
      status: status,
      message: '주문 상태가 변경되었습니다.'
    })
  } catch (error) {
    console.error('주문 상태 변경 오류:', error)
    res.status(500).json({
      error: true,
      message: '주문 상태를 변경하는 중 오류가 발생했습니다.',
      code: 'ORDER_STATUS_UPDATE_ERROR'
    })
  }
})

export default router
