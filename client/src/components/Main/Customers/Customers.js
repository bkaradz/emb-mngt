import CustomersList from './CustomersList'
import CustomersCards from './CustomersCards'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCustomers } from '../../../store/features/customers/customersSlice'

const Customers = () => {
  const dispatch = useDispatch()
  const customersData = useSelector((state) => state.entities.customers.customers)

  let showListItems = useSelector((state) => state.ui.ui.showListItems)

  useEffect(() => {
    dispatch(getAllCustomers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{showListItems ? <CustomersList customersData={customersData} /> : <CustomersCards customersData={customersData} />}</>
}

export default Customers
