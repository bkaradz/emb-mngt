import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// First, create the thunk
const getAllUsersThunk = createAsyncThunk('users/getAllUsers', async () => {
  const response = await axios.get('/api/users')
  return response.data
})

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    lastFetch: null,
  },

  reducers: {
    createUser: (state, { payload }) => {
      // Authenticate user & Get token
      state.jwt = payload
    },
    getAllUsers: (state, { payload }) => {
      // User jwt to get user info
      state.users = payload
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
