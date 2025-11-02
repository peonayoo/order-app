import express from 'express'
const router = express.Router()

// TODO: 주문 관련 라우트 구현
// POST /api/orders - 주문 생성
// GET /api/orders - 주문 목록 조회
// GET /api/orders/:orderId - 주문 상세 조회
// PATCH /api/orders/:orderId/status - 주문 상태 변경

router.post('/', (req, res) => {
  res.json({ message: '주문 생성 API (구현 예정)' })
})

router.get('/', (req, res) => {
  res.json({ message: '주문 목록 조회 API (구현 예정)' })
})

router.get('/:orderId', (req, res) => {
  res.json({ message: '주문 상세 조회 API (구현 예정)' })
})

router.patch('/:orderId/status', (req, res) => {
  res.json({ message: '주문 상태 변경 API (구현 예정)' })
})

export default router

