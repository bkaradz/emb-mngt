import { configureStore } from '@reduxjs/toolkit'

import entitiesReducer from './reducers/entities'
import uiReducer from './reducers/ui'

import authReducer from './features/auth/authSlice'

export default configureStore({
  reducer: {
    ui: uiReducer,
    entities: entitiesReducer,
    auth: authReducer,
  },
})
