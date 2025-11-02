import { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import Inventory from '../components/Inventory'
import OrderList from '../components/OrderList'
import '../styles/AdminPage.css'

function AdminPage() {
  // 관리자 대시보드 데이터
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    receivedOrders: 0,
    inProgressOrders: 0,
    completedOrders: 0
  })

  // 재고 데이터 (주문하기 화면과 동일한 메뉴 ID 사용) - localStorage에서 로드
  const [inventory, setInventory] = useState(() => {
    try {
      const savedInventory = localStorage.getItem('inventory')
      if (savedInventory) {
        return JSON.parse(savedInventory)
      }
    } catch (error) {
      console.error('Error loading inventory from localStorage:', error)
    }
    // 기본값
    return [
      { id: 1, name: '아메리카노(ICE)', stock: 10 },
      { id: 2, name: '아메리카노(HOT)', stock: 10 },
      { id: 3, name: '카페라떼', stock: 10 }
    ]
  })

  // 재고 데이터가 변경될 때마다 localStorage 업데이트
  useEffect(() => {
    try {
      localStorage.setItem('inventory', JSON.stringify(inventory))
    } catch (error) {
      console.error('Error saving inventory to localStorage:', error)
    }
  }, [inventory])

  // 주문 데이터 - localStorage에서 로드
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('orders')
      return savedOrders ? JSON.parse(savedOrders) : []
    } catch (error) {
      console.error('Error loading orders from localStorage:', error)
      return []
    }
  })

  // localStorage storage 이벤트를 통한 주문 데이터 동기화 (더 효율적)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'orders' && e.newValue) {
        try {
          const parsedOrders = JSON.parse(e.newValue)
          setOrders(parsedOrders)
        } catch (error) {
          console.error('Error parsing orders from storage event:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    // 같은 탭 내에서 localStorage 변경 감지 (storage 이벤트는 다른 탭에서만 발생)
    // 같은 탭에서는 직접 확인
    const checkOrders = () => {
      try {
        const savedOrders = localStorage.getItem('orders')
        if (savedOrders) {
          const parsedOrders = JSON.parse(savedOrders)
          setOrders(prevOrders => {
            // 실제 변경이 있을 때만 업데이트
            if (JSON.stringify(prevOrders) !== JSON.stringify(parsedOrders)) {
              return parsedOrders
            }
            return prevOrders
          })
        }
      } catch (error) {
        console.error('Error checking orders:', error)
      }
    }

    const interval = setInterval(checkOrders, 500) // 0.5초마다 확인 (성능 개선)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // 주문 데이터가 변경될 때마다 localStorage 업데이트
  useEffect(() => {
    try {
      localStorage.setItem('orders', JSON.stringify(orders))
    } catch (error) {
      console.error('Error saving orders to localStorage:', error)
    }
  }, [orders])

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

  // 재고 증가
  const increaseStock = (menuId) => {
    setInventory(
      inventory.map(item =>
        item.id === menuId ? { ...item, stock: item.stock + 1 } : item
      )
    )
  }

  // 재고 감소
  const decreaseStock = (menuId) => {
    setInventory(
      inventory.map(item =>
        item.id === menuId && item.stock > 0
          ? { ...item, stock: item.stock - 1 }
          : item
      )
    )
  }

  // 주문 상태 변경
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  // 제조 시작 (주문 접수 -> 제조 중)
  const startManufacturing = (orderId) => {
    updateOrderStatus(orderId, 'inProgress')
  }

  // 제조 완료 (제조 중 -> 제조 완료)
  const completeManufacturing = (orderId) => {
    const order = orders.find(o => o.id === orderId)
    if (!order) return

    // 재고 차감 (한 번에 처리)
    setInventory(prevInventory => {
      const updatedInventory = [...prevInventory]
      order.items.forEach(item => {
        const inventoryIndex = updatedInventory.findIndex(inv => inv.id === item.menuId)
        if (inventoryIndex >= 0) {
          updatedInventory[inventoryIndex] = {
            ...updatedInventory[inventoryIndex],
            stock: Math.max(0, updatedInventory[inventoryIndex].stock - item.quantity)
          }
        }
      })
      return updatedInventory
    })
    
    // 주문 상태 업데이트
    updateOrderStatus(orderId, 'completed')
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

