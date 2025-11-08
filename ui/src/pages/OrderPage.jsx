import { useState, useEffect } from 'react'
import MenuCard from '../components/MenuCard'
import Cart from '../components/Cart'
import Toast from '../components/Toast'
import { get, post } from '../utils/api'
import '../styles/OrderPage.css'

function OrderPage() {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])

  // 메뉴 목록 조회
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true)
        const menus = await get('/menus')
        setMenuItems(menus)
      } catch (error) {
        console.error('메뉴 조회 오류:', error)
        const errorMessage = error.message || '메뉴를 불러오는 중 오류가 발생했습니다.'
        console.error('에러 상세:', {
          message: error.message,
          stack: error.stack,
          status: error.status
        })
        setToast({
          show: true,
          message: errorMessage,
          type: 'error'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMenus()
  }, [])

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
  const handleOrder = async () => {
    if (cartItems.length === 0) {
      setToast({
        show: true,
        message: '장바구니가 비어있습니다.',
        type: 'error'
      })
      return
    }

    try {
      // 주문 데이터 생성
      const orderItems = cartItems.map(item => {
        const menuItem = menuItems.find(m => m.id === item.menuId)
        const basePrice = menuItem ? menuItem.price : item.price
        
        // 옵션 가격 계산
        const optionPrice = item.options.reduce((sum, optName) => {
          if (menuItem) {
            const option = menuItem.options.find(o => o.name === optName)
            return sum + (option ? option.price : 0)
          }
          return sum
        }, 0)
        
        // 단가 = 기본 가격 + 옵션 가격
        const unitPrice = basePrice + optionPrice
        // 항목 총액 = (단가 * 수량)
        const itemTotal = unitPrice * item.quantity
        
        return {
          menuId: item.menuId,
          name: item.name,
          quantity: item.quantity,
          price: unitPrice,
          options: item.options || [],
          itemTotal: itemTotal
        }
      })

      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      // API로 주문 생성
      const result = await post('/orders', {
        items: orderItems,
        totalAmount: totalAmount
      })

      // 성공 메시지 표시
      setToast({
        show: true,
        message: `주문이 완료되었습니다!\n총 금액: ${totalAmount.toLocaleString()}원`,
        type: 'success'
      })

      // 장바구니 초기화
      setCartItems([])

      // 메뉴 목록 새로고침 (재고 업데이트 반영)
      const menus = await get('/menus')
      setMenuItems(menus)
    } catch (error) {
      console.error('주문 생성 오류:', error)
      const errorMessage = error.message || '주문을 생성하는 중 오류가 발생했습니다.'
      setToast({
        show: true,
        message: errorMessage,
        type: 'error'
      })
    }
  }

  // 토스트 닫기
  const closeToast = () => {
    setToast({ show: false, message: '', type: 'success' })
  }

  if (loading) {
    return (
      <div className="order-page">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          메뉴를 불러오는 중...
        </div>
      </div>
    )
  }

  return (
    <div className="order-page">
      <div className="menu-section">
        {menuItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>메뉴를 불러올 수 없습니다.</p>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>
              브라우저 개발자 도구(F12)의 Console 탭을 확인해주세요.
            </p>
          </div>
        ) : (
          <div className="menu-grid">
            {menuItems.map(item => (
              <MenuCard key={item.id} menuItem={item} onAddToCart={addToCart} />
            ))}
          </div>
        )}
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
