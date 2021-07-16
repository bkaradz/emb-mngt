import CustomersList from './CustomersList'
import CustomersCards from './CustomersCards'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCustomers } from '../../../store/features/customers/customersSlice'

const Customers = () => {
  const dispatch = useDispatch()
  const customersData = useSelector((state) => state.entities.customers.customers)
  // const [customersData, setCustomersData] = useState(state)
  const [showList, setShowList] = useState(false)

  const getData = async () => {
    try {
      const resp = await axios.get('/api/customers')

      dispatch(getAllCustomers(resp.data))
    } catch (err) {
      console.error(err.response.data)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{showList ? <CustomersList customersData={customersData} /> : <CustomersCards customersData={customersData} />}</>
}

export default Customers
