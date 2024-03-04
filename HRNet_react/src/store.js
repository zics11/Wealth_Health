/**
 * @fileoverview Crée et configure le magasin Redux de l'application
 * @module store
 */

import { configureStore } from '@reduxjs/toolkit'
import { employeeSlice } from './components/CreateEmploye/employeeSlice'

/**
 * Crée et configure le magasin Redux de l'application.
 * @returns {Object} Le magasin Redux configuré.
 */
export const store = configureStore({
  reducer: {
    // Définit le réducteur pour gérer l'état des employés dans le magasin Redux
    employee: employeeSlice.reducer,
  },
})

export default store
