import { Button, Grid, Table, TableBody, TableContainer, TableHead, TableRow, TextField, Typography, TableCell, Paper } from '@material-ui/core'
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

const debug = false

const emb_type = [
  { type: 'Flat', id: 'flat' },
  { type: 'Applique', id: 'applique' },
  { type: 'Cap Front', id: 'cap_front' },
  { type: 'Name Tags', id: 'name_tags' },
]

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
  console.log(pricelistTable)

  const initialValues = {
    type: '',
    max_qty: '',
    stch_per_thus: '',
    min_price: '',
  }
  const [values, setValues] = useState(initialValues)
  console.log(values)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target
    console.log(`name: ${name}, value: ${value}`)
    setValues({ ...values, [name]: value })
  }

  const handleRedirect = (e) => {
    e.preventDefault()

    history.push('/sales')
  }

  const handleTableAdd = () => {
    setPricelistTable([...pricelistTable, values])
    setValues(initialValues)
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
                name='type'
                size='small'
                options={emb_type}
                getOptionLabel={(option) => option.type}
                onChange={(e, value) => {
                  if (debug) console.log(value)
                  let type = ''
                  try {
                    type = value.type
                  } catch (error) {
                    type = ''
                  }
                  setValues({ ...values, type })
                }}
                renderInput={(params) => <TextField {...params} label='Embroidery Type' margin='normal' size='small' required />}
                renderOption={(option, { inputValue }) => {
                  const matches = match(option.type, inputValue)
                  const parts = parse(option.type, matches)

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
                name='stch_per_thus'
                value={values.stch_per_thus}
                onChange={handleInputChange}
                size='small'
                label='Stitches/1000'
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
                    const { type, max_qty, stch_per_thus, min_price } = row

                    return (
                      <TableRow key={index}>
                        <TableCell>{type}</TableCell>
                        <TableCell>{max_qty}</TableCell>
                        <TableCell align='right'>{stch_per_thus}</TableCell>
                        <TableCell align='right'>{min_price}</TableCell>
                        <TableCell align='right'>Delete</TableCell>
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
