import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    // état initial
  },
  reducers: {
    // autres reducers...
    saveEmployeeData: (state, action) => {
      // Mettez à jour l'état avec les nouvelles données de l'employé
      state.data = action.payload
      // Enregistrez également dans le localStorage
      localStorage.setItem('employees', JSON.stringify(state.data))
    },
  },
})

export const { saveEmployeeData } = employeeSlice.actions
