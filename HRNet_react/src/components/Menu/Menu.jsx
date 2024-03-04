/**
 * @fileoverview Composant contenant le menu de l'application
 * @module Menu
 */

import React from 'react'
import Logo from '../../assets/logo.jpg'
import './Menu.css'
import { NavLink } from 'react-router-dom'

/**
 * Composant de menu.
 * @returns {JSX.Element} Composant de menu.
 */
const Menu = () => {
  return (
    <div className="menu-container">
      {/* Logo de l'application */}
      <div className="logo">
        <img src={Logo} alt="" />
        <h1>HRNet</h1>
      </div>
      {/* Liens de navigation */}
      <div className="menu">
        <NavLink to="/home" className="link" activeclassname="active">
          Home
        </NavLink>
        <NavLink to="/table" className="link" activeclassname="active">
          Current Employee
        </NavLink>
      </div>
    </div>
  )
}

export default Menu
