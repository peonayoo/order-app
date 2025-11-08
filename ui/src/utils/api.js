/**
 * API 통신을 위한 바닐라 JavaScript 유틸리티
 */

// 환경 변수 또는 기본값 사용
// VITE_API_URL이 설정되어 있으면 사용, 없으면 기본값
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL
  if (envUrl) {
    // URL에 /api가 이미 포함되어 있는지 확인
    const baseUrl = envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`
    console.log('API URL (환경 변수):', baseUrl)
    return baseUrl
  }
  
  // 프로덕션 환경 감지 (빌드된 파일인지 확인)
  const isProduction = window.location.hostname !== 'localhost' && 
                       window.location.hostname !== '127.0.0.1'
  
  if (isProduction) {
    const prodUrl = 'https://coffee-order-app-server.onrender.com/api'
    console.log('API URL (프로덕션):', prodUrl)
    return prodUrl
  }
  
  // 개발 환경
  const devUrl = 'http://localhost:3001/api'
  console.log('API URL (개발):', devUrl)
  return devUrl
}

const API_BASE_URL = getApiBaseUrl()
console.log('최종 API Base URL:', API_BASE_URL)

/**
 * API 요청을 수행하는 기본 함수
 * @param {string} endpoint - API 엔드포인트
 * @param {Object} options - fetch 옵션
 * @returns {Promise} API 응답
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    const data = await response.json()
    
    if (!response.ok) {
      const error = new Error(data.message || `HTTP error! status: ${response.status}`)
      error.status = response.status
      error.data = data
      throw error
    }
    
    return data
  } catch (error) {
    console.error('API request failed:', error)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.')
    }
    throw error
  }
}

/**
 * GET 요청
 */
export function get(endpoint) {
  return apiRequest(endpoint, { method: 'GET' })
}

/**
 * POST 요청
 */
export function post(endpoint, data) {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

/**
 * PUT 요청
 */
export function put(endpoint, data) {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

/**
 * PATCH 요청
 */
export function patch(endpoint, data) {
  return apiRequest(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  })
}

/**
 * DELETE 요청
 */
export function del(endpoint) {
  return apiRequest(endpoint, { method: 'DELETE' })
}
