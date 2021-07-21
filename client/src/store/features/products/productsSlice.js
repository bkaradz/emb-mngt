import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
// import { createAlert } from '../alerts/alertsSlice'

export const getAllProducts = createAsyncThunk('products/getAllProducts', async () => {
  try {
    const response = await axios.get('/api/products')
    return response.data
  } catch (err) {
    console.error(err.message)
    console.log(err.message)
    console.log(err.response.data)
    return err.message
  }
})

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: true, // to change to false
    lastFetch: null,
    error: false,
    success: false,
    messages: [],
  },

  reducers: {
    getAllProducts: (state, { payload }) => {
      // console.log(payload)
      state.products = []
      state.products = payload
    },
    getProductById: (state, { payload }) => {
      state.products.push(payload)
    },
    createProduct: (state, { payload }) => {
      state.products.push(payload)
    },
    editProduct: (state, { payload }) => {
      state.products.push(payload)
    },
    deleteProduct: (state, { payload }) => {
      state.products = state.products.filter((alert) => {
        return payload.id !== alert.id
      })
    },
    uploadProducts: (state, { payload }) => {
      state.products = state.products.filter((alert) => {
        return payload.id !== alert.id
      })
    },
  },
  extraReducers: {
    [getAllProducts.pending]: (state, { payload }) => {
      state.loading = true
      state.lastFetch = null
      state.error = false
      state.success = false
    },
    [getAllProducts.fulfilled]: (state, { payload }) => {
      state.products = payload
      state.loading = false
      state.lastFetch = Date.now()
      state.error = false
      state.success = true
    },
    [getAllProducts.rejected]: (state, { payload }) => {
      state.products = []
      state.loading = false
      state.lastFetch = null
      state.error = true
      state.success = false
    },
  },
})

export const { getProductById, createProduct, editProduct, deleteProduct, uploadProducts } = productsSlice.actions

export default productsSlice.reducer
