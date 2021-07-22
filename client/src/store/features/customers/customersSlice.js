import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const debug = false

// Get all customers thunk
export const getAllCustomers = createAsyncThunk('customers/getAllCustomers', async () => {
  try {
    const response = await axios.get('/api/customers')
    // console.log(response.data)
    return response.data
  } catch (err) {
    console.error(err.message)
    throw Error(err.message)
  }
})

// Create customers thunk
export const createCustomer = createAsyncThunk('users/createCustomer', async (payload) => {
  try {
    if (debug) console.log(payload)
    const response = await axios.post('/api/customers', payload)
    if (debug) console.log(response.data)
    return response.data
  } catch (err) {
    console.error(err)
    throw Error(err.message)
  }
})

export const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    loading: false,
    lastFetch: null,
    error: false,
    success: false,
  },

  reducers: {
    // getAllCustomers: (state, { payload }) => {
    //   // console.log(payload)
    //   state.customers = []
    //   state.customers = payload
    // },
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
  extraReducers: {
    [getAllCustomers.pending]: (state, { payload }) => {
      state.loading = true
      state.lastFetch = null
      state.error = false
      state.success = false
    },
    [getAllCustomers.fulfilled]: (state, { payload }) => {
      state.customers = payload
      state.loading = false
      state.success = true
      state.lastFetch = Date.now()
    },
    [getAllCustomers.rejected]: (state, { payload }) => {
      state.error = true
      state.customers = []
    },
    [createCustomer.pending]: (state, { payload }) => {
      state.error = false
      state.success = false
      state.lastFetch = null
    },
    [createCustomer.fulfilled]: (state, { payload }) => {
      state.customers.push(payload)
      state.loading = false
      state.success = true
    },
    [createCustomer.rejected]: (state, { payload }) => {
      console.log(payload)
      state.error = true
    },
  },
})

export const { getCustomerById, editCustomer, deleteCustomer, uploadCustomers } = customersSlice.actions

export default customersSlice.reducer
