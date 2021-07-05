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
  const dispatch = useDispatch()

  const removeAlert = (id) => {
    setTimeout(() => {
      dispatch(deleteAlert({ id }))
    }, 3000)
  }

  return (
    <div className={classes.root}>
      {allAlerts.alerts.map((alt) => {
        const { id, msg, type } = alt
        removeAlert(id)
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
