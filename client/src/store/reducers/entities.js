import { combineReducers } from '@reduxjs/toolkit'

import customersReducer from '../features/customers/customersSlice'
import productsReducer from '../features/products/productsSlice'
import usersReducer from '../features/users/usersSlice'

export default combineReducers({
  products: productsReducer,
  customers: customersReducer,
  users: usersReducer,
})
