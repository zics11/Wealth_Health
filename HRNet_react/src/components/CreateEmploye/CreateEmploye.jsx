/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import DatePicker from '../DatePicker/DatePicker'
import './CreateEmploye.css'
import Dropdown from '../Dropdown/Dropdown.jsx'
import { useDispatch } from 'react-redux'
import { saveEmployeeData } from './employeeSlice.js'
import ConfirmationModal from '../Modal/Modal'
import { departments, countrys } from '../../db/dataDropdown'

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

  const resetForm = () => {
    setFirstName('')
    setLastName('')
    setDateOfBirth('') // Réinitialiser la date de naissance à la date actuelle
    setStartDate('') // Réinitialiser la date de début à la date actuelle
    setCountry('')
    setStreet('')
    setCity('')
    setZipCode('')
    setDepartment('')
    setErrors({})
  }

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

  const saveEmployee = () => {
    const errors = validateForm()
    if (Object.keys(errors).length === 0) {
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
      // Dispatch l'action avec les données de l'employé
      dispatch(saveEmployeeData(employeeData))
      resetForm()
      setIsModalVisible(true)
    } else {
      setErrors(errors)
    }
  }

  return (
    <div className="CreateEmploye-container">
      <h3>Create Employée</h3>
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
