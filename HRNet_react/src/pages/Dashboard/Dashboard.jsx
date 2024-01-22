import React from 'react'
import Logo from '../../assets/logo.jpg'
import './Dashboard.css'
import CreateEmploye from '../../components/CreateEmploye/CreateEmploye.jsx'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="menu">
        <img src={Logo} alt="" />
        <h1>HRNet</h1>
        <h2>Dashboard</h2>
      </div>
      <CreateEmploye />
    </div>
  )
}

export default Dashboard
