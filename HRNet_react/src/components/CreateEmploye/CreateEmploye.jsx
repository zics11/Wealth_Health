import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
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
  const [dateOfBirth, setDateOfBirth] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
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
    setDateOfBirth(new Date())
    setStartDate(new Date())
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
      dateOfBirth: dateOfBirth.toLocaleDateString(),
      startDate: startDate.toLocaleDateString(),
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
        <div className="CreateEmploye-container_imput">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            value={firstName}
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            value={lastName}
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Date of birth</label>
          <DatePicker
            selected={dateOfBirth}
            onChange={(date) => setDateOfBirth(date)}
          />
        </div>

        <div className="CreateEmploye-container_imput">
          <label htmlFor="Street">Street</label>
          <input
            type="text"
            value={Street}
            id="Street"
            onChange={(e) => setStreet(e.target.value)}
          />
          <label htmlFor="city">City</label>
          <input
            type="text"
            value={city}
            id="city"
            onChange={(e) => setCity(e.target.value)}
          />
          <Dropdown
            list={countrys}
            description="Select Country"
            value={country}
            onChange={setCountry}
          />
          <label htmlFor="zipCode">Zip code</label>
          <input
            type="text"
            value={zipCode}
            id="zipCode"
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div className="CreateEmploye-container_imput">
          <label>Start date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <Dropdown
            list={departments}
            description="Select département"
            value={department}
            onChange={setDepartment}
          />
        </div>
        <button onClick={saveEmployee}>Save</button>
      </form>
      <ConfirmationModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  )
}

export default CreateEmploye