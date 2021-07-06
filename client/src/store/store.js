import { configureStore } from '@reduxjs/toolkit'
// import alertsReducer from './features/alerts/alertsSlice'
import usersReducer from './features/users/usersSlice'
// import customersReducer from './features/customers/customersSlice'
// import productsReducer from './features/products/productsSlice'
import entitiesReducer from './reducers/enities'
import uiReducer from './reducers/ui'

export default configureStore({
  reducer: {
    ui: uiReducer,
    users: usersReducer,
    entities: entitiesReducer,
    // customers: customersReducer,
    // products: productsReducer,
  },
})
