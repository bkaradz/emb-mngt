import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { uiStates } from '../../../components/Main/PageHeader/pageUiData'

export const getAllUiStates = createAsyncThunk('uiStates/getAllUiStates', async () => {
  try {
    return uiStates
  } catch (err) {
    console.error(err.message)
    console.log(err.message)
    console.log(err.response.data)
    return err.message
  }
})

export const uiSlice = createSlice({
  name: 'uiStates',
  initialState: {
    uiStates: {},
    currentUI: {},
    showListItems: true,
    loading: false,
    error: false,
    success: false,
  },

  reducers: {
    /**
     * payload should be of the form {msg: "", type: ""}
     * type => error, warning, info, success
     */
    getCurrentUiState: (state, { payload }) => {
      state.currentUI = state.uiStates[payload]
    },
    changeShowListItem: (state, { payload }) => {
      state.showListItems = payload
    },
  },
  extraReducers: {
    [getAllUiStates.pending]: (state, { payload }) => {
      state.loading = true
      state.lastFetch = null
      state.error = false
      state.success = false
    },
    [getAllUiStates.fulfilled]: (state, { payload }) => {
      state.uiStates = payload
      state.loading = false
      state.lastFetch = Date.now()
      state.error = false
      state.success = true
    },
    [getAllUiStates.rejected]: (state, { payload }) => {
      state.products = {}
      state.loading = false
      state.lastFetch = null
      state.error = true
      state.success = false
    },
  },
})

export const { changeShowListItem, getCurrentUiState } = uiSlice.actions

export default uiSlice.reducer
