import { configureStore } from '@reduxjs/toolkit'
import { employeeSlice } from './components/CreateEmploye/employeeSlice'

export const store = configureStore({
  reducer: {
    employee: employeeSlice.reducer,
  },
})

export default store
