import { createSlice } from '@reduxjs/toolkit'

export const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
  },

  reducers: {
    getAllCustomers: (state, { payload }) => {
      // console.log(payload)
      state.customers = []
      state.customers = payload
    },
    getCustomerById: (state, { payload }) => {
      state.customers.push(payload)
    },
    createCustomer: (state, { payload }) => {
      state.customers.push(payload)
    },
    editCustomer: (state, { payload }) => {
      state.customers.push(payload)
    },
    deleteCustomer: (state, { payload }) => {
      state.customers = state.customers.filter((alert) => {
        return payload.id !== alert.id
      })
    },
    uploadCustomers: (state, { payload }) => {
      state.customers = state.customers.filter((alert) => {
        return payload.id !== alert.id
      })
    },
  },
})

export const { getAllCustomers, getCustomerById, createCustomer, editCustomer, deleteCustomer, uploadCustomers } = customersSlice.actions

export default customersSlice.reducer
