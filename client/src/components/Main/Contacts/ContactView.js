import MainHeader from '../Header/MainHeader'
// import { FaThLarge, FaThList, FaBuilding, FaEdit, FaUser } from 'react-icons/fa'
import { BiBuildings, BiUser } from 'react-icons/bi'
// import building from '../../../img/bootstrap/building.svg'
// import person from '../../../img/bootstrap/person.svg'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function ContactView(props) {
  const { id } = useParams()

  const [contactData, setContactData] = useState(null)
  const [isCompany, setIsCompany] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const breadcrumb = {
    link: [
      { name: 'Home', url: '/' },
      { name: 'Contacts', url: '/contacts' },
      { name: 'View', url: '#' },
    ],
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/contacts/view/${id}`)

        return setContactData(response.data)
      } catch (err) {
        console.error(err.message)
        console.log('Server Error')
      }
    }
    // Update form
    getData()
  }, [id])

  useEffect(() => {
    // Update form
    if (contactData !== null) {
      setIsCompany(contactData.isCompany)
      setName(contactData.name)
      setPhone(contactData.phone)
      setEmail(contactData.email)
      setAddress(contactData.address)
    }
  }, [contactData])

  if (contactData === null) {
    return (
      <div className='main'>
        <MainHeader
          showSearch='false'
          nameCreateBtn='Edit'
          nameImportBtn='Discard'
          showImportBtn='false'
          showListOrCardItem='false'
          showPagination='false'
          showBreadcrumbs={breadcrumb}
        />
        <h1>Loading...</h1>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let editUrl = window.location.href
    // console.log(editUrl)
    editUrl = editUrl.replace('view', 'edit')
    // console.log(editUrl)
    window.location.assign(editUrl)
  }

  return (
    <div className='main'>
      <MainHeader
        showSearch='false'
        nameCreateBtn='Edit'
        nameImportBtn='Discard'
        showImportBtn='false'
        showListOrCardItem='false'
        showPagination='false'
        showBreadcrumbs={breadcrumb}
      />
      <div className='main--content__create'>
        <div className='container'>
          <form className='pt-5'>
            {/* <img src={isCompany === 'company' ? <BiBuildings /> : <BiUser />} width='100px' className='img-thumbnail mb-3' alt='...'></img> */}
            <span className='user__icons'>{isCompany === 'company' ? <BiBuildings /> : <BiUser />}</span>
            <div className='form-check form-check-inline ms-3'>
              <input
                className='form-check-input'
                type='radio'
                name='companyOrIndividualRadioOptions'
                id='individual'
                value='individual'
                defaultChecked={isCompany === 'individual'}
                readOnly={true}
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
                readOnly={true}
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
                readOnly={true}
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
                readOnly={true}
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
                readOnly={true}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='address' className='form-label'>
                Address
              </label>
              <textarea
                className='form-control'
                id='address'
                rows='3'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                readOnly={true}
              ></textarea>
            </div>
            <button type='submit' className='btn btn-primary' onClick={(e) => handleSubmit(e)}>
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactView
