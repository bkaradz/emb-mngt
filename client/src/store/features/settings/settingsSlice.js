import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: [],
    loading: false,
    lastFetch: null,
  },

  reducers: {
    getSettings: (state, { payload }) => {
      //
      state.jwt = payload
    },
    settingsRead: (state, { payload }) => {
      //
      state.user = payload
    },
    createSettings: (state, { payload }) => {
      state.isLoggedIn = payload
    },
    deleteSettings: (state, { payload }) => {
      state.isLoggedIn = payload
    },
  },
})

export const { getSettings, settingsRead, createSettings, deleteSettings } = settingsSlice.actions

export default settingsSlice.reducer
