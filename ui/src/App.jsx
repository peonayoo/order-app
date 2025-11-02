import { useState } from 'react'
import OrderPage from './pages/OrderPage'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('order')

  return (
    <div className="app">
      <header className="header">
        <div className="logo">COZY</div>
        <nav className="nav">
          <button 
            className={`nav-btn ${currentPage === 'order' ? 'active' : ''}`}
            onClick={() => setCurrentPage('order')}
          >
            주문하기
          </button>
          <button 
            className={`nav-btn ${currentPage === 'admin' ? 'active' : ''}`}
            onClick={() => setCurrentPage('admin')}
          >
            관리자
          </button>
        </nav>
      </header>
      
      <main className="main">
        {currentPage === 'order' ? (
          <OrderPage />
        ) : (
          <div className="admin-page">
            <h1>관리자 화면</h1>
            <p>관리자 화면이 여기에 표시됩니다.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
