import { Button, Grid, makeStyles, MenuItem, TextField } from '@material-ui/core'
import { deepOrange, lightBlue } from '@material-ui/core/colors'
import { useParams, useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import MainPageBase from '../MainPageBase'
import { useDispatch, useSelector } from 'react-redux'
import { editUser } from '../../../store/features/users/usersSlice'

const userRoles = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'sales',
    label: 'Sales',
  },
  {
    value: 'production',
    label: 'Production',
  },
  {
    value: 'trimming',
    label: 'Trimming',
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    flexDirection: 'column',

    '& .MuiFormControl-root': {
      width: '100%',
      margin: theme.spacing(1),
    },
    '& .MuiButton-root': {
      width: '98%',
      margin: theme.spacing(1),
    },
  },
  buttonCentre: {
    display: 'flex',

    justifyContent: 'space-between',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: lightBlue[500],
  },
}))

function UserEdit() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  // console.log(id)

  const { name, email, role, mobile } = useSelector((state) => state.entities.users.users.filter((user) => user._id === id))[0]
  const selectedUser = { name, email, role, mobile: mobile.join(), password: '', password2: '' }
  console.log(selectedUser)

  const initialValues = {
    name: '',
    email: '',
    role: '',
    mobile: '',
    password: '',
    password2: '',
  }

  const [values, setValues] = useState(selectedUser)

  console.log(values)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submit')
    dispatch(editUser({ id, user: values }))
    setValues(initialValues)
    history.push('/settings/users')
  }

  const handleRedirect = (e) => {
    e.preventDefault()
    history.push('/settings/users')
  }

  return (
    <MainPageBase>
      <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
        <Grid container>
          <TextField value={values.name} name='name' label='Name' variant='filled' size='small' type='text' onChange={handleInputChange} required />
          <TextField
            value={values.email}
            name='email'
            label='Email'
            variant='filled'
            size='small'
            type='email'
            onChange={handleInputChange}
            required
          />
          <TextField
            value={values.role}
            select
            name='role'
            label='Role'
            variant='filled'
            size='small'
            type='text'
            onChange={handleInputChange}
            helperText='Please select user role'
            required
          >
            {userRoles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            value={values.mobile}
            name='mobile'
            label='Mobile'
            variant='filled'
            size='small'
            type='text'
            onChange={handleInputChange}
            required
          />
          <TextField
            value={values.password}
            name='password'
            label='Password'
            variant='filled'
            size='small'
            type='password'
            onChange={handleInputChange}
            required
          />
          <TextField
            value={values.password2}
            name='password2'
            label='Repeat Password'
            variant='filled'
            size='small'
            type='password'
            onChange={handleInputChange}
            required
          />
          <Grid className={classes.buttonCentre} container align='center'>
            <Grid item xs={6}>
              <Button variant='contained' color='primary' type='submit'>
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant='contained' onClick={handleRedirect}>
                Return
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MainPageBase>
  )
}

export default UserEdit
