import { useEffect } from 'react'
import '../styles/Toast.css'

function Toast({ message, onClose, show, type = 'success' }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // 3초 후 자동으로 사라짐

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  const icon = type === 'error' ? '✕' : '✓'

  return (
    <div className="toast-container">
      <div className={`toast-message toast-${type}`}>
        <div className="toast-icon">{icon}</div>
        <div className="toast-text">{message}</div>
      </div>
    </div>
  )
}

export default Toast

