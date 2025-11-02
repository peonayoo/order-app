import { useState } from 'react'
import OrderPage from './pages/OrderPage'
import AdminPage from './pages/AdminPage'
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
          <AdminPage />
        )}
      </main>
    </div>
  )
}

export default App
