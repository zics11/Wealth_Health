import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {},
  reducers: {
    saveEmployeeData: (state, action) => {
      state.data = action.payload
      localStorage.setItem('employees', JSON.stringify(state.data))
    },
  },
})

export const { saveEmployeeData } = employeeSlice.actions
