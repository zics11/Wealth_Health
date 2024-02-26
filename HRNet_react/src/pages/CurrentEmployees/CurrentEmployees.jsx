/* eslint-disable no-unused-vars */
import React from 'react'
import './CurrentEmployees.css'
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable.jsx'
import Menu from '../../components/Menu/Menu'
import { useSelector } from 'react-redux'

const CurrentEmployees = () => {
  const employees = useSelector((state) => state.employee.employees)
  const head = [
    { key: 'Street', name: 'Street' },
    { key: 'city', name: 'City' },
    { key: 'country', name: 'Country' },
    { key: 'dateOfBirth', name: 'Date of Birth' },
    { key: 'department', name: 'Département' },
    { key: 'firstName', name: 'First name' },
    { key: 'lastName', name: 'Last name' },
    { key: 'startDate', name: 'Start date' },
    { key: 'zipCode', name: 'Zip code' },
  ]

  return (
    <div className="table-container">
      <Menu />
      <div className="CurrentEmployees-container">
        <h3>Current Employée</h3>

        <EmployeeTable
          rowsPerPage={10}
          datas={employees}
          headers={head}
          apparenceColor="#ebf4c9"
        />
      </div>
    </div>
  )
}

export default CurrentEmployees
