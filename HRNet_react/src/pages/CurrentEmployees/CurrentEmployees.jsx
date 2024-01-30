/* eslint-disable no-unused-vars */
import React from 'react'
import './CurrentEmployees.css'
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable.jsx'
import Menu from '../../components/Menu/Menu'

const CurrentEmployees = () => {
  return (
    <div className="table-container">
      <Menu />
      <EmployeeTable rowsPerPage={10} />
    </div>
  )
}

export default CurrentEmployees
