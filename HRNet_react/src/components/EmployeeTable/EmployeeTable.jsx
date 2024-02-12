import './EmployeeTable.css'

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const EmployeeTable = ({ rowsPerPage, datas, headers }) => {
  // const employees = useSelector((state) => state.employee.employees)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  EmployeeTable.propTypes = {
    rowsPerPage: PropTypes.number.isRequired,
    datas: PropTypes.arrayOf(PropTypes.object).isRequired,
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }
  useEffect(() => {
    if (datas.length === 0) {
      setCurrentPage(0)
    }
  }, [datas])

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
      Object.values(employee).some((value) => {
        if (value !== null && value !== undefined) {
          return value
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        }
        return false // Si la valeur est null ou undefined, retourne false
      })
    )
  }

  const filteredDatas = getFilteredData(datas)
  const sortedDatas = sortData(filteredDatas)
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = sortedDatas.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(filteredDatas.length / rowsPerPage)

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
            {headers.map((header, index) => (
              <th key={index} onClick={() => handleSort(header)}>
                {header}
                {renderSortIcon(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredDatas.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="no_data">
                No data available in table
              </td>
            </tr>
          ) : (
            currentRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>{row[header]}</td>
                ))}
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
