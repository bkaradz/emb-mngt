import React, { useState, useEffect } from 'react'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { deleteAlert } from '../../store/features/alerts/alertsSlice'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

function Notification() {
  const classes = useStyles()
  const allAlerts = useSelector((state) => state.alerts)
  // console.log(allAlerts)
  const dispatch = useDispatch()

  const [id, setId] = useState('')
  // console.log(id)
  useEffect(() => {
    setTimeout(() => {
      dispatch(deleteAlert({ id }))
    }, 3000)
  }, [dispatch, id])

  return (
    <div className={classes.root}>
      {allAlerts.map((alt) => {
        const { id, msg, type } = alt
        setId(id)
        return (
          <Alert key={id} severity={type}>
            {msg}
          </Alert>
        )
      })}
    </div>
  )
}

export default Notification
