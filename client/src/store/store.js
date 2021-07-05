import { configureStore } from '@reduxjs/toolkit'
import alertsReducer from './features/alerts/alertsSlice'
import usersReducer from './features/users/usersSlice'
import customersReducer from './features/customers/customersSlice'

export default configureStore({
  reducer: {
    alerts: alertsReducer,
    users: usersReducer,
    customers: customersReducer,
  },
})
