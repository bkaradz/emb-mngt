import MainHeader from '../Header/MainHeader'
import CustomersList from './CustomersList'
import CustomersCards from './CustomersCards'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Customers = () => {
  const [customersData, setCustomersData] = useState([])
  const [showList, setShowList] = useState(true)

  const breadcrumb = {
    link: [
      { name: 'Home', url: '/' },
      { name: 'Customers', url: '#' },
    ],
  }

  useEffect(() => {
    const getData = async () => {
      try {
        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('jwt')
        const resp = await axios.get('/api/customers')
        setCustomersData(resp.data)
        // console.log(resp.data)
      } catch (err) {
        console.error(err.response.data)
        // console.error(`Server Error: ${err.response.data}`)
      }
    }
    getData()
  }, [])

  const showListFn = (value) => {
    setShowList(JSON.parse(value))
  }

  return (
    <div className='main'>
      <MainHeader
        showSearch='true'
        nameCreateBtn='Create'
        nameImportBtn='Import'
        showImportBtn='false'
        showListOrCardItem='true'
        showPagination='true'
        showBreadcrumbs={breadcrumb}
        showListFn={showListFn}
      />
      {showList ? <CustomersList customersData={customersData} /> : <CustomersCards customersData={customersData} />}
    </div>
  )
}

export default Customers