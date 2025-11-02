import '../styles/OrderList.css'

function OrderList({ orders, onStartManufacturing, onCompleteManufacturing }) {
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${month}월 ${day}일 ${hours}:${minutes}`
  }

  const formatMenuItems = (items) => {
    return items.map(item => {
      const options = item.options && item.options.length > 0
        ? ` (${item.options.join(', ')})`
        : ''
      return `${item.name}${options} x ${item.quantity}`
    }).join(', ')
  }

  const getStatusButton = (order) => {
    if (order.status === 'received') {
      return (
        <button
          className="status-btn start-btn"
          onClick={() => onStartManufacturing(order.id)}
        >
          제조 시작
        </button>
      )
    } else if (order.status === 'inProgress') {
      return (
        <button
          className="status-btn complete-btn"
          onClick={() => onCompleteManufacturing(order.id)}
        >
          제조 완료
        </button>
      )
    } else if (order.status === 'completed') {
      return (
        <button className="status-btn completed-btn" disabled>
          제조 완료
        </button>
      )
    }
    return null
  }

  // 시간순 정렬 (최신순)
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.orderTime) - new Date(a.orderTime)
  )

  return (
    <div className="order-list-section">
      <h2 className="section-title">주문 현황</h2>
      {orders.length === 0 ? (
        <div className="order-empty">
          주문이 없습니다.
        </div>
      ) : (
        <div className="order-list">
          {sortedOrders.map(order => (
            <div key={order.id} className="order-item">
              <div className="order-info">
                <div className="order-datetime">
                  {formatDateTime(order.orderTime)}
                </div>
                <div className="order-items">
                  {formatMenuItems(order.items)}
                </div>
                <div className="order-amount">
                  {order.totalAmount.toLocaleString()}원
                </div>
              </div>
              <div className="order-actions">
                {getStatusButton(order)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrderList

