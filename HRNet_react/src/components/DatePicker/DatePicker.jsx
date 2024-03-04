/**
 * @fileoverview Composant de sélection de date.
 * @module DatePicker
 */

import React, { useState, useEffect } from 'react'
import './DatePicker.css'

/**
 * Composant de sélection de date.
 * @param {Object} props - Les props du composant.
 * @param {string} props.apparenceColor - La couleur d'apparence du composant.
 * @param {string} props.inputValue - La valeur actuelle de l'input.
 * @param {Function} props.change - La fonction de mise à jour de la valeur de l'input.
 * @returns {JSX.Element} Composant de sélection de date.
 */

const DatePicker = ({ apparenceColor, inputValue, change }) => {
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
    if (inputValue === '') {
      // Réinitialiser la date sélectionnée si inputValue est null
      setDate('')
    }
  }, [inputValue])

  /**
   * Fonction pour initialiser le calendrier avec le mois courant.
   * @returns {void}
   */
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const currentMonth = ('0' + (new Date().getMonth() + 1)).slice(-2)
    populateCalendar(currentYear, currentMonth)
    setActiveDate(currentYear + currentMonth)
  }, [])

  useEffect(() => {
    handleDateChange(date)
  }, [date])

  /**
   * Fonction pour mettre le focus sur l'input.
   * @returns {void}
   */
  const focus = () => {
    setActive(true)
    setCellHeight(`${document.querySelector('input').offsetWidth / 7}px`)
  }

  /**
   * Fonction pour enlever le focus de l'input.
   * @returns {void}
   */
  const blur = () => {
    setActive(false)
  }

  /**
   * Fonction pour obtenir le mois précédent.
   * @param {string} month - Le mois actuel.
   * @returns {string} Le mois précédent.
   */
  const getPreviousMonth = (month) => {
    if (parseInt(month) === 1) return '12'
    else return ('0' + (parseInt(month) - 1)).slice(-2)
  }

  /**
   * Fonction pour obtenir le mois suivant.
   * @param {string} month - Le mois actuel.
   * @returns {string} Le mois suivant.
   */
  const getNextMonth = (month) => {
    if (parseInt(month) === 12) return '01'
    else return ('0' + (parseInt(month) + 1)).slice(-2)
  }

  /**
   * Fonction pour obtenir le nombre de jours dans un mois.
   * @param {number} year - L'année.
   * @param {string} month - Le mois.
   * @returns {number} Le nombre de jours dans le mois.
   */
  const getNumberOfDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate()
  }

  /**
   * Fonction pour obtenir le nombre de jours dans le mois précédent.
   * @param {number} year - L'année.
   * @param {string} month - Le mois.
   * @returns {number} Le nombre de jours dans le mois précédent.
   */
  const getNumberOfDaysInPreviousMonth = (year, month) => {
    if (month === '01')
      return new Date(year - 1, getPreviousMonth(month), 0).getDate()
    else return new Date(year, getPreviousMonth(month), 0).getDate()
  }

  /**
   * Fonction pour obtenir le premier jour du mois.
   * @param {number} year - L'année.
   * @param {string} month - Le mois.
   * @returns {number} Le premier jour du mois.
   */
  const getFirstDayOfMonth = (year, month) => {
    if (new Date(year, parseInt(month) - 1, 1).getDay() - 1 === -1) return 6
    else return new Date(year, parseInt(month) - 1, 1).getDay() - 1
  }

  /**
   * Fonction pour remplir le calendrier avec les jours du mois.
   * @param {number} year - L'année.
   * @param {string} month - Le mois.
   * @returns {void}
   */
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

  /**
   * Fonction pour définir le mois précédent comme mois actif.
   * @returns {void}
   */
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

  /**
   * Fonction pour définir le mois suivant comme mois actif.
   * @returns {void}
   */
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

  /**
   * Fonction pour sélectionner un jour dans le calendrier.
   * @param {Object} cell - La cellule du calendrier.
   * @returns {void}
   */
  const selectDay = (cell) => {
    if (cell.month === getPreviousMonth(activeDate.substr(4, 2))) {
      setPreviousMonth()
    } else if (cell.month === getNextMonth(activeDate.substr(4, 2))) {
      setNextMonth()
    }
    const newDate =
      ('0' + cell.day).slice(-2) + '/' + cell.month + '/' + cell.year
    // handleDateChange(newDate) // Passer la nouvelle valeur de date à handleDateChange

    setActiveDay(newDate)
    setDate(newDate)
  }

  /**
   * Fonction pour vérifier si une cellule est sélectionnée.
   * @param {Object} cell - La cellule du calendrier.
   * @returns {boolean} True si la cellule est sélectionnée, sinon False.
   */
  const isSelected = (cell) => {
    return ('0' + cell.day).slice(-2) + cell.month + cell.year === activeDay
  }

  /**
   * Fonction pour vérifier si une cellule est désactivée.
   * @param {Object} cell - La cellule du calendrier.
   * @returns {boolean} True si la cellule est désactivée, sinon False.
   */
  const isDisabled = (cell) => {
    return parseInt(cell.month) !== parseInt(activeDate.substr(4, 2))
  }

  /**
   * Fonction pour animer le swipe vers la gauche.
   * @returns {void}
   */
  const animeSwipeLeft = () => {
    setSwipeLeft(true)
    setTimeout(() => {
      setSwipeLeft(false)
    }, 300)
  }

  /**
   * Fonction pour animer le swipe vers la droite.
   * @returns {void}
   */
  const animeSwipeRight = () => {
    setSwipeRight(true)
    setTimeout(() => {
      setSwipeRight(false)
    }, 300)
  }

  /**
   * Fonction pour raccourcir une chaîne de trois caractères.
   * @param {string} item - La chaîne à raccourcir.
   * @returns {string} La chaîne raccourcie.
   */
  const trimThreeChar = (item) => {
    return item.substr(0, 3)
  }

  /**
   * Fonction pour formater le mois et l'année.
   * @returns {string} Le mois et l'année formatés.
   */
  const monthYearFormatted = () => {
    return monthes[activeDate.substr(4, 2)] + ' ' + activeDate.substr(0, 4)
  }

  /**
   * Crée les lignes du calendrier avec les jours.
   * @type {Array<JSX.Element>} Les lignes du calendrier avec les jours.
   */
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

  /**
   * Fonction pour gérer le changement de date.
   * @param {string} newDate - La nouvelle date sélectionnée.
   * @returns {void}
   */
  const handleDateChange = (newDate) => {
    // Diviser la chaîne en jour, mois et année
    const [day, month, year] = newDate.split('/')

    // Créer un nouvel objet Date
    const formattedDate = new Date(`${year}-${month}-${day}`)

    // Vérifier si la date est valide
    if (isNaN(formattedDate.getTime())) {
      return // Sortir de la fonction si la date est invalide
    }

    // Formater la date au format "jj/mm/aaaa"
    const formattedDateString = formattedDate.toISOString().split('T')[0]

    change(formattedDateString) // Appeler la fonction onChange pour transmettre la nouvelle valeur au composant parent
  }

  return (
    <div className="calendar">
      <input
        type="text"
        value={date}
        onChange={handleDateChange} // Appel de la fonction handleDateChange lors du changement de valeur de l'input
        onFocus={focus}
        onBlur={blur}
        placeholder="..."
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
