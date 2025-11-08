import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import indexRoutes from './routes/index.js'
import menusRoutes from './routes/menus.js'
import ordersRoutes from './routes/orders.js'

// 환경 변수 로드
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// 미들웨어
// CORS 설정: 프런트엔드 URL 허용
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://coffee-order-app-ui.onrender.com',
  'http://localhost:3000'
].filter(Boolean) // undefined 제거

app.use(cors({
  origin: function (origin, callback) {
    // origin이 없거나 허용된 origin이면 허용
    if (!origin || allowedOrigins.some(allowed => origin.includes(allowed.replace('https://', '').replace('http://', '')))) {
      callback(null, true)
    } else {
      // 개발 중이거나 허용 목록에 없어도 일단 허용 (개발 편의)
      callback(null, true)
    }
  },
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 기본 라우트
app.get('/', (req, res) => {
  res.json({
    message: '커피 주문 앱 API 서버',
    version: '1.0.0'
  })
})

// API 라우트

app.use('/api', indexRoutes)
app.use('/api/menus', menusRoutes)
app.use('/api/orders', ordersRoutes)

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: true,
    message: err.message || '서버 오류가 발생했습니다.',
    code: err.code || 'INTERNAL_SERVER_ERROR'
  })
})

// 404 핸들러
app.use((req, res) => {
  res.status(404).json({
    error: true,
    message: '요청한 리소스를 찾을 수 없습니다.',
    path: req.path
  })
})

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`)
  console.log(`API 엔드포인트: http://localhost:${PORT}`)
})

export default app

