import express from 'express'
const router = express.Router()

// TODO: 메뉴 관련 라우트 구현
// GET /api/menus - 메뉴 목록 조회
// GET /api/menus/:menuId - 메뉴 상세 조회
// PATCH /api/menus/:menuId/stock - 재고 수정

router.get('/', (req, res) => {
  res.json({ message: '메뉴 목록 조회 API (구현 예정)' })
})

router.get('/:menuId', (req, res) => {
  res.json({ message: '메뉴 상세 조회 API (구현 예정)' })
})

router.patch('/:menuId/stock', (req, res) => {
  res.json({ message: '재고 수정 API (구현 예정)' })
})

export default router

