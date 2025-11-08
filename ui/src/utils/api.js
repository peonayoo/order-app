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
  const hostname = window.location.hostname
  const isProduction = hostname !== 'localhost' && 
                       hostname !== '127.0.0.1' &&
                       !hostname.includes('localhost')
  
  console.log('환경 감지:', {
    hostname: hostname,
    isProduction: isProduction,
    VITE_API_URL: envUrl
  })
  
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
  // endpoint 정규화: 앞뒤 슬래시 제거 후 앞에 슬래시 추가
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  // API_BASE_URL의 마지막 슬래시 제거
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL
  const url = `${baseUrl}${normalizedEndpoint}`
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
    console.log('=== API 요청 시작 ===')
    console.log('API Base URL:', API_BASE_URL)
    console.log('Endpoint:', endpoint)
    console.log('최종 요청 URL:', url)
    console.log('요청 옵션:', config)
    
    const response = await fetch(url, config)
    
    console.log('API 응답 상태:', response.status, response.statusText)
    console.log('응답 URL:', response.url)
    
    // 응답이 비어있을 수 있으므로 확인
    const contentType = response.headers.get('content-type')
    let data
    
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text()
      if (text) {
        try {
          data = JSON.parse(text)
        } catch (parseError) {
          console.error('JSON 파싱 오류:', parseError, '응답 텍스트:', text)
          throw new Error('서버 응답을 파싱할 수 없습니다.')
        }
      } else {
        data = {}
      }
    } else {
      data = await response.text()
    }
    
    if (!response.ok) {
      const error = new Error(data.message || data.error || `HTTP error! status: ${response.status}`)
      error.status = response.status
      error.data = data
      console.error('API 오류 응답:', error)
      throw error
    }
    
    console.log('API 응답 성공:', data)
    return data
  } catch (error) {
    console.error('API request failed:', error)
    console.error('요청 URL:', url)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요. (서버가 sleep 모드일 수 있습니다. 잠시 후 다시 시도해주세요.)')
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
