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
  Input,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
import Notification from '../../Notification/Notification'
import MainPageBase from '../MainPageBase'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { deepOrange, lightBlue } from '@material-ui/core/colors'
import _ from 'lodash'
// import Autocomplete from '@material-ui/lab/Autocomplete'
// import parse from 'autosuggest-highlight/parse'
// import match from 'autosuggest-highlight/match'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomers } from '../../../store/features/customers/customersSlice'
import { getAllProducts } from '../../../store/features/products/productsSlice'

const debug = false

let invoiceSubtotal = 0
let invoiceTaxes = 0
let invoiceTotal = 0

let date = new Date()
if (debug) console.log(date)
date = date.toISOString().slice(0, 16)
if (debug) console.log(date)

let weeks = 1
let oneWeek = new Date()
oneWeek.setDate(oneWeek.getDate() + weeks * 7)
if (debug) console.log(oneWeek)
oneWeek = oneWeek.toISOString().slice(0, 16)

const pricelist = [
  { pricelist: 'Pricelist 1', id: 1994 },
  { pricelist: 'Pricelist 2', id: 1972 },
  { pricelist: 'Pricelist 3', id: 1974 },
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
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: lightBlue[500],
  },
}))

function SalesQuotation() {
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

  /**
   * Business Logic for order Line
   */
  const addFields = (products) => {
    return products.map((product) => ({ ...product, position: '', unit_price: '', sum: '', qty: '' }))
  }
  let products = useSelector((state) => state.entities.products.products)

  products = addFields(products)
  // console.log(products)

  function ccyFormat(num = 0) {
    return `$ ${num.toFixed(2)}`
  }

  function priceRow(qty, unit) {
    return qty * unit
  }

  function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit)
    return { desc, qty, unit, price }
  }

  //   {
  //     rating: 0,
  //     category: 'emb_logo',
  //     isDeleted: false,
  //     _id: '60fd9c1f146ad70e95825c52',
  //     user_id: '60c2616045278b396ac313a2',
  //     name: 'PAGIWA NURSERY SCHOOL.EMB',
  //     title: 'ACTION AID',
  //     stitches: 8302,
  //     productID: '100-000-0001',
  //     date: '2021-07-25T17:15:11.085Z',
  //     __v: 0,
  //   },

  const [rows, setRows] = useState(products)

  const handleQtyChange = ({ id, e }) => {
    const { name, value } = e.target

    setRows(
      rows.map((product) => {
        let unit_price = (parseInt(value) * parseInt(product.stitches)) / 1000
        let sum = unit_price * value
        invoiceSubtotal = rows.map(({ sum }) => sum).reduce((sum, i) => sum + i, 0)
        console.log(invoiceSubtotal)
        invoiceTaxes = TAX_RATE * invoiceSubtotal
        invoiceTotal = invoiceTaxes + invoiceSubtotal
        return product._id === id ? { ...product, [name]: value, unit_price, sum } : product
      })
    )
  }

  // Tax rate Change here
  const TAX_RATE = 0.0

  // function subtotal(items) {
  //   return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0)
  // }

  // const invoiceSubtotal = subtotal(rows)
  // const invoiceTaxes = TAX_RATE * invoiceSubtotal
  // const invoiceTotal = invoiceTaxes + invoiceSubtotal

  /**
   * End Business Logic for order Line
   */

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

    // dispatch(createCustomer(postValues))
    setValues(initialValues)
  }

  // const handleInputChange = (e) => {
  //   let { name, value } = e.target

  //   if (name === 'phone') {
  //     value = value.split(',').map((num) => num.trim())
  //   }

  //   setValues({ ...values, [name]: value })
  // }

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
            <Typography className={classes.soNumber} variant='h3' component='h2'>
              SO 0000008
            </Typography>
            {/* <Autocomplete
              id='highlights-demo'
              size='small'
              options={customers}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label='Customer' margin='normal' size='small' required />}
              renderOption={(option, { inputValue }) => {
                const matches = match(option.name, inputValue)
                const parts = parse(option.name, matches)

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
            /> */}
          </Grid>
          <Grid item xs={6}>
            <TextField
              id='order-date'
              size='small'
              label='Order Date'
              type='datetime-local'
              defaultValue={date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id='expiry-date'
              size='small'
              label='Expiry Date'
              type='datetime-local'
              defaultValue={oneWeek}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id='required-date'
              size='small'
              label='Required Date'
              type='datetime-local'
              defaultValue={oneWeek}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <Autocomplete
              id='pricelist'
              size='small'
              options={pricelist}
              getOptionLabel={(option) => option.pricelist}
              renderInput={(params) => <TextField {...params} label='Pricelist' margin='normal' size='small' required />}
              renderOption={(option, { inputValue }) => {
                const matches = match(option.pricelist, inputValue)
                const parts = parse(option.pricelist, matches)

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
            /> */}
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label='spanning table' size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center' colSpan={4}>
                      Details
                    </TableCell>
                    <TableCell align='right'>Price</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align='right'>Qty.</TableCell>
                    <TableCell align='right'>Stitches</TableCell>
                    <TableCell align='right'>Position</TableCell>
                    <TableCell align='right'>Unit Price</TableCell>
                    <TableCell align='right'>Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    const { _id, name, stitches, productID, qty, sum, position, unit_price } = row
                    return (
                      <TableRow key={_id}>
                        <TableCell>{productID}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell align='right'>
                          <Input value={qty} className={classes.input} type='text' name='qty' onChange={(e) => handleQtyChange({ id: _id, e })} />
                        </TableCell>
                        <TableCell align='right'>{stitches}</TableCell>
                        <TableCell align='right'>{position}</TableCell>
                        <TableCell align='right'>{unit_price}</TableCell>
                        <TableCell align='right'>{sum}</TableCell>
                      </TableRow>
                    )
                  })}
                  <TableRow>
                    <TableCell rowSpan={3} colSpan={4}></TableCell>
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align='right'>{invoiceSubtotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align='right'>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                    <TableCell align='right'>{invoiceTaxes}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align='right'>{invoiceTotal}</TableCell>
                  </TableRow>
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

export default SalesQuotation
