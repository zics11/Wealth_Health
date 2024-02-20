/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
// import DatePicker from 'react-datepicker'
import DatePicker from '../DatePicker/DatePicker'
import 'react-datepicker/dist/react-datepicker.css'
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
  }

  const saveEmployee = () => {
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
  }

  return (
    <div className="CreateEmploye-container">
      <h3>Create Employée</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="Imput-container">
          <div className="CreateEmploye-container_imput">
            <div className="input">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                value={firstName}
                id="firstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                value={lastName}
                id="lastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="input">
              <label>Date of birth</label>
              <DatePicker
                apparenceColor="rgb(110, 133, 15)"
                inputValue={dateOfBirth}
                change={setDateOfBirth}
              />
            </div>
          </div>
          <div className="CreateEmploye-container_imput">
            <div className="input">
              <label htmlFor="Street">Street</label>
              <input
                type="text"
                value={Street}
                id="Street"
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="city">City</label>
              <input
                type="text"
                value={city}
                id="city"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="country">Country</label>
              <Dropdown
                list={countrys}
                description="..."
                value={country}
                onChange={setCountry}
              />
            </div>
            <div className="input">
              <label htmlFor="zipCode">Zip code</label>
              <input
                type="text"
                value={zipCode}
                id="zipCode"
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>
          <div className="CreateEmploye-container_imput">
            <div className="input">
              <label>Start date</label>
              <DatePicker
                apparenceColor="rgb(110, 133, 15)"
                inputValue={startDate}
                change={setStartDate}
              />
            </div>
            <div className="input">
              <label htmlFor="department">Department</label>
              <Dropdown
                list={departments}
                description="..."
                value={department}
                onChange={setDepartment}
              />
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
