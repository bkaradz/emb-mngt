import { combineReducers } from '@reduxjs/toolkit'

import alertsReducer from '../features/alerts/alertsSlice'

export default combineReducers({
  alerts: alertsReducer,
})
