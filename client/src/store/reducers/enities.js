import { combineReducers } from '@reduxjs/toolkit'

import customersReducer from '../features/customers/customersSlice'
import productsReducer from '../features/products/productsSlice'

export default combineReducers({
  products: productsReducer,
  customers: customersReducer,
})
