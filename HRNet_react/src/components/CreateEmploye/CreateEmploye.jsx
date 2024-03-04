/**
 * @fileoverview Component for creating an employee.
 * @module CreateEmploye
 */

/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import DatePicker from '../DatePicker/DatePicker'
import './CreateEmploye.css'
import Dropdown from '../Dropdown/Dropdown.jsx'
import { useDispatch } from 'react-redux'
import { saveEmployeeData } from './employeeSlice.js'
import ConfirmationModal from '../Modal/Modal'
import { departments, countrys } from '../../db/dataDropdown'

/**
 * Functional component for creating an employee.
 * @returns {JSX.Element} JSX for CreateEmploye component.
 */
const CreateEmploye = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [country, setCountry] = useState('')
  const [Street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [department, setDepartment] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch()

  /**
   * Resets the form fields to their initial values.
   * @returns {void}
   */
  const resetForm = () => {
    // Reset all state values to their initial values
    setFirstName('')
    setLastName('')
    setDateOfBirth('') // Reset date of birth to current date
    setStartDate('') // Reset start date to current date
    setCountry('')
    setStreet('')
    setCity('')
    setZipCode('')
    setDepartment('')
    setErrors({})
  }

  /**
   * Validates the form fields and returns any errors found.
   * @returns {Object} Object containing error messages for invalid fields.
   */
  const validateForm = () => {
    const errors = {}

    if (!firstName.trim()) {
      errors.firstName = 'First Name is required'
    }

    if (!lastName.trim()) {
      errors.lastName = 'Last Name is required'
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = 'Date of Birth is required'
    }

    if (!startDate) {
      errors.startDate = 'Start Date is required'
    }

    if (!country) {
      errors.country = 'Country is required'
    }

    if (!Street.trim()) {
      errors.Street = 'Street is required'
    }

    if (!city.trim()) {
      errors.city = 'City is required'
    }

    if (!zipCode.trim()) {
      errors.zipCode = 'Zip Code is required'
    } else if (!/^\d+$/.test(zipCode)) {
      errors.zipCode = 'Zip Code must be a number'
    }

    if (!department) {
      errors.department = 'Department is required'
    }

    return errors
  }

  /**
   * Fonction pour sauvegarder les données de l'employé après validation.
   * @returns {void}
   */

  const saveEmployee = () => {
    // Valider le formulaire pour détecter les erreurs
    const errors = validateForm()

    // Vérifier s'il n'y a pas d'erreurs dans le formulaire
    if (Object.keys(errors).length === 0) {
      // Créer un objet contenant les données de l'employé à sauvegarder
      const employeeData = {
        firstName,
        lastName,
        dateOfBirth,
        startDate,
        country,
        Street,
        city,
        zipCode,
        department,
      }

      // Envoyer les données de l'employé au magasin en dispatchant l'action
      dispatch(saveEmployeeData(employeeData))
      // Réinitialiser le formulaire après l'envoi des données
      resetForm()
      // Afficher la modal de confirmation après avoir sauvegardé les données
      setIsModalVisible(true)
    } else {
      // Mettre à jour l'état des erreurs si le formulaire est invalide
      setErrors(errors)
    }
  }

  return (
    <div className="CreateEmploye-container">
      <h2>Create Employée</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="Imput-container">
          <div className="CreateEmploye-container_imput">
            <div className="input">
              <label htmlFor="firstName">First Name</label>
              <div className="error-container">
                <input
                  type="text"
                  value={firstName}
                  id="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <span className="error">{errors.firstName}</span>
                )}
              </div>
            </div>
            <div className="input">
              <label htmlFor="lastName">Last Name</label>
              <div className="error-container">
                <input
                  type="text"
                  value={lastName}
                  id="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <span className="error">{errors.lastName}</span>
                )}
              </div>
            </div>
            <div className="input">
              <label>Date of birth</label>
              <div className="error-container">
                <DatePicker
                  apparenceColor="rgb(110, 133, 15)"
                  inputValue={dateOfBirth}
                  change={setDateOfBirth}
                />
                {errors.dateOfBirth && (
                  <span className="error">{errors.dateOfBirth}</span>
                )}
              </div>
            </div>
          </div>
          <div className="CreateEmploye-container_imput">
            <div className="input">
              <label htmlFor="Street">Street</label>
              <div className="error-container">
                <input
                  type="text"
                  value={Street}
                  id="Street"
                  onChange={(e) => setStreet(e.target.value)}
                />
                {errors.Street && (
                  <span className="error">{errors.Street}</span>
                )}
              </div>
            </div>
            <div className="input">
              <label htmlFor="city">City</label>
              <div className="error-container">
                <input
                  type="text"
                  value={city}
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
            </div>
            <div className="input">
              <label htmlFor="country">Country</label>
              <div className="error-container">
                <Dropdown
                  list={countrys}
                  description="..."
                  value={country}
                  onChange={setCountry}
                />
                {errors.country && (
                  <span className="error">{errors.country}</span>
                )}
              </div>
            </div>
            <div className="input">
              <label htmlFor="zipCode">Zip code</label>
              <div className="error-container">
                <input
                  type="text"
                  value={zipCode}
                  id="zipCode"
                  onChange={(e) => setZipCode(e.target.value)}
                />
                {errors.zipCode && (
                  <span className="error">{errors.zipCode}</span>
                )}
              </div>
            </div>
          </div>
          <div className="CreateEmploye-container_imput">
            <div className="input">
              <label>Start date</label>
              <div className="error-container">
                <DatePicker
                  apparenceColor="rgb(110, 133, 15)"
                  inputValue={startDate}
                  change={setStartDate}
                />
                {errors.startDate && (
                  <span className="error">{errors.startDate}</span>
                )}
              </div>
            </div>
            <div className="input">
              <label htmlFor="department">Department</label>
              <div className="error-container">
                <Dropdown
                  list={departments}
                  description="..."
                  value={department}
                  onChange={setDepartment}
                />
                {errors.department && (
                  <span className="error">{errors.department}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <button onClick={saveEmployee} className="save">
          Save
        </button>
      </form>
      <ConfirmationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  )
}

export default CreateEmploye
