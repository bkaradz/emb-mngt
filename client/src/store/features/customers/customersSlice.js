import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAlert } from '../alerts/alertsSlice'

const debug = false

// Get all customers thunk
export const getAllCustomers = createAsyncThunk('customers/getAllCustomers', async (payload, thunkAPI) => {
  if (debug) console.log(thunkAPI)
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
export const createCustomer = createAsyncThunk('users/createCustomer', async (payload, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
  if (debug) console.log(payload)

  let ui = getState().ui.alerts

  try {
    if (debug) console.log(payload)
    const response = await axios.post('/api/customers', payload)

    if (debug) console.log(response.data)

    dispatch(createAlert({ msg: 'Customer created', type: 'success' }))
    // return response.data
    const id = nanoid()

    return fulfillWithValue({ ui, payload: response.data, alert: { id, msg: 'Customer created', type: 'success' } })
  } catch (err) {
    if (!err.response) {
      console.log(err)
      throw Error(err.message)
    }
    if (debug) console.log(err)
    dispatch(createAlert({ msg: err.response.data, type: 'error' }))
    const id = nanoid()

    return rejectWithValue({ ui, alert: { id, msg: err.response.data, type: 'error' } })
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
      // let newAlerts = [...payload.ui.alerts, payload.alert]
      // payload.ui.alerts = newAlerts
    },
    [createCustomer.rejected]: (state, { payload }) => {
      console.log(payload)
      state.error = true
      // let newAlerts = [...payload.ui.alerts, payload.alert]
      // payload.ui.alerts = newAlerts
    },
  },
})

export const { getCustomerById, editCustomer, deleteCustomer, uploadCustomers } = customersSlice.actions

export default customersSlice.reducer
