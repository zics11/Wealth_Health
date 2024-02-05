import React, { useState } from 'react'

const DatePicker = ({ selected, onChange }) => {
  const [date, setDate] = useState(selected)

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value)
    setDate(selectedDate)
    onChange(selectedDate)
  }

  return (
    <input
      type="date"
      value={date.toISOString().split('T')[0]}
      onChange={handleDateChange}
    />
  )
}

export default DatePicker
