import CustomersList from './CustomersList'
import CustomersCards from './CustomersCards'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCustomers } from '../../../store/features/customers/customersSlice'
import MainPageBase from '../MainPageBase'
import { LinearProgress } from '@material-ui/core'

const debug = false

const Customers = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCustomers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const customersData = useSelector((state) => state.entities.customers.customers)

  const isLoading = useSelector((state) => state.entities.customers.loading)

  if (debug) console.log(isLoading)
  if (debug) console.log(customersData)

  let showListItems = useSelector((state) => state.ui.ui.showListItems)

  if (isLoading) {
    return (
      <MainPageBase>
        <LinearProgress color='primary' />
      </MainPageBase>
    )
  }
  return <>{showListItems ? <CustomersList customersData={customersData} /> : <CustomersCards customersData={customersData} />}</>
}

export default Customers
