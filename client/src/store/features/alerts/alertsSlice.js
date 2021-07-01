import { createSlice, nanoid } from '@reduxjs/toolkit'
// import { v4 as uuid  v4 } from 'uuid'

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: [],
  // alerts of the form {id: xxxx, msg: 'yyyyy', type: 'error'}
  reducers: {
    createAlert: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      console.log(action)
      const { msg, type } = action.payload
      const id = nanoid()
      state.push({ id, msg, type })
    },
    deleteAlert: (state, action) => {
      state.filter((alert) => action.payload.id !== alert.id)
    },
  },
})

export const { createAlert, deleteAlert } = alertsSlice.actions

export default alertsSlice.reducer
