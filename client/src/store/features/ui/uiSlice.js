import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
  name: 'uiStates',
  initialState: {
    uiStates: {},
    loading: false,
    error: false,
    success: false,
  },

  reducers: {
    /**
     * payload should be of the form {msg: "", type: ""}
     * type => error, warning, info, success
     */
    setAllUiStates: (state, { payload }) => {
      state.uiStates = payload
    },
    getCurrentUiState: (state, { payload }) => {
      return state.uiStates.payload
    },
  },
})

export const { setAllUiStates, getCurrentUiState } = uiSlice.actions

export default uiSlice.reducer
