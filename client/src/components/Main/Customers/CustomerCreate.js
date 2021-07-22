import React, { useState } from 'react'
import { Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Avatar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { deepOrange, lightBlue } from '@material-ui/core/colors'
import avatarImage from '../../../assets/avatar.png'
import { createCustomer } from '../../../store/features/customers/customersSlice'
import MainPageBase from '../MainPageBase'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Notification from '../../Notification/Notification'
import _ from 'lodash'

const debug = false

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // display: 'flex',
    flexDirection: 'column',
    '& .MuiFormControl-root': {
      width: '95%',
      margin: theme.spacing(1),
    },
    '& .MuiButton-root': {
      width: '95%',
      margin: theme.spacing(1),
    },
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

function CustomerCreate(props) {
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()

  const initialValues = {
    isCompany: '',
    vatOrBpNo: '',
    name: '',
    organization: '',
    phone: '',
    email: '',
    address: '',
    balance: '',
    rating: '',
  }

  const [values, setValues] = useState(initialValues)

  const handleSubmit = (e) => {
    e.preventDefault()

    // const postValue = values.map((element) => console.log(element))

    let postValues = _.pickBy(values, function (value, key) {
      return !(value === '' || value === 0)
    })

    if (debug) console.log(postValues)

    dispatch(createCustomer(postValues))
    setValues(initialValues)
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target

    if (name === 'phone') {
      value = value.split(',').map((num) => num.trim())
    }

    setValues({ ...values, [name]: value })
  }

  const handleRedirect = (e) => {
    e.preventDefault()

    history.push('/customers')
  }

  return (
    <MainPageBase>
      <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
        <Grid container>
          <Notification />
          <Grid item xs={6}>
            <Grid container justify='flex-start' alignItems='center'>
              <Grid item>
                <Avatar alt='Brian Karadz' src={avatarImage} className={`${classes.orange} ${classes.large}`} />
              </Grid>
              <Grid item>
                <FormControl required>
                  <FormLabel>Customer Type</FormLabel>
                  <RadioGroup aria-label='Company or Individual' name='isCompany' value={values.isCompany} onChange={handleInputChange}>
                    <FormControlLabel value='individual' control={<Radio />} label='Individual' />
                    <FormControlLabel value='company' control={<Radio />} label='Company' />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  value={values.rating}
                  id='rating'
                  name='rating'
                  label='Rating'
                  variant='filled'
                  size='small'
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>

            <TextField required value={values.name} id='name' name='name' label='Name' variant='filled' size='small' onChange={handleInputChange} />
            <TextField value={values.email} name='email' label='Email' variant='filled' size='small' onChange={handleInputChange} />
            <TextField
              value={values.balance}
              id='balance'
              name='balance'
              label='Balance'
              variant='filled'
              size='small'
              onChange={handleInputChange}
            />
            <Grid container justify='flex-start' alignItems='center'>
              <Button variant='contained' type='submit' color='primary'>
                Save
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={values.vatOrBpNo}
              id='vatOrBpNo'
              name='vatOrBpNo'
              label='Vat or Bp Number'
              variant='filled'
              size='small'
              onChange={handleInputChange}
            />
            <TextField
              required
              value={values.phone}
              id='phone'
              name='phone'
              label='Phone'
              variant='filled'
              size='small'
              onChange={handleInputChange}
            />
            <TextField
              value={values.notes}
              id='notes'
              name='notes'
              label='Notes'
              variant='filled'
              multiline
              rows={2}
              size='small'
              onChange={handleInputChange}
            />
            <TextField
              value={values.address}
              id='address'
              name='address'
              label='Address'
              variant='filled'
              multiline
              rows={3}
              size='small'
              onChange={handleInputChange}
            />
            <Grid container justify='flex-start' alignItems='center'>
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

export default CustomerCreate
