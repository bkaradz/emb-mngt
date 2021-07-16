import { combineReducers } from '@reduxjs/toolkit'

import alertsReducer from '../features/alerts/alertsSlice'
import uiReducer from '../features/ui/uiSlice'

export default combineReducers({
  alerts: alertsReducer,
  ui: uiReducer,
})
