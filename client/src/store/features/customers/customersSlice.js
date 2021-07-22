import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const debug = false

// Get all customers thunk
export const getAllCustomers = createAsyncThunk('customers/getAllCustomers', async (payload, thunkAPI) => {
  console.log(thunkAPI)
  try {
    const response = await axios.get('/api/customers')

    if (debug) console.log(response.data)

    return response.data
  } catch (err) {
    console.error(err.message)
    throw Error(err.message)
  }
})

// Create customers thunk
export const createCustomer = createAsyncThunk('users/createCustomer', async (payload, { rejectWithValue, fulfillWithValue, getState }) => {
  if (debug) console.log(payload)

  let ui = getState().ui.alerts

  try {
    if (debug) console.log(payload)
    const response = await axios.post('/api/customers', payload)

    if (debug) console.log(response.data)

    // dispatch(createAlert({ msg: 'Customer created', type: 'success' }))
    // return response.data
    const id = nanoid()

    return fulfillWithValue({ ui, payload: response.data, alert: { id, msg: 'Customer created', type: 'success' } })
  } catch (err) {
    if (!err.response) {
      console.log(err)
      throw Error(err.message)
    }
    console.log(err)
    // dispatch(createAlert({ msg: err.response.data, type: 'error' }))
    const id = nanoid()

    return rejectWithValue({ ui, id, msg: err.response.data, type: 'error' })
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
      state.customers = state.customers.filter((customer) => {
        return payload.id !== customer.id
      })
    },
    deleteAlertMessages: (state, { payload }) => {
      state.customers = state.alertMessages.filter((alert) => {
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
      console.log(payload)
      console.log(state)
      state.customers.push(payload.payload)
      state.loading = false
      state.success = true
      // payload.ui.alerts.push(payload.alert)
    },
    [createCustomer.rejected]: (state, { payload }) => {
      console.log(payload)
      state.error = true
      // state.ui.alerts.push(payload)
    },
  },
})

export const { getCustomerById, editCustomer, deleteCustomer, uploadCustomers } = customersSlice.actions

export default customersSlice.reducer
