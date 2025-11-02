/**
 * 로컬 스토리지 관리를 위한 바닐라 JavaScript 유틸리티
 */

const CART_STORAGE_KEY = 'cozy_cart'
const ORDER_STORAGE_KEY = 'cozy_orders'

/**
 * 로컬 스토리지에서 데이터 가져오기
 */
export function getFromStorage(key) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.error('Error reading from storage:', error)
    return null
  }
}

/**
 * 로컬 스토리지에 데이터 저장하기
 */
export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error('Error saving to storage:', error)
    return false
  }
}

/**
 * 로컬 스토리지에서 데이터 삭제하기
 */
export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error('Error removing from storage:', error)
    return false
  }
}

/**
 * 장바구니 관련 함수들
 */
export const cartStorage = {
  get: () => getFromStorage(CART_STORAGE_KEY) || [],
  save: (cart) => saveToStorage(CART_STORAGE_KEY, cart),
  clear: () => removeFromStorage(CART_STORAGE_KEY),
}

/**
 * 주문 내역 관련 함수들
 */
export const orderStorage = {
  get: () => getFromStorage(ORDER_STORAGE_KEY) || [],
  save: (orders) => saveToStorage(ORDER_STORAGE_KEY, orders),
  add: (order) => {
    const orders = orderStorage.get()
    orders.push({ ...order, id: Date.now(), createdAt: new Date().toISOString() })
    orderStorage.save(orders)
    return orders
  },
}
