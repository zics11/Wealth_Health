/**
 * @fileoverview Composant de menu déroulant
 * @module Dropdown
 */

import React, { useState } from 'react'
import './Dropdown.css'

/**
 * Composant de menu déroulant.
 * @param {Object} props - Les props du composant.
 * @param {Array<Object>} props.list - La liste des éléments du menu.
 * @param {string} props.description - La description du menu.
 * @param {string} props.value - La valeur sélectionnée.
 * @param {Function} props.onChange - La fonction de gestion du changement de valeur.
 * @returns {JSX.Element} Composant de menu déroulant.
 */
const Dropdown = ({ list, description, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  /**
   * Bascule l'état d'ouverture du menu déroulant.
   */
  const toggleDropdown = () => setIsOpen(!isOpen)

  /**
   * Gère la sélection d'un élément dans le menu déroulant.
   * @param {string} value - La valeur sélectionnée.
   */
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
