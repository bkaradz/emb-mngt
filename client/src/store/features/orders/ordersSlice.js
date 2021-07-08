import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    lastFetch: null,
  },

  reducers: {
    getOrders: (state, { payload }) => {
      //
      state.jwt = payload
    },
    ordersRead: (state, { payload }) => {
      //
      state.user = payload
    },
    createOrders: (state, { payload }) => {
      state.isLoggedIn = payload
    },
    deleteOrders: (state, { payload }) => {
      state.isLoggedIn = payload
    },
  },
})

export const { getUserOrders, ordersRead, createOrders, deleteOrders } = ordersSlice.actions

export default ordersSlice.reducer
