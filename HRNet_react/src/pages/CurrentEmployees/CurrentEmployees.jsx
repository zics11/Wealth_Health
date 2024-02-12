/* eslint-disable no-unused-vars */
import React from 'react'
import './CurrentEmployees.css'
import EmployeeTable from '../../components/EmployeeTable/EmployeeTable.jsx'
import Menu from '../../components/Menu/Menu'
import { useSelector } from 'react-redux'


const CurrentEmployees = () => {
const employees = useSelector((state) => state.employee.employees)
const head = [
  "Street",
  "city",
  "country",
  "dateOfBirth",
  "department",
  "firstName",
  "lastName",
  "startDate",
  "zipCode",
]


  return (
    <div className="table-container">
      <Menu />
      <EmployeeTable rowsPerPage={10} datas={employees} headers={head}/>
    </div>
  )
}

export default CurrentEmployees
