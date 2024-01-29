import React, { useState } from 'react'
import './Dropdown.css'

const Dropdown = ({ list, description, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (value) => {
    onChange(value)
    setIsOpen(false)
  }

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-button">
        {value || description}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {list.map((item) => (
            <li
              key={item.key}
              onClick={() => handleSelect(item.name)}
              className="dropdown-item"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
