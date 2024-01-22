import React, { useState } from 'react'
import './Dropdown.css'

const Dropdown = ({ list, description }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (value) => {
    setSelectedValue(value)
    setIsOpen(false)
  }

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-button">
        {selectedValue || description}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {list.map((state) => (
            <li
              key={state.key}
              onClick={() => handleSelect(state.name)}
              className="dropdown-item"
            >
              {state.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
