import './EmployeeTable.css'

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const EmployeeTable = ({ rowsPerPage, datas, headers, apparenceColor }) => {
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

  const darkenColor = (color) => {
    // Vérifier si la couleur est au format hexadécimal
    const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/
    if (!hexRegex.test(color)) {
      console.error(
        'Invalid color format. Please provide a valid hexadecimal color.'
      )
      return color
    }

    // Convertir la couleur hexadécimale en valeurs RGB
    let r = parseInt(color.slice(1, 3), 16)
    let g = parseInt(color.slice(3, 5), 16)
    let b = parseInt(color.slice(5, 7), 16)

    // Réduire les valeurs RGB pour assombrir la couleur
    r = Math.round(r * 0.6) // 80% de la valeur originale
    g = Math.round(g * 0.6)
    b = Math.round(b * 0.6)

    // Convertir les valeurs RGB en format hexadécimal
    const darkColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`

    return darkColor
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
      <table
        style={{
          border: darkenColor(apparenceColor),
        }}
      >
        <thead>
          <tr
            style={{
              border: darkenColor(apparenceColor),
            }}
          >
            {headers.map((header, index) => (
              <th
                key={index}
                onClick={() => handleSort(header)}
                style={{
                  backgroundColor: apparenceColor,
                  color: darkenColor(apparenceColor),
                  border: `1px solid ${darkenColor(apparenceColor)}`,
                }}
              >
                {header}
                {renderSortIcon(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredDatas.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="no_data"
                style={{
                  border: `1px solid ${darkenColor(apparenceColor)}`,
                }}
              >
                No data available in table
              </td>
            </tr>
          ) : (
            currentRows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      border: `1px solid ${darkenColor(apparenceColor)}`,
                    }}
                  >
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pages">
        <button
          style={{
            backgroundColor: apparenceColor,
            color: darkenColor(apparenceColor),
          }}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || filteredDatas.length === 0}
        >
          Précédent
        </button>
        <span>
          Page {currentPage} sur {totalPages}
        </span>
        <button
          style={{
            backgroundColor: apparenceColor,
            color: darkenColor(apparenceColor),
          }}
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
