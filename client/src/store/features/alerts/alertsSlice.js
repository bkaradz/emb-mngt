import { createSlice, nanoid } from '@reduxjs/toolkit'

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    alerts: [],
  },

  reducers: {
    /**
     * payload should be of the form {msg: "", type: ""}
     * type => error, warning, info, success
     */
    createAlert: (state, { payload }) => {
      const { msg, type } = payload
      const id = nanoid()
      state.alerts.push({ id, msg, type })
    },
    deleteAlert: (state, { payload }) => {
      state.alerts = state.alerts.filter((alert) => {
        return payload.id !== alert.id
      })
    },
  },
})

export const { createAlert, deleteAlert } = alertsSlice.actions

export default alertsSlice.reducer
