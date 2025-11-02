import { useState } from 'react'
import MenuCard from '../components/MenuCard'
import Cart from '../components/Cart'
import Toast from '../components/Toast'
import '../styles/OrderPage.css'

function OrderPage() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  // 임의의 커피 메뉴 데이터 (이미지 URL 포함)
  const menuItems = [
    {
      id: 1,
      name: '아메리카노(ICE)',
      price: 4000,
      description: '시원하고 깔끔한 아이스 아메리카노',
      image: '/images/americano-ice.jpg.jpg',
      options: [
        { name: '샷 추가', price: 500 },
        { name: '시럽 추가', price: 0 }
      ]
    },
    {
      id: 2,
      name: '아메리카노(HOT)',
      price: 4000,
      description: '따뜻하고 진한 핫 아메리카노',
      image: '/images/americano-hot.jpg.jpg',
      options: [
        { name: '샷 추가', price: 500 },
        { name: '시럽 추가', price: 0 }
      ]
    },
    {
      id: 3,
      name: '카페라떼',
      price: 5000,
      description: '부드러운 우유와 에스프레소의 조화',
      image: '/images/latte.jpg.jpg',
      options: [
        { name: '샷 추가', price: 500 },
        { name: '시럽 추가', price: 0 }
      ]
    }
  ]

  const [cartItems, setCartItems] = useState([])

  // 장바구니에 추가
  const addToCart = (menuItem, selectedOptions) => {
    const optionNames = selectedOptions
      .filter(opt => opt.selected)
      .map(opt => opt.name)
      .sort()

    const optionPrice = selectedOptions
      .filter(opt => opt.selected)
      .reduce((sum, opt) => sum + opt.price, 0)

    const totalPrice = menuItem.price + optionPrice

    // 동일한 메뉴와 옵션 조합 찾기
    const existingItemIndex = cartItems.findIndex(
      item =>
        item.menuId === menuItem.id &&
        JSON.stringify(item.options.sort()) === JSON.stringify(optionNames)
    )

    if (existingItemIndex >= 0) {
      // 기존 아이템 수량 증가
      const updatedItems = [...cartItems]
      updatedItems[existingItemIndex].quantity += 1
      updatedItems[existingItemIndex].price = totalPrice
      setCartItems(updatedItems)
    } else {
      // 새 아이템 추가
      const newItem = {
        id: Date.now(),
        menuId: menuItem.id,
        name: menuItem.name,
        price: totalPrice,
        options: optionNames,
        quantity: 1
      }
      setCartItems([...cartItems, newItem])
    }
  }

  // 장바구니에서 제거
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId))
  }

  // 수량 증가
  const increaseQuantity = (itemId) => {
    setCartItems(
      cartItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  // 수량 감소
  const decreaseQuantity = (itemId) => {
    setCartItems(
      cartItems
        .map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  // 주문하기
  const handleOrder = () => {
    if (cartItems.length === 0) {
      setToast({
        show: true,
        message: '장바구니가 비어있습니다.',
        type: 'error'
      })
      return
    }

    // 재고 확인
    try {
      const savedInventory = JSON.parse(localStorage.getItem('inventory') || '[]')
      const insufficientItems = []
      
      cartItems.forEach(cartItem => {
        const inventoryItem = savedInventory.find(inv => inv.id === cartItem.menuId)
        if (!inventoryItem || inventoryItem.stock < cartItem.quantity) {
          insufficientItems.push(cartItem.name)
        }
      })

      if (insufficientItems.length > 0) {
        setToast({
          show: true,
          message: `재고가 부족합니다:\n${insufficientItems.join(', ')}`,
          type: 'error'
        })
        return
      }
    } catch (error) {
      console.error('Error checking inventory:', error)
      // 재고 확인 실패 시에도 주문 진행 (데이터 일관성을 위해)
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    // 주문 데이터 생성
    const newOrder = {
      id: Date.now(),
      orderTime: new Date().toISOString(),
      items: cartItems.map(item => ({
        menuId: item.menuId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        options: item.options || []
      })),
      totalAmount: totalAmount,
      status: 'received' // 주문 접수 상태
    }

    // localStorage에 주문 추가
    try {
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      existingOrders.push(newOrder)
      localStorage.setItem('orders', JSON.stringify(existingOrders))

      // 토스트 메시지 표시
      setToast({
        show: true,
        message: `주문이 완료되었습니다!\n총 금액: ${totalAmount.toLocaleString()}원`,
        type: 'success'
      })
      
      setCartItems([])
    } catch (error) {
      console.error('Error saving order:', error)
      setToast({
        show: true,
        message: '주문 저장 중 오류가 발생했습니다.',
        type: 'error'
      })
    }
  }

  // 토스트 닫기
  const closeToast = () => {
    setToast({ show: false, message: '', type: 'success' })
  }

  return (
    <div className="order-page">
      <div className="menu-section">
        <div className="menu-grid">
          {menuItems.map(item => (
            <MenuCard key={item.id} menuItem={item} onAddToCart={addToCart} />
          ))}
        </div>
      </div>

      <Cart
        items={cartItems}
        onRemove={removeFromCart}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onOrder={handleOrder}
      />

      <Toast
        message={toast.message}
        show={toast.show}
        type={toast.type}
        onClose={closeToast}
      />
    </div>
  )
}

export default OrderPage
