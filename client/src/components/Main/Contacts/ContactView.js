import MainHeader from '../Header/MainHeader'
import logo from '../../../img/zahra-amiri-1q6LXasG1hY-unsplash1.jpg'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function ContactView(props) {
  const { id } = useParams()

  const [contactData, setContactData] = useState('')
  const [isCompany, setIsCompany] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/contacts/view/${id}`)
      console.log(response.data)
      return setContactData(response.data)
    } catch (err) {
      console.error(err.message)
      console.log('Server Error')
    }
  }

  useEffect(() => {
    getData()
    // Update form
  }, [])

  useEffect(() => {
    // Update form
    setIsCompany(contactData.isCompany || '')
    console.log(isCompany)
    setName(contactData.name || '')
    console.log(name)
    setPhone(contactData.phone || '')
    console.log(phone)
    setEmail(contactData.email || '')
    console.log(email)
    setAddress(contactData.address || '')
    console.log(address)
  }, [address, contactData, email, isCompany, name, phone])

  return (
    <div className='main'>
      <MainHeader
        showSearch='false'
        nameCreateBtn='Save'
        nameImportBtn='Discard'
        showImportBtn='true'
        showListOrCardItem='false'
        showPagination='false'
      />
      <div className='main--content__create'>
        <div className='container'>
          <form className='pt-5'>
            <img src={logo} width='100px' className='img-thumbnail mb-3' alt='...'></img>
            <div className='form-check form-check-inline ms-3'>
              <input
                className='form-check-input'
                type='radio'
                name='companyOrIndividualRadioOptions'
                id='individual'
                value='individual'
                defaultChecked={isCompany === 'individual'}
                onClick={(e) => setIsCompany('individual')}
              />
              <label className='form-check-label' htmlFor='individual'>
                Individual
              </label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                className='form-check-input'
                type='radio'
                name='companyOrIndividualRadioOptions'
                id='company'
                value='company'
                defaultChecked={isCompany === 'company'}
                onChange={(e) => setIsCompany('company')}
              />
              <label className='form-check-label' htmlFor='company'>
                Company
              </label>
            </div>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-control form-control-sm'
                id='name'
                aria-describedby='emailHelp'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='phone' className='form-label'>
                Phone
              </label>
              <input
                type='text'
                className='form-control form-control-sm'
                id='phone'
                aria-describedby='emailHelp'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email address
              </label>
              <input
                type='email'
                className='form-control form-control-sm'
                id='email'
                aria-describedby='emailHelp'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='address' className='form-label'>
                Address
              </label>
              <textarea className='form-control' id='address' rows='3' value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
            </div>
            <button type='submit' className='btn btn-primary'>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactView
