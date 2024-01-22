import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './CreateEmploye.css'
import Dropdown from '../Dropdown/Dropdown.jsx'
import { useDispatch } from 'react-redux'
import { saveEmployeeData } from './employeeSlice.js'

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

  const dispatch = useDispatch()

  // Ajoutez d'autres états pour les champs restants

  const departments = [
    {
      name: 'Sales',
      key: '1',
    },
    {
      name: 'Marketing',
      key: '2',
    },
    {
      name: 'Engineering',
      key: '3',
    },
    {
      name: 'Human Resources',
      key: '4',
    },
    {
      name: 'Legal',
      key: '5',
    },
  ]

  const countrys = [
    {
      name: 'Alabama',
      key: 'AL',
    },
    {
      name: 'Alaska',
      key: 'AK',
    },
    {
      name: 'American Samoa',
      key: 'AS',
    },
    {
      name: 'Arizona',
      key: 'AZ',
    },
    {
      name: 'Arkansas',
      key: 'AR',
    },
    {
      name: 'California',
      key: 'CA',
    },
    {
      name: 'Colorado',
      key: 'CO',
    },
    {
      name: 'Connecticut',
      key: 'CT',
    },
    {
      name: 'Delaware',
      key: 'DE',
    },
    {
      name: 'District Of Columbia',
      key: 'DC',
    },
    {
      name: 'Federated States Of Micronesia',
      key: 'FM',
    },
    {
      name: 'Florida',
      key: 'FL',
    },
    {
      name: 'Georgia',
      key: 'GA',
    },
    {
      name: 'Guam',
      key: 'GU',
    },
    {
      name: 'Hawaii',
      key: 'HI',
    },
    {
      name: 'Idaho',
      key: 'ID',
    },
    {
      name: 'Illinois',
      key: 'IL',
    },
    {
      name: 'Indiana',
      key: 'IN',
    },
    {
      name: 'Iowa',
      key: 'IA',
    },
    {
      name: 'Kansas',
      key: 'KS',
    },
    {
      name: 'Kentucky',
      key: 'KY',
    },
    {
      name: 'Louisiana',
      key: 'LA',
    },
    {
      name: 'Maine',
      key: 'ME',
    },
    {
      name: 'Marshall Islands',
      key: 'MH',
    },
    {
      name: 'Maryland',
      key: 'MD',
    },
    {
      name: 'Massachusetts',
      key: 'MA',
    },
    {
      name: 'Michigan',
      key: 'MI',
    },
    {
      name: 'Minnesota',
      key: 'MN',
    },
    {
      name: 'Mississippi',
      key: 'MS',
    },
    {
      name: 'Missouri',
      key: 'MO',
    },
    {
      name: 'Montana',
      key: 'MT',
    },
    {
      name: 'Nebraska',
      key: 'NE',
    },
    {
      name: 'Nevada',
      key: 'NV',
    },
    {
      name: 'New Hampshire',
      key: 'NH',
    },
    {
      name: 'New Jersey',
      key: 'NJ',
    },
    {
      name: 'New Mexico',
      key: 'NM',
    },
    {
      name: 'New York',
      key: 'NY',
    },
    {
      name: 'North Carolina',
      key: 'NC',
    },
    {
      name: 'North Dakota',
      key: 'ND',
    },
    {
      name: 'Northern Mariana Islands',
      key: 'MP',
    },
    {
      name: 'Ohio',
      key: 'OH',
    },
    {
      name: 'Oklahoma',
      key: 'OK',
    },
    {
      name: 'Oregon',
      key: 'OR',
    },
    {
      name: 'Palau',
      key: 'PW',
    },
    {
      name: 'Pennsylvania',
      key: 'PA',
    },
    {
      name: 'Puerto Rico',
      key: 'PR',
    },
    {
      name: 'Rhode Island',
      key: 'RI',
    },
    {
      name: 'South Carolina',
      key: 'SC',
    },
    {
      name: 'South Dakota',
      key: 'SD',
    },
    {
      name: 'Tennessee',
      key: 'TN',
    },
    {
      name: 'Texas',
      key: 'TX',
    },
    {
      name: 'Utah',
      key: 'UT',
    },
    {
      name: 'Vermont',
      key: 'VT',
    },
    {
      name: 'Virgin Islands',
      key: 'VI',
    },
    {
      name: 'Virginia',
      key: 'VA',
    },
    {
      name: 'Washington',
      key: 'WA',
    },
    {
      name: 'West Virginia',
      key: 'WV',
    },
    {
      name: 'Wisconsin',
      key: 'WI',
    },
    {
      name: 'Wyoming',
      key: 'WY',
    },
  ]

  const saveEmployee = () => {
    const employeeData = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth.toLocaleDateString(),
      startDate: startDate.toLocaleDateString(),

      // ...autres données
    }

    // Dispatch l'action avec les données de l'employé
    dispatch(saveEmployeeData(employeeData))
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
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            list={countrys}
            description="Select state"
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
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            list={departments}
            description="Select departement"
          />
        </div>
        <button onClick={saveEmployee}>Save</button>
      </form>
    </div>
  )
}

export default CreateEmploye
