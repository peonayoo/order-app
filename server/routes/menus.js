import express from 'express'
import db, { query, transaction } from '../config/database.js'

const router = express.Router()

// GET /api/menus - 메뉴 목록 조회
router.get('/', async (req, res) => {
  try {
    // 메뉴 목록 조회
    const menus = query(`
      SELECT id, name, description, price, image, stock, created_at, updated_at
      FROM menus
      ORDER BY id
    `)

    // 각 메뉴의 옵션 조회
    const menusWithOptions = menus.map(menu => {
      const options = query(`
        SELECT id, name, price
        FROM options
        WHERE menu_id = ?
        ORDER BY id
      `, [menu.id])

      return {
        id: menu.id,
        name: menu.name,
        description: menu.description,
        price: menu.price,
        image: menu.image,
        stock: menu.stock,
        options: options
      }
    })

    res.json(menusWithOptions)
  } catch (error) {
    console.error('메뉴 목록 조회 오류:', error)
    res.status(500).json({
      error: true,
      message: '메뉴 목록을 조회하는 중 오류가 발생했습니다.',
      code: 'MENU_LIST_ERROR'
    })
  }
})

// GET /api/menus/:menuId - 메뉴 상세 조회
router.get('/:menuId', async (req, res) => {
  try {
    const menuId = parseInt(req.params.menuId)

    if (isNaN(menuId)) {
      return res.status(400).json({
        error: true,
        message: '유효하지 않은 메뉴 ID입니다.',
        code: 'INVALID_MENU_ID'
      })
    }

    // 메뉴 조회
    const menu = query(`
      SELECT id, name, description, price, image, stock, created_at, updated_at
      FROM menus
      WHERE id = ?
    `, [menuId])

    if (menu.length === 0) {
      return res.status(404).json({
        error: true,
        message: '메뉴를 찾을 수 없습니다.',
        code: 'MENU_NOT_FOUND'
      })
    }

    // 옵션 조회
    const options = query(`
      SELECT id, name, price
      FROM options
      WHERE menu_id = ?
      ORDER BY id
    `, [menuId])

    res.json({
      id: menu[0].id,
      name: menu[0].name,
      description: menu[0].description,
      price: menu[0].price,
      image: menu[0].image,
      stock: menu[0].stock,
      options: options
    })
  } catch (error) {
    console.error('메뉴 상세 조회 오류:', error)
    res.status(500).json({
      error: true,
      message: '메뉴 정보를 조회하는 중 오류가 발생했습니다.',
      code: 'MENU_DETAIL_ERROR'
    })
  }
})

// PATCH /api/menus/:menuId/stock - 재고 수정
router.patch('/:menuId/stock', async (req, res) => {
  try {
    const menuId = parseInt(req.params.menuId)
    const { stock } = req.body

    if (isNaN(menuId)) {
      return res.status(400).json({
        error: true,
        message: '유효하지 않은 메뉴 ID입니다.',
        code: 'INVALID_MENU_ID'
      })
    }

    if (stock === undefined || stock === null) {
      return res.status(400).json({
        error: true,
        message: '재고 수량을 입력해주세요.',
        code: 'STOCK_REQUIRED'
      })
    }

    const stockNum = parseInt(stock)
    if (isNaN(stockNum) || stockNum < 0) {
      return res.status(400).json({
        error: true,
        message: '재고 수량은 0 이상의 숫자여야 합니다.',
        code: 'INVALID_STOCK'
      })
    }

    // 메뉴 존재 확인
    const menu = query(`
      SELECT id, name
      FROM menus
      WHERE id = ?
    `, [menuId])

    if (menu.length === 0) {
      return res.status(404).json({
        error: true,
        message: '메뉴를 찾을 수 없습니다.',
        code: 'MENU_NOT_FOUND'
      })
    }

    // 재고 업데이트
    query(`
      UPDATE menus
      SET stock = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [stockNum, menuId])

    res.json({
      id: menuId,
      name: menu[0].name,
      stock: stockNum,
      message: '재고가 업데이트되었습니다.'
    })
  } catch (error) {
    console.error('재고 수정 오류:', error)
    res.status(500).json({
      error: true,
      message: '재고를 수정하는 중 오류가 발생했습니다.',
      code: 'STOCK_UPDATE_ERROR'
    })
  }
})

export default router
