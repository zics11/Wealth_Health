/**
 * Module gérant les actions liées aux employés.
 * @module employeeSlice
 */

import { createSlice } from '@reduxjs/toolkit'

/**
 * Slice Redux pour gérer les données des employés.
 * @type {import('@reduxjs/toolkit').Slice}
 */
export const employeeSlice = createSlice({
  name: 'employee', // Nom du slice
  initialState: {
    employees: [], // Stocke les employés dans un tableau
  },
  reducers: {
    /**
     * Reducer pour sauvegarder les données d'un employé.
     * @param {Object} state - L'état actuel du slice.
     * @param {Object} action - L'action contenant les données de l'employé.
     * @param {Object} action.payload - Les données de l'employé à sauvegarder.
     */
    saveEmployeeData: (state, action) => {
      // Ajoute le nouvel employé à la liste
      state.employees.push(action.payload)

      // Optionnel: Sauvegarde également dans le localStorage
      localStorage.setItem('employees', JSON.stringify(state.employees))
    },
    // Vous pouvez ajouter d'autres reducers ici si nécessaire
  },
})

// Exporte les actions du slice
export const { saveEmployeeData } = employeeSlice.actions
