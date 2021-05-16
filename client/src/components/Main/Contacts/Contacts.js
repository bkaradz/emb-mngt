import MainHeader from '../Header/MainHeader'
import ContactsList from './ContactsList'
import ContactsCards from './ContactsCards'
import React, { useState } from 'react'

const Contacts = () => {
  const [showList, setShowList] = useState(true)
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
        showListFn={showListFn}
      />
      {showList ? <ContactsList /> : <ContactsCards />}
    </div>
  )
}

export default Contacts
