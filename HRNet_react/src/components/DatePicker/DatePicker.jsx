import React, { useState, useEffect } from 'react'
import './DatePicker.css'

const DatePicker = ({ apparenceColor, inputValue, onChange }) => {
  const [date, setDate] = useState('')
  const [activeDate, setActiveDate] = useState('201901')
  const [activeDay, setActiveDay] = useState('')
  const [active, setActive] = useState(false)
  const [calendarDays, setCalendarDays] = useState([])
  const [cellHeight, setCellHeight] = useState('')
  const [swipeLeft, setSwipeLeft] = useState(false)
  const [swipeRight, setSwipeRight] = useState(false)

  const days = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ]
  const monthes = {
    '01': 'Janvier',
    '02': 'Février',
    '03': 'Mars',
    '04': 'Avril',
    '05': 'Mai',
    '06': 'Juin',
    '07': 'Juillet',
    '08': 'Août',
    '09': 'Septembre',
    10: 'Octobre',
    11: 'Novembre',
    12: 'Décembre',
  }

  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const currentMonth = ('0' + (new Date().getMonth() + 1)).slice(-2)
    populateCalendar(currentYear, currentMonth)
    setActiveDate(currentYear + currentMonth)
  }, [])

  useEffect(() => {
    handleDateChange(date)
    console.log('date', date)
  }, [date])

  const focus = () => {
    setActive(true)
    setCellHeight(`${document.querySelector('input').offsetWidth / 7}px`)
  }

  const blur = () => {
    setActive(false)
  }

  const getPreviousMonth = (month) => {
    if (parseInt(month) === 1) return '12'
    else return ('0' + (parseInt(month) - 1)).slice(-2)
  }

  const getNextMonth = (month) => {
    if (parseInt(month) === 12) return '01'
    else return ('0' + (parseInt(month) + 1)).slice(-2)
  }

  const getNumberOfDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate()
  }

  const getNumberOfDaysInPreviousMonth = (year, month) => {
    if (month === '01')
      return new Date(year - 1, getPreviousMonth(month), 0).getDate()
    else return new Date(year, getPreviousMonth(month), 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    if (new Date(year, parseInt(month) - 1, 1).getDay() - 1 === -1) return 6
    else return new Date(year, parseInt(month) - 1, 1).getDay() - 1
  }

  const populateCalendar = (year, month) => {
    const firstDayOfMonth = getFirstDayOfMonth(year, month)
    const numberOfRows = Math.ceil(getNumberOfDaysInMonth(year, month) / 7)
    let dayNumber = 1
    let increment = 1
    let rows = []

    for (let x = 0; x <= numberOfRows; x++) {
      let decrement = 0
      let row = []
      let endOfMonth = false

      if (x === 0) {
        for (let i = 0; i < firstDayOfMonth; i++) {
          if (parseInt(month) === 1) {
            row.push({
              day: getNumberOfDaysInPreviousMonth(year, month) - decrement,
              month: getPreviousMonth(month),
              year: parseInt(year) - 1,
            })
          } else {
            row.push({
              day: getNumberOfDaysInPreviousMonth(year, month) - decrement,
              month: getPreviousMonth(month),
              year: parseInt(year),
            })
          }
          decrement++
        }
        row.reverse()
      }

      for (
        let y = row.length;
        y < 7 && y < getNumberOfDaysInMonth(year, month);
        y++
      ) {
        if (dayNumber <= getNumberOfDaysInMonth(year, month)) {
          row.push({ day: dayNumber, month: month, year: year })
          dayNumber++
        } else {
          for (let j = row.length; j < 7; j++) {
            if (parseInt(month) === 12) {
              row.push({
                day: increment,
                month: getNextMonth(month),
                year: parseInt(year) + 1,
              })
            } else {
              row.push({
                day: increment,
                month: getNextMonth(month),
                year: year,
              })
            }
            increment++
          }
        }
      }
      rows.push(row)
    }
    setCalendarDays(rows)
  }

  const setPreviousMonth = () => {
    let activeYear = activeDate.substr(0, 4)
    let activeMonth = activeDate.substr(4, 2)
    if (parseInt(activeMonth) === 1) {
      activeYear = parseInt(activeYear) - 1
      activeMonth = '12'
    } else {
      activeMonth = ('0' + (parseInt(activeMonth) - 1)).slice(-2)
    }
    setActiveDate(activeYear + activeMonth)
    populateCalendar(activeYear, activeMonth)
    animeSwipeRight()
  }

  const setNextMonth = () => {
    let activeYear = activeDate.substr(0, 4)
    let activeMonth = activeDate.substr(4, 2)
    if (parseInt(activeMonth) === 12) {
      activeYear = parseInt(activeYear) + 1
      activeMonth = '01'
    } else {
      activeMonth = ('0' + (parseInt(activeMonth) + 1)).slice(-2)
    }
    setActiveDate(activeYear + activeMonth)
    populateCalendar(activeYear, activeMonth)
    animeSwipeLeft()
  }

  const selectDay = (cell) => {
    if (cell.month === getPreviousMonth(activeDate.substr(4, 2))) {
      setPreviousMonth()
    } else if (cell.month === getNextMonth(activeDate.substr(4, 2))) {
      setNextMonth()
    }
    console.log('dsq')
    const newDate =
      ('0' + cell.day).slice(-2) + '/' + cell.month + '/' + cell.year
    // handleDateChange(newDate) // Passer la nouvelle valeur de date à handleDateChange

    setActiveDay(newDate)
    setDate(newDate)
  }

  const isSelected = (cell) => {
    return ('0' + cell.day).slice(-2) + cell.month + cell.year === activeDay
  }

  const isDisabled = (cell) => {
    return parseInt(cell.month) !== parseInt(activeDate.substr(4, 2))
  }

  const animeSwipeLeft = () => {
    setSwipeLeft(true)
    setTimeout(() => {
      setSwipeLeft(false)
    }, 300)
  }

  const animeSwipeRight = () => {
    setSwipeRight(true)
    setTimeout(() => {
      setSwipeRight(false)
    }, 300)
  }

  const trimThreeChar = (item) => {
    return item.substr(0, 3)
  }

  const monthYearFormatted = () => {
    return monthes[activeDate.substr(4, 2)] + ' ' + activeDate.substr(0, 4)
  }

  const calendarRows = calendarDays.map((row, index) => (
    <div
      className={`calendar-row ${swipeLeft ? 'swipe-left' : ''} ${swipeRight ? 'swipe-right' : ''}`}
      key={index}
    >
      {row.map((cell, index) => (
        <div
          className={`calendar-day ${isDisabled(cell) ? 'disabled' : ''} ${isSelected(cell) ? 'selected' : ''}`}
          style={{
            height: cellHeight,
            color: isSelected(cell) ? apparenceColor : '#606060',
          }}
          key={index}
          onClick={() => selectDay(cell)}
        >
          {cell.day}
        </div>
      ))}
    </div>
  ))

  const handleDateChange = (newDate) => {
    console.log('newDate', newDate)

    // Diviser la chaîne en jour, mois et année
    const [day, month, year] = newDate.split('/')

    // Créer un nouvel objet Date
    const formattedDate = new Date(`${year}-${month}-${day}`)

    // Vérifier si la date est valide
    if (isNaN(formattedDate.getTime())) {
      console.log('Invalid date')
      return // Sortir de la fonction si la date est invalide
    }

    // Formater la date au format "jj/mm/aaaa"
    const formattedDateString = formattedDate.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    console.log('formattedDate', formattedDateString)
    onChange(formattedDateString) // Appeler la fonction onChange pour transmettre la nouvelle valeur au composant parent
  }

  return (
    <div className="calendar">
      <input
        type="text"
        value={date}
        onChange={handleDateChange} // Appel de la fonction handleDateChange lors du changement de valeur de l'input
        onFocus={focus}
        onBlur={blur}
        placeholder="Pick a date"
      />
      <div
        className={`calendar-layout ${active ? '' : 'hidden'}`}
        onMouseDown={(e) => e.preventDefault()}
      >
        <div
          className="calendar-header"
          style={{ backgroundColor: apparenceColor }}
        >
          <div className="row">
            <p className="icons" onClick={setPreviousMonth}>
              〈
            </p>
            <div className="calendar-title">{monthYearFormatted()}</div>
            <p className="icons" onClick={setNextMonth}>
              〉
            </p>
          </div>
          <div className="calendar-days">
            {days.map((day, index) => (
              <div className="day" key={index}>
                {trimThreeChar(day)}
              </div>
            ))}
          </div>
        </div>
        <div className="calendar-body">{calendarRows}</div>
      </div>
    </div>
  )
}

export default DatePicker
