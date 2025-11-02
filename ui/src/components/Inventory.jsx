import '../styles/Inventory.css'

function Inventory({ items, onIncrease, onDecrease }) {
  const getStockStatus = (stock) => {
    if (stock === 0) return { text: '품절', className: 'status-danger' }
    if (stock < 5) return { text: '주의', className: 'status-warning' }
    return { text: '정상', className: 'status-normal' }
  }

  return (
    <div className="inventory-section">
      <h2 className="section-title">재고 현황</h2>
      <div className="inventory-grid">
        {items.map(item => {
          const status = getStockStatus(item.stock)
          return (
            <div key={item.id} className="inventory-card">
              <div className="inventory-name">{item.name}</div>
              <div className="inventory-stock">
                <span className="stock-count">{item.stock}개</span>
                <span className={`stock-status ${status.className}`}>
                  {status.text}
                </span>
              </div>
              <div className="inventory-controls">
                <button
                  className="stock-btn decrease"
                  onClick={() => onDecrease(item.id)}
                  disabled={item.stock === 0}
                >
                  -
                </button>
                <button
                  className="stock-btn increase"
                  onClick={() => onIncrease(item.id)}
                >
                  +
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Inventory

