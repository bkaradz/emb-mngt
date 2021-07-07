import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    jwt: null,
    isLoggedIn: false,
  },

  reducers: {
    authUser: (state, { payload }) => {
      // Authenticate user & Get token
      state.jwt = payload
    },
    getAuthUser: (state, { payload }) => {
      // User jwt to get user info
      state.user = payload
    },
    setLoggedIn: (state, { payload }) => {
      state.isLoggedIn = payload
    },
  },
})

export const { authUser, getAuthUser, setLoggedIn } = authSlice.actions

export default authSlice.reducer
