import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [], // Stockez les employés dans un tableau
  },
  reducers: {
    saveEmployeeData: (state, action) => {
      // Ajoutez le nouvel employé à la liste
      state.employees.push(action.payload)

      // Optionnel: Sauvegardez également dans le localStorage
      localStorage.setItem('employees', JSON.stringify(state.employees))
    },
    // Vous pouvez ajouter d'autres reducers ici si nécessaire
  },
})

export const { saveEmployeeData } = employeeSlice.actions
