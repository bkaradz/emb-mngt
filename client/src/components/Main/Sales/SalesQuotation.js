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
import Autocomplete from '@material-ui/lab/Autocomplete'
import parse from 'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match'
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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  const addFields = (product) => {
    return { ...product, position: '', unit_price: 0, sum: 0, qty: 0 }
  }

  let products = useSelector((state) => state.entities.products.products)

  function ccyFormat(num) {
    return `$ ${num.toFixed(2)}`
  }

  const handleQtyChange = ({ id, e }) => {
    const { name, value } = e.target
    console.log(`name: ${name}, value: ${value}, id: ${id}`)
    setValues({
      ...values,
      order_line: values.order_line.map((product) => {
        if (debug) console.log(product)
        if (debug) console.log(_.size(product))

        if (product._id === id) {
          if (debug) console.log('true')
          let unit_price = (parseInt(value) * parseInt(product.stitches)) / 1000
          let sum = unit_price * value

          if (debug) console.log({ ...product, [name]: value })

          return { ...product, [name]: value, unit_price, sum }
        }
        if (debug) console.log('false')
        return product
      }),
    })
  }

  // Tax rate Change here
  const TAX_RATE = 0.0

  /**
   * End Business Logic for order Line
   */

  const initialValues = {
    customer_id: {},
    pricelist_id: '',
    order_number: '',
    comments: '',
    order_date: date,
    quote_expiry_date: oneWeek,
    required_date: oneWeek,
    total: '',
    order_line: [],
  }
  const [values, setValues] = useState(initialValues)
  if (debug) console.log(values)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleRedirect = (e) => {
    e.preventDefault()

    history.push('/sales')
  }

  const addSelectedProduct = (e, value) => {
    if (debug) console.log(value)
    value = value.map((v) => (_.size(v) === 15 ? v : addFields(v)))
    // value = addFields(value)
    setValues({ ...values, order_line: value })
  }

  return (
    <MainPageBase>
      <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
        <Grid container>
          <Notification />
          <Grid item xs={6}>
            <Typography className={classes.soNumber} variant='h4' component='h4'>
              SO 00000008
            </Typography>
            <Autocomplete
              id='customers'
              size='small'
              // value={values.customer_id.name}
              options={customers}
              getOptionLabel={(option) => {
                if (debug) console.log(option)
                return option.name
              }}
              // onChange
              onChange={(e, value) => {
                if (debug) console.log(value)
                setValues({ ...values, customer_id: value })
              }}
              getOptionSelected={(option, value) => option.name === value.name}
              renderInput={(params) => <TextField {...params} label='Customer' margin='normal' size='small' required placeholder='Choose Customer' />}
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
            />

            <Autocomplete
              id='products'
              size='small'
              multiple
              filterSelectedOptions
              autoHighlight
              value={values.order_line}
              options={products}
              getOptionLabel={(option) => {
                if (debug) console.log(option)
                return `${option.stitches} - ${option.name}`
              }}
              // onChange
              onChange={(e, value) => {
                addSelectedProduct(e, value)
              }}
              getOptionSelected={(option, value) => option.name === value.name}
              renderInput={(params) => <TextField {...params} label='Products' margin='normal' size='small' required placeholder='Choose Products' />}
              renderOption={(option, { inputValue }) => {
                const matches = match(`${option.stitches} - ${option.name}`, inputValue)
                const parts = parse(`${option.stitches} - ${option.name}`, matches)

                return (
                  <div>
                    {parts.map((part, index) => {
                      if (debug) console.log(part)
                      return (
                        <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                          {part.text}
                        </span>
                      )
                    })}
                  </div>
                )
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id='order-date'
              value={values.order_date}
              onChange={handleInputChange}
              size='small'
              label='Order Date'
              type='datetime-local'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id='expiry-date'
              value={values.quote_expiry_date}
              onChange={handleInputChange}
              size='small'
              label='Expiry Date'
              type='datetime-local'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id='required-date'
              value={values.required_date}
              onChange={handleInputChange}
              size='small'
              label='Required Date'
              type='datetime-local'
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Autocomplete
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
            />
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
                  {values.order_line.map((row) => {
                    const { _id, name, stitches, productID, qty, sum, position, unit_price } = row
                    invoiceSubtotal = values.order_line.map(({ sum }) => sum).reduce((sum, i) => sum + i, 0)
                    invoiceTaxes = TAX_RATE * invoiceSubtotal
                    invoiceTotal = invoiceTaxes + invoiceSubtotal
                    if (debug) console.log(qty)
                    return (
                      <TableRow key={_id}>
                        <TableCell>{productID}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell align='right'>
                          <Input type='number' value={qty} className={classes.input} name='qty' onChange={(e) => handleQtyChange({ id: _id, e })} />
                        </TableCell>
                        <TableCell align='right'>{stitches}</TableCell>
                        <TableCell align='right'>{position}</TableCell>
                        <TableCell align='right'>{ccyFormat(unit_price)}</TableCell>
                        <TableCell align='right'>{ccyFormat(sum)}</TableCell>
                      </TableRow>
                    )
                  })}
                  <TableRow>
                    <TableCell rowSpan={3} colSpan={4}></TableCell>
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align='right'>{ccyFormat(invoiceSubtotal)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align='right'>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                    <TableCell align='right'>{ccyFormat(invoiceTaxes)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align='right'>{ccyFormat(invoiceTotal)}</TableCell>
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
