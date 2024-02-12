import './EmployeeTable.css'

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const EmployeeTable = ({ rowsPerPage }) => {
  const employees = useSelector((state) => state.employee.employees)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (employees.length === 0) {
      setCurrentPage(0)
    }
  }, [employees])

  const sortData = (data) => {
    if (!sortColumn) return data

    return [...data].sort((a, b) => {
      // Convertir les dates en objets Date pour le tri
      const dateA = new Date(a[sortColumn])
      const dateB = new Date(b[sortColumn])

      if (dateA < dateB) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (dateA > dateB) {
        return sortDirection === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const renderSortIcon = (column) => {
    if (column !== sortColumn) {
      return null
    }
    return sortDirection === 'asc' ? ' ▲' : ' ▼'
  }

  const getFilteredData = (data) => {
    if (!searchTerm) return data
    return data.filter((employee) =>
      Object.values(employee).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  const filteredEmployees = getFilteredData(employees)
  const sortedEmployees = sortData(filteredEmployees)
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = sortedEmployees.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage)

  return (
    <div className="employee_table_container">
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('firstName')}>
              First Name{renderSortIcon('firstName')}
            </th>
            <th onClick={() => handleSort('lastName')}>
              Last Name{renderSortIcon('lastName')}
            </th>
            <th onClick={() => handleSort('startDate')}>
              Start Date{renderSortIcon('startDate')}
            </th>
            <th onClick={() => handleSort('department')}>
              Department{renderSortIcon('department')}
            </th>
            <th onClick={() => handleSort('dateOfBirth')}>
              Date of Birth{renderSortIcon('dateOfBirth')}
            </th>
            <th onClick={() => handleSort('street')}>
              Street{renderSortIcon('street')}
            </th>
            <th onClick={() => handleSort('city')}>
              City{renderSortIcon('city')}
            </th>
            <th onClick={() => handleSort('state')}>
              State{renderSortIcon('state')}
            </th>
            <th onClick={() => handleSort('zipCode')}>
              Zip Code{renderSortIcon('zipCode')}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td colSpan="9" className="no_data">
                No data available in table
              </td>
            </tr>
          ) : (
            currentRows.map((employee, index) => (
              <tr key={index}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.startDate}</td>
                <td>{employee.department}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.street}</td>
                <td>{employee.city}</td>
                <td>{employee.state}</td>
                <td>{employee.zipCode}</td>
              </tr>
            ))
          )}
        </tbody>{' '}
      </table>

      <div className="pages">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Suivant
        </button>
      </div>
    </div>
  )
}

export default EmployeeTable
