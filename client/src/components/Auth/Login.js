// Bootstrap removed
import React, { useState } from 'react'
import { Paper, Button, TextField, Dialog, Typography, makeStyles, InputAdornment, IconButton } from '@material-ui/core'
import Notification from '../Notification/Notification'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { createAlert } from '../../store/features/alerts/alertsSlice'
import { userAuthSuccess, userAuthFailed, loadUser } from '../../store/features/auth/authSlice'
import setAuthToken from '../../utils/setAuthToken'
import { Visibility, VisibilityOff } from '@material-ui/icons'

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

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [values, setValues] = useState()

  const handleClickShowPassword = () => {
    setValues(!values)
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  // console.log(token)

  const handleSubmit = (e) => {
    e.preventDefault()

    const getData = async () => {
      const credentials = {
        email,
        password,
      }
      // Register User (Auth token) and Load User
      try {
        const userAuthSucResponse = await axios.post('/api/auth', credentials)

        console.log(userAuthSucResponse.data)
        // setJwt(response.data.token)
        console.log(userAuthSucResponse.data.token)
        dispatch(userAuthSuccess(userAuthSucResponse.data.token))
        // Add token to local storage
        localStorage.setItem('token', userAuthSucResponse.data.token)
        // Set axios auth token global header
        setAuthToken(localStorage.token)
        // Load User
        const loadUserRes = await axios.get('/api/auth')
        dispatch(loadUser(loadUserRes.data))
      } catch (err) {
        console.error(err.response)
        console.error(err.response.data.errors[0].msg)
        dispatch(userAuthFailed())
        localStorage.removeItem('token')

        dispatch(createAlert({ msg: err.response.data.errors[0].msg, type: 'error' }))
      }
    }
    getData()
  }

  return (
    <div>
      <Dialog
        aria-labelledby='customized-dialog-title'
        open={true}
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
                type={values ? 'text' : 'password'}
                required
                variant='filled'
                autoFocus
                id='password'
                label='Password'
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {values ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
