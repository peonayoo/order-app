import { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import Inventory from '../components/Inventory'
import OrderList from '../components/OrderList'
import { get, patch } from '../utils/api'
import '../styles/AdminPage.css'

function AdminPage() {
  // 관리자 대시보드 데이터
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    receivedOrders: 0,
    inProgressOrders: 0,
    completedOrders: 0
  })

  // 재고 데이터 (메뉴 목록)
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)

  // 주문 데이터
  const [orders, setOrders] = useState([])

  // 메뉴 목록 및 주문 목록 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [menus, ordersData] = await Promise.all([
          get('/menus'),
          get('/orders')
        ])
        
        setInventory(menus.map(menu => ({
          id: menu.id,
          name: menu.name,
          stock: menu.stock
        })))
        setOrders(ordersData)
      } catch (error) {
        console.error('데이터 조회 오류:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // 주기적으로 주문 목록 새로고침 (5초마다)
    const interval = setInterval(async () => {
      try {
        const ordersData = await get('/orders')
        setOrders(ordersData)
      } catch (error) {
        console.error('주문 목록 새로고침 오류:', error)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // 대시보드 데이터 업데이트
  useEffect(() => {
    const received = orders.filter(o => o.status === 'received').length
    const inProgress = orders.filter(o => o.status === 'inProgress').length
    const completed = orders.filter(o => o.status === 'completed').length

    setDashboardData({
      totalOrders: orders.length,
      receivedOrders: received,
      inProgressOrders: inProgress,
      completedOrders: completed
    })
  }, [orders])

  // 재고 수정
  const updateStock = async (menuId, newStock) => {
    try {
      await patch(`/menus/${menuId}/stock`, { stock: newStock })
      
      // 로컬 상태 업데이트
      setInventory(
        inventory.map(item =>
          item.id === menuId ? { ...item, stock: newStock } : item
        )
      )
    } catch (error) {
      console.error('재고 수정 오류:', error)
      alert('재고 수정 중 오류가 발생했습니다.')
    }
  }

  // 재고 증가
  const increaseStock = (menuId) => {
    const item = inventory.find(inv => inv.id === menuId)
    if (item) {
      updateStock(menuId, item.stock + 1)
    }
  }

  // 재고 감소
  const decreaseStock = (menuId) => {
    const item = inventory.find(inv => inv.id === menuId)
    if (item && item.stock > 0) {
      updateStock(menuId, item.stock - 1)
    }
  }

  // 주문 상태 변경
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await patch(`/orders/${orderId}/status`, { status: newStatus })
      
      // 주문 목록 새로고침
      const ordersData = await get('/orders')
      setOrders(ordersData)

      // 재고 정보도 새로고침 (주문 완료 시 재고가 변경될 수 있음)
      const menus = await get('/menus')
      setInventory(menus.map(menu => ({
        id: menu.id,
        name: menu.name,
        stock: menu.stock
      })))
    } catch (error) {
      console.error('주문 상태 변경 오류:', error)
      alert('주문 상태 변경 중 오류가 발생했습니다.')
    }
  }

  // 제조 시작 (주문 접수 -> 제조 중)
  const startManufacturing = (orderId) => {
    updateOrderStatus(orderId, 'inProgress')
  }

  // 제조 완료 (제조 중 -> 제조 완료)
  const completeManufacturing = (orderId) => {
    updateOrderStatus(orderId, 'completed')
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          데이터를 불러오는 중...
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <Dashboard data={dashboardData} />
      <Inventory
        items={inventory}
        onIncrease={increaseStock}
        onDecrease={decreaseStock}
      />
      <OrderList
        orders={orders}
        onStartManufacturing={startManufacturing}
        onCompleteManufacturing={completeManufacturing}
      />
    </div>
  )
}

export default AdminPage
