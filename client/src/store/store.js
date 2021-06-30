import { configureStore } from '@reduxjs/toolkit'
import alertsReducer from './features/alerts/alertsSlice'
import usersReducer from './features/users/usersSlice'

export default configureStore({
  reducer: {
    alerts: alertsReducer,
    users: usersReducer,
  },
})
