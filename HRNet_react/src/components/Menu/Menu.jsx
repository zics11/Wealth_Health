import React from 'react'
import Logo from '../../assets/logo.jpg'
import './Menu.css'
import { NavLink } from 'react-router-dom'

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="logo">
        <img src={Logo} alt="" />
        <h1>HRNet</h1>
      </div>
      <div className="menu">
        <NavLink to="/home" className="link" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/table" className="link" activeClassName="active">
          Current Employee
        </NavLink>
      </div>
    </div>
  )
}

export default Menu
