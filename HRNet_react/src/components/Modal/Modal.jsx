/**
 * @fileoverview Composant  de modal de confirmation.
 * @module Modal
 */


/* eslint-disable no-unused-vars */
import React from 'react'
import './Modal.css'

/**
 * Composant de modal de confirmation.
 * @param {Object} props - Les props du composant.
 * @param {boolean} props.isVisible - Indique si la modal est visible ou non.
 * @param {Function} props.onClose - Fonction de fermeture de la modal.
 * @returns {JSX.Element|null} Composant de modal de confirmation ou null si la modal n'est pas visible.
 */
const Modal = ({ isVisible, onClose }) => {
  if (!isVisible) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Employee Saved</h4>
        <p>The employee data has been successfully saved.</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  )
}

export default Modal
