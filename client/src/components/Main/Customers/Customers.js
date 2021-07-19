import CustomersList from './CustomersList'
import CustomersCards from './CustomersCards'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCustomers } from '../../../store/features/customers/customersSlice'
// import { TramRounded } from '@material-ui/icons'

const Customers = () => {
  const dispatch = useDispatch()
  const customersData = useSelector((state) => state.entities.customers.customers)
  // const [showListItems, setShowListItems] = useState(true)
  // setShowListItems(useSelector((state) => state.ui.ui.showListItems))
  let showListItems = useSelector((state) => state.ui.ui.showListItems)

  useEffect(() => {
    dispatch(getAllCustomers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{showListItems ? <CustomersList customersData={customersData} /> : <CustomersCards customersData={customersData} />}</>
}

export default Customers
