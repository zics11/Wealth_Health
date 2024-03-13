/**
 * @fileoverview Page Current employees
 * @module CurrentEmployees
 */

/* eslint-disable no-unused-vars */
import React from 'react'
import './CurrentEmployees.css'
import Menu from '../../components/Menu/Menu'
import { useSelector } from 'react-redux'
import { Table } from 'my-simple-table'

/**
 * Composant représentant la liste des employés actuels.
 * @component
 * @returns {JSX.Element} Élément JSX représentant la liste des employés actuels.
 */
const CurrentEmployees = () => {
  const employees = useSelector((state) => state.employee.employees)

  // Définition de l'en-tête de la table
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
      {/* Composant de menu */}
      <Menu />
      <div className="CurrentEmployees-container">
        <h2>Current Employée</h2>
        {/* Tableau des employés */}
        <Table
          datas={employees}
          headers={head}
          apparenceColor="#ebf4c9"
        />
      </div>
    </div>
  )
}

export default CurrentEmployees
