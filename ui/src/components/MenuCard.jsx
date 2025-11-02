import { useState } from 'react'
import '../styles/MenuCard.css'

function MenuCard({ menuItem, onAddToCart }) {
  const [selectedOptions, setSelectedOptions] = useState(
    menuItem.options.map(opt => ({ ...opt, selected: false }))
  )

  const handleOptionChange = (optionName) => {
    setSelectedOptions(
      selectedOptions.map(opt =>
        opt.name === optionName ? { ...opt, selected: !opt.selected } : opt
      )
    )
  }

  const handleAddToCart = () => {
    onAddToCart(menuItem, selectedOptions)
    // 선택 옵션 초기화
    setSelectedOptions(
      menuItem.options.map(opt => ({ ...opt, selected: false }))
    )
  }

  return (
    <div className="menu-card">
      <div className="menu-image">
        {menuItem.image ? (
          <img 
            src={menuItem.image} 
            alt={menuItem.name}
            className="menu-image-img"
          />
        ) : (
          <div className="image-placeholder">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 150"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0" y1="0" x2="200" y2="150" stroke="#ccc" strokeWidth="1" />
              <line x1="200" y1="0" x2="0" y2="150" stroke="#ccc" strokeWidth="1" />
            </svg>
          </div>
        )}
      </div>
      <div className="menu-info">
        <h3 className="menu-name">{menuItem.name}</h3>
        <p className="menu-price">{menuItem.price.toLocaleString()}원</p>
        <p className="menu-description">{menuItem.description}</p>
        <div className="menu-options">
          {selectedOptions.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="checkbox"
                checked={option.selected}
                onChange={() => handleOptionChange(option.name)}
              />
              <span>
                {option.name} ({option.price > 0 ? `+${option.price.toLocaleString()}원` : '+0원'})
              </span>
            </label>
          ))}
        </div>
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          담기
        </button>
      </div>
    </div>
  )
}

export default MenuCard
