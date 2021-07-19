import { Avatar, Button, Grid, TextField } from '@material-ui/core'
import { deepOrange, lightBlue } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import MainPageBase from '../MainPageBase'
import avatarImage from '../../../assets/avatar.png'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

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
    width: theme.spacing(15),
    height: theme.spacing(15),
    // padding: theme.spacing(7),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
    // borderColor: deepOrange[500],
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: lightBlue[500],
  },
}))

function ProductEdit() {
  const classes = useStyles()
  const history = useHistory()
  const { id } = useParams()

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

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  const product = useSelector((state) => state.entities.products.products.filter((product) => product._id === id))[0]

  useEffect(() => {
    setValues(product)
  }, [product])

  const handleRedirect = (e) => {
    e.preventDefault()
    history.push('/products')
  }

  return (
    <MainPageBase>
      <form className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container justify='flex-start' alignItems='center'>
              <Grid item>
                <Avatar variant='rounded' alt='Brian Karadz' src={avatarImage} className={`${classes.orange} ${classes.large}`} />
              </Grid>

              <Grid item>
                <TextField
                  value={values.productID}
                  id='productID'
                  name='productID'
                  label='Product ID'
                  variant='filled'
                  size='small'
                  onChange={handleInputChange}
                />
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

            <TextField value={values.name} id='name' name='name' label='Name' variant='filled' size='small' onChange={handleInputChange} />
            <TextField value={values.title} id='title' name='title' label='Title' variant='filled' size='small' onChange={handleInputChange} />
            <TextField
              value={values.stitches}
              id='stitches'
              name='stitches'
              label='Stitches'
              variant='filled'
              size='small'
              onChange={handleInputChange}
            />
            <Grid container justify='flex-start' alignItems='center'>
              <Button variant='contained'>Edit</Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={values.sales_price}
              id='sales_price'
              name='sales_price'
              label='Sales Price'
              variant='filled'
              size='small'
              onChange={handleInputChange}
            />
            <TextField
              value={values.category}
              id='category'
              name='category'
              label='Category'
              variant='filled'
              size='small'
              onChange={handleInputChange}
            />
            <TextField value={values.units} id='units' name='units' label='Units' variant='filled' size='small' onChange={handleInputChange} />
            <TextField
              value={values.description}
              id='description'
              name='description'
              label='Description'
              variant='filled'
              multiline
              rows={4}
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

export default ProductEdit
