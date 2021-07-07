// Bootstrap removed
import React, { useState } from 'react'
import { Paper, Button, TextField, Dialog, Typography, makeStyles } from '@material-ui/core'
import Notification from '../Notification/Notification'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { createAlert } from '../../store/features/alerts/alertsSlice'

const useStyles = makeStyles((theme) => ({
  backDrop: {
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0,0,30,0.4)',
  },
  paper: {
    // backgroundColor: theme.palette.grey[300],
    width: '500px',
    padding: theme.spacing(3),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    // margin: theme.spacing(1),
    elevation: 0,
  },
}))

function Login({ setIsLoggedIn }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(true)
  // const [jwt, setJwt] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // console.log(jwt)

  const handleSubmit = (e) => {
    e.preventDefault()

    // dispatch(createAlert({ msg: 'This is an error alert', type: 'error' }))

    // const getData = async () => {
    //   const credentials = {
    //     email,
    //     password,
    //   }
    //   // console.log(credentials)
    //   try {
    //     const response = await axios.post('/api/auth', credentials)

    //     console.log(response.data)
    //     // setJwt(response.data.token)
    //     // console.log(jwt)
    //     localStorage.setItem('jwt', response.data.token)
    //     setOpen(false)
    //     setIsLoggedIn(true)
    //   } catch (err) {
    //     console.error(err.message)
    //     console.log('Server Error')
    //   }
    // }
    // getData()
  }

  return (
    <div>
      <Dialog
        aria-labelledby='customized-dialog-title'
        open={open}
        disableBackdropClick
        BackdropProps={{
          classes: {
            root: classes.backDrop,
          },
        }}
      >
        <MuiDialogTitle disableTypography>
          <Typography variant='h6'>Sign In</Typography>
        </MuiDialogTitle>
        <form onSubmit={(e) => handleSubmit(e)}>
          <MuiDialogContent dividers>
            <Paper className={classes.paper}>
              <Notification />
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant='filled'
                autoFocus
                margin='dense'
                id='email'
                label='Email'
                type='email'
                fullWidth
              />
              <TextField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant='filled'
                autoFocus
                id='password'
                label='Password'
                type='password'
                fullWidth
              />
            </Paper>
          </MuiDialogContent>
          <MuiDialogActions>
            <Button type='submit' color='primary'>
              Login
            </Button>
          </MuiDialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default Login
