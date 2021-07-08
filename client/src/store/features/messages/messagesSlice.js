import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    loading: false,
    lastFetch: null,
  },

  reducers: {
    getUserMessages: (state, { payload }) => {
      //
      state.jwt = payload
    },
    messagesRead: (state, { payload }) => {
      //
      state.user = payload
    },
    createMassage: (state, { payload }) => {
      state.isLoggedIn = payload
    },
    deleteMassage: (state, { payload }) => {
      state.isLoggedIn = payload
    },
  },
})

export const { getUserMessages, messagesRead, createMassage, deleteMassage } = messagesSlice.actions

export default messagesSlice.reducer
