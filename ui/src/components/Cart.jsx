import '../styles/Cart.css'

function Cart({ items, onRemove, onIncrease, onDecrease, onOrder }) {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const formatItemName = (item) => {
    if (item.options && item.options.length > 0) {
      return `${item.name} (${item.options.join(', ')})`
    }
    return item.name
  }

  return (
    <div className="cart">
      <h3 className="cart-title">장바구니</h3>
      {items.length === 0 ? (
        <p className="cart-empty">장바구니가 비어있습니다.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items-section">
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{formatItemName(item)}</span>
                    <div className="cart-item-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => onDecrease(item.id)}
                      >
                        -
                      </button>
                      <span className="quantity">X {item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => onIncrease(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <div className="cart-item-price-wrapper">
                      <span className="cart-item-price">
                        {(item.price * item.quantity).toLocaleString()}원
                      </span>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => onRemove(item.id)}
                      title="삭제"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-summary-section">
            <div className="cart-total">
              총 금액 {totalAmount.toLocaleString()}원
            </div>
            <button className="order-btn" onClick={onOrder}>
              주문하기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
