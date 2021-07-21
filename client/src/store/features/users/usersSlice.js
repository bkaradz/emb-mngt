import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// Get all users thunk
export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
  try {
    const response = await axios.get('/api/users')
    return response.data
  } catch (err) {
    console.error(err.message)
    console.log(err.message)
    console.log(err.response.data)
    return err.message
  }
})
// Create user thunk
export const createUser = createAsyncThunk('users/createUser', async (payload) => {
  try {
    const response = await axios.post('/api/users', payload)
    return response.data
  } catch (err) {
    console.error(err.message)
    console.log(err.message)
    console.log(err.response.data)
    return err.message
  }
})
// Edit user thunk
export const editUser = createAsyncThunk('users/editUser', async ({ id, user }, { getState, requestId }) => {
  try {
    const response = await axios.put(`/api/users/${id}`, user)
    return response.data
  } catch (err) {
    console.error(err.message)
    console.log(err.message)
    console.log(err.response.data)
    return err.message
  }
})
// Delete user thunk
export const deleteUser = createAsyncThunk('users/deleteUser', async ({ id }, { getState, requestId }) => {
  try {
    const response = await axios.delete(`/api/users/${id}`)
    return response.data
  } catch (err) {
    console.error(err.message)
    console.log(err.message)
    console.log(err.response.data)
    return err.message
  }
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
    // deleteUser: (state, { payload }) => {
    //   state.isLoggedIn = payload
    // },
  },
  extraReducers: {
    [getAllUsers.pending]: (state, { payload }) => {
      state.loading = true
      state.lastFetch = null
      state.error = false
      state.success = false
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.users = payload
      state.loading = false
      state.lastFetch = Date.now()
    },
    [getAllUsers.rejected]: (state, { payload }) => {
      state.error = true
      state.users = []
    },
    [createUser.pending]: (state, { payload }) => {
      state.error = false
      state.success = false
      state.lastFetch = null
    },
    [createUser.fulfilled]: (state, { payload }) => {
      // console.log(payload)
      state.users.push(payload)
      state.loading = false
      state.success = true
    },
    [createUser.rejected]: (state, { payload }) => {
      state.error = true
    },
    [editUser.pending]: (state, { payload }) => {
      state.error = false
      state.success = false
      state.lastFetch = null
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
    },
    [editUser.rejected]: (state, { payload }) => {
      state.error = true
    },
    [deleteUser.pending]: (state, { payload }) => {
      state.error = false
      state.success = false
      state.lastFetch = null
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.error = true
    },
  },
})

// export const {} = usersSlice.actions

export default usersSlice.reducer
