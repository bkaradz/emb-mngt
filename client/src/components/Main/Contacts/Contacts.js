import MainHeader from '../Header/MainHeader'
import ContactsList from './ContactsList'
import ContactsCards from './ContactsCards'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Contacts = () => {
  const [contactsData, setContactsData] = useState(null)
  const [showList, setShowList] = useState(true)

  const breadcrumb = {
    link: [
      { name: 'Home', url: '/' },
      { name: 'Contacts', url: '#' },
    ],
  }

  const getData = async () => {
    try {
      const resp = await axios.get('http://localhost:4000/contacts')
      setContactsData(resp.data)
      // console.log(resp.data)
    } catch (err) {
      console.error(`Server Error: ${err.message}`)
    }
  }

  useEffect(() => {
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
      {showList ? <ContactsList contactsData={contactsData} /> : <ContactsCards contactsData={contactsData} />}
    </div>
  )
}

export default Contacts
