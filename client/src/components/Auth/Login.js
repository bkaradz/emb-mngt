// Bootstrap removed
import React, { useState } from 'react'
import { Button, TextField, Dialog, Typography } from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import axios from 'axios'

function Login({ setIsLoggedIn }) {
  const [open, setOpen] = useState(true)
  // const [jwt, setJwt] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // console.log(jwt)

  const handleClose = (e) => {
    e.preventDefault()
    const getData = async () => {
      const credentials = {
        email,
        password,
      }
      // console.log(credentials)
      try {
        const response = await axios.post('/api/auth', credentials)

        // console.log(response.data)
        // setJwt(response.data.token)
        // console.log(jwt)
        localStorage.setItem('jwt', response.data.token)
        setOpen(false)
        setIsLoggedIn(true)
      } catch (err) {
        console.error(err.message)
        console.log('Server Error')
      }
    }
    getData()
  }

  return (
    <div>
      <Dialog aria-labelledby='customized-dialog-title' open={open} disableBackdropClick>
        <MuiDialogTitle disableTypography>
          <Typography variant='h6'>Sign In</Typography>
        </MuiDialogTitle>
        <form onSubmit={handleClose}>
          <MuiDialogContent dividers>
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
