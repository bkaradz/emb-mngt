import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Avatar, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { deepOrange, lightBlue } from '@material-ui/core/colors'
import avatarImage from '../../../assets/avatar.png'
import { useSelector } from 'react-redux'
import MainPageBase from '../MainPageBase'

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
    // padding: theme.spacing(7),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    // borderColor: deepOrange[500],
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: lightBlue[500],
  },
}))

function ContactView(props) {
  const classes = useStyles()
  const { id } = useParams()

  const user = useSelector((state) => state.entities.customers.customers.filter((customer) => customer._id === id))[0]

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
  useEffect(() => {
    if (user) {
      setValues({
        ...values,
        isCompany: user.isCompany,
        vatOrBpNo: user.vatOrBpNo,
        name: user.name,
        organization: user.organization,
        phone: user.phone,
        email: user.email,
        address: user.address,
        balance: user.balance,
        rating: user.rating,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  return (
    <MainPageBase>
      <form className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container justify='flex-start' alignItems='center'>
              <Grid item>
                <Avatar alt='Brian Karadz' src={avatarImage} className={`${classes.orange} ${classes.large}`} />
              </Grid>
              <Grid item>
                <FormControl>
                  <FormLabel>Customer Type</FormLabel>
                  <RadioGroup aria-label='Company or Individual' name='isCompany' value={values.isCompany} onChange={handleInputChange}>
                    <FormControlLabel disabled value='individual' control={<Radio />} label='Individual' />
                    <FormControlLabel disabled value='company' control={<Radio />} label='Company' />
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
                  disabled
                />
              </Grid>
            </Grid>

            <TextField value={values.name} id='name' name='name' label='Name' variant='filled' size='small' onChange={handleInputChange} disabled />
            <TextField value={values.email} name='email' label='Email' variant='filled' size='small' onChange={handleInputChange} disabled />
            <TextField
              value={values.balance}
              id='balance'
              name='balance'
              label='Balance'
              variant='filled'
              size='small'
              onChange={handleInputChange}
              disabled
            />
            <Grid container justify='flex-start' alignItems='center'>
              <Button variant='contained' disabled>
                Edit
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
              disabled
            />
            <TextField
              value={values.phone}
              id='phone'
              name='phone'
              label='Phone'
              variant='filled'
              size='small'
              onChange={handleInputChange}
              disabled
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
              disabled
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
              disabled
            />
            <Grid container justify='flex-start' alignItems='center'>
              <Button variant='contained'>Return</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MainPageBase>
  )
}

export default ContactView
