import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
  },

  reducers: {
    userAuthSuccess: (state, { payload }) => {
      // Authenticate user & Get token
      state.token = payload
    },
    userAuthFailed: (state, { payload }) => {
      // Authenticate user & Get token
      state.token = null
      state.user = null
      state.isLoggedIn = false
    },
    loginFailed: (state, { payload }) => {
      // Authenticate user & Get token
      state.token = null
      state.user = null
      state.isLoggedIn = false
    },
    loadUser: (state, { payload }) => {
      // User token to get user info
      state.user = payload
      state.isLoggedIn = true
    },
  },
})

export const { userAuthSuccess, userAuthFailed, loginFailed, loadUser } = authSlice.actions

export default authSlice.reducer
