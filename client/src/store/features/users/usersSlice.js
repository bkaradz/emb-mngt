import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    lastFetch: null,
  },

  reducers: {
    registerUser: (state, { payload }) => {
      // Authenticate user & Get token
      state.jwt = payload
    },
    getAllUsers: (state, { payload }) => {
      // User jwt to get user info
      state.user = payload
    },
    deleteUser: (state, { payload }) => {
      state.isLoggedIn = payload
    },
    viewUser: (state, { payload }) => {},
    editUser: (state, { payload }) => {},
  },
})

export const { registerUser, getAllUsers, deleteUser, viewUser, editUser } = usersSlice.actions

export default usersSlice.reducer
