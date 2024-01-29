/* eslint-disable no-unused-vars */
import React from 'react'
import './Dashboard.css'
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable.jsx'

const CurrentEmployees = () => {
  return (
    <div className="dashboard-container">
      <EmployeeTable rowsPerPage={10} />
    </div>
  )
}

export default CurrentEmployees
