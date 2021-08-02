import React, { useEffect, useState } from 'react'
import MainPageBase from '../MainPageBase'
import { useDispatch, useSelector } from 'react-redux'
import VirtualAutoCustomers from '../VirtualAutoCustomers'
import { getAllCustomers } from '../../../store/features/customers/customersSlice'

const debug = false

export default function Virtualize() {
  const dispatch = useDispatch()

  const initialValues = {
    customer_id: null,
    pricelist_id: '',
    order_number: '',
    comments: '',
    total: '',
    order_line: [],
  }

  const [values, setValues] = useState(initialValues)

  console.log(values)

  useEffect(() => {
    dispatch(getAllCustomers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const CUSTOMERS = useSelector((state) => state.entities.customers.customers)
  if (debug) console.log(CUSTOMERS)

  const addSelectedCustomer = (e, value) => {
    setValues({ ...values, customer_id: value })
  }

  return (
    <MainPageBase>
      <VirtualAutoCustomers props={{ LIST: CUSTOMERS, values, handleOnChange: addSelectedCustomer }} />
    </MainPageBase>
  )
}
