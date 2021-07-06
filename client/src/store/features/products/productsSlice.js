import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    lastFetch: null,
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
})

export const { getAllProducts, getProductById, createProduct, editProduct, deleteProduct, uploadProducts } = productsSlice.actions

export default productsSlice.reducer
