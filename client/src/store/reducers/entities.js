import { combineReducers } from '@reduxjs/toolkit'

import customersReducer from '../features/customers/customersSlice'
import productsReducer from '../features/products/productsSlice'
import usersReducer from '../features/users/usersSlice'
import messagesReducer from '../features/messages/messagesSlice'
import ordersReducer from '../features/orders/ordersSlice'
import settingsReducer from '../features/settings/settingsSlice'

export default combineReducers({
  products: productsReducer,
  customers: customersReducer,
  users: usersReducer,
  messages: messagesReducer,
  orders: ordersReducer,
  settings: settingsReducer,
})
