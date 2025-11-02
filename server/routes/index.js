import express from 'express'

const router = express.Router()

// API 상태 확인
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString()
  })
})

export default router

