import {
  Button,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableCell,
  Paper,
  IconButton,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
import Notification from '../../Notification/Notification'
import MainPageBase from '../MainPageBase'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { deepOrange, lightBlue } from '@material-ui/core/colors'
// import _ from 'lodash'
import Autocomplete from '@material-ui/lab/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomers } from '../../../store/features/customers/customersSlice'
import { getAllProducts } from '../../../store/features/products/productsSlice'
import DeleteIcon from '@material-ui/icons/Delete'
import { nanoid } from '@reduxjs/toolkit'

const debug = false

const emb_type = [{ embroidery_type: 'Flat' }, { embroidery_type: 'Applique' }, { embroidery_type: 'Cap_Front' }, { embroidery_type: 'Name_Tags' }]

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

  table: {
    minWidth: 700,
  },

  input: {
    // /* text-align: right; */
    flexDirection: 'row-reverse',
  },

  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  soNumber: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: lightBlue[500],
  },
}))

function PricelistCreate() {
  const history = useHistory()
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCustomers())
    dispatch(getAllProducts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const customers = useSelector((state) => state.entities.customers.customers)
  if (debug) console.log(customers)

  const [pricelistTable, setPricelistTable] = useState([])
  if (debug) console.log('Price List', pricelistTable)

  const [init, setInit] = useState('Flat')

  const initialValues = {
    embroidery_type: init,
    max_qty: '',
    price_per_thus_stitches: '',
    min_price: '',
  }
  const [values, setValues] = useState(initialValues)
  if (debug) console.log('Input', values)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target
    if (debug) console.log(`name: ${name}, value: ${value}`)
    if (name === 'embroidery_type') {
      setInit(value)
    }
    if (name === 'max_qty' || name === 'price_per_thus_stitches' || name === 'min_price') {
      if (value < 0) {
        value = 0
      }
    }
    setValues({ ...values, [name]: value })
  }

  const handleRedirect = (e) => {
    e.preventDefault()

    history.push('/settings/pricelist')
  }

  const handleTableAdd = () => {
    const id = nanoid()
    setPricelistTable([...pricelistTable, { ...values, id }])
    setValues(initialValues)
  }

  const handleDelete = (e, id) => {
    e.preventDefault()
    setPricelistTable(pricelistTable.filter((price) => price.id !== id))
  }

  return (
    <MainPageBase>
      <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
        <Grid container>
          <Notification />
          <Grid item xs={12}>
            <Typography className={classes.soNumber} variant='h4' component='h4'>
              Create Pricelist
            </Typography>
          </Grid>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}>
              <Autocomplete
                name='embroidery_type'
                size='small'
                value={values}
                options={emb_type}
                getOptionLabel={(option) => {
                  // Gets its input from Values
                  if (debug) console.log(option)
                  return option.embroidery_type
                }}
                onChange={(e, value) => {
                  if (debug) console.log(value)
                  let embroidery_type = ''
                  try {
                    embroidery_type = value.embroidery_type
                    setInit(embroidery_type)
                  } catch (error) {
                    embroidery_type = init
                  }
                  setValues({ ...values, embroidery_type })
                }}
                getOptionSelected={(option, value) => option.embroidery_type === value.embroidery_type}
                renderInput={(params) => <TextField {...params} label='Embroidery Type' margin='normal' size='small' required />}
                renderOption={(option, { inputValue }) => {
                  const matches = match(option.embroidery_type, inputValue)
                  const parts = parse(option.embroidery_type, matches)
                  if (debug) console.log(parts, matches, option, inputValue)
                  return (
                    <div>
                      {parts.map((part, index) => (
                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                          {part.text}
                        </span>
                      ))}
                    </div>
                  )
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                name='max_qty'
                value={values.max_qty}
                onChange={handleInputChange}
                size='small'
                label='Maximum Quantity'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                name='price_per_thus_stitches'
                value={values.price_per_thus_stitches}
                onChange={handleInputChange}
                size='small'
                label='Price/1000st'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                name='min_price'
                value={values.min_price}
                onChange={handleInputChange}
                size='small'
                label='Minimum Price'
                type='number'
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant='contained' color='primary' onClick={handleTableAdd}>
                Add
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='spanning table' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Embroidery Type</TableCell>
                    <TableCell>Maximum Quantity</TableCell>
                    <TableCell align='right'>Price/1000stitches</TableCell>
                    <TableCell align='right'>Minimn Price</TableCell>
                    <TableCell align='right'>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pricelistTable.map((row, index) => {
                    const { id, embroidery_type, max_qty, stch_per_thus, min_price } = row

                    return (
                      <TableRow key={id}>
                        <TableCell>{embroidery_type}</TableCell>
                        <TableCell>{max_qty}</TableCell>
                        <TableCell align='right'>{stch_per_thus}</TableCell>
                        <TableCell align='right'>{min_price}</TableCell>
                        <TableCell align='right'>
                          <IconButton size='small' onClick={(e) => handleDelete(e, id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            <Grid container>
              <Grid item xs={6}>
                <Grid container justify='flex-start' alignItems='center'>
                  <Button variant='contained' type='submit' color='primary'>
                    Save
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container justify='flex-start' alignItems='center'>
                  <Button variant='contained' onClick={handleRedirect}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </MainPageBase>
  )
}

export default PricelistCreate
