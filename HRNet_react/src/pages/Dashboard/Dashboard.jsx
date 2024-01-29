// eslint-disable-next-line no-unused-vars
import React from 'react'
import Logo from '../../assets/logo.jpg'
import './Dashboard.css'
import CreateEmploye from '../../components/CreateEmploye/CreateEmploye.jsx'
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable.jsx'

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="menu">
        <img src={Logo} alt="" />
        <h1>HRNet</h1>
        <h2>Dashboard</h2>
      </div>
      <CreateEmploye />
      <EmployeeTable rowsPerPage={10} />
    </div>
  )
}

export default Dashboard
