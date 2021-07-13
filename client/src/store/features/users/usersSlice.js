import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// First, create the thunk
export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  const response = await axios.get('/api/users')
  return response.data
})

export const createUser = createAsyncThunk('users/createUser', async (payload) => {
  const response = await axios.post('/api/users', payload)
  return response.data
})

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    lastFetch: null,
    error: false,
    success: false,
  },

  reducers: {
    // createUser: (state, { payload }) => {
    //   // Authenticate user & Get token
    //   state.jwt = payload
    // },

    deleteUser: (state, { payload }) => {
      state.isLoggedIn = payload
    },
    viewUser: (state, { payload }) => {},
    editUser: (state, { payload }) => {},
  },
  extraReducers: {
    [getAllUsers.pending]: (state, { payload }) => {
      state.loading = true
      state.lastFetch = null
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.users = payload
      state.loading = false
      state.lastFetch = Date.now()
    },
    [getAllUsers.rejected]: (state, { payload }) => {
      state.error = true
      state.user = []
    },
    [createUser.pending]: (state, { payload }) => {
      state.error = false
      state.error = false
    },
    [createUser.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.users.unshift(payload)
      state.loading = false
      state.success = true
    },
    [createUser.rejected]: (state, { payload }) => {
      state.error = true
    },
  },
})

export const { deleteUser, viewUser, editUser } = usersSlice.actions

export default usersSlice.reducer
