import { useEffect } from 'react'
import '../styles/Toast.css'

function Toast({ message, onClose, show }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // 3초 후 자동으로 사라짐

      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="toast-container">
      <div className="toast-message">
        <div className="toast-icon">✓</div>
        <div className="toast-text">{message}</div>
      </div>
    </div>
  )
}

export default Toast

