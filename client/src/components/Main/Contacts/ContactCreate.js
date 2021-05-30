import MainHeader from '../Header/MainHeader'
// import { FaThLarge, FaThList, FaBuilding, FaEdit, FaUser } from 'react-icons/fa'
import { BiBuildings, BiUser } from 'react-icons/bi'
// import building from '../../../img/bootstrap/building.svg'
// import person from '../../../img/bootstrap/person.svg'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function ContactCreate(props) {
  const [isCompany, setIsCompany] = useState('individual')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [alert, setAlert] = useState({ message: '', type: '', show: false })

  const breadcrumb = {
    link: [
      { name: 'Home', url: '/' },
      { name: 'Contacts', url: '/contacts' },
      { name: 'Create', url: '#' },
    ],
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({ message: '', type: '', show: false })
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert.show])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const contact = {
      name,
      isCompany,
      phone: [phone],
      email,
      address,
    }
    try {
      await axios.post('http://localhost:4000/contacts/create', contact)
      // console.log('Contact Created')
      // Reset form
      setIsCompany('individual')
      setName('')
      setPhone('')
      setEmail('')
      setAddress('')
      setAlert({ message: 'Contact Created', type: 'alert-success', show: true })
    } catch (err) {
      console.error(err.message)
      console.log('Server Error')
      setAlert({ message: 'An Error Occurred', type: 'alert-danger', show: true })
    }
  }

  return (
    <div className='main'>
      <MainHeader
        showSearch='false'
        nameCreateBtn='Save'
        nameImportBtn='Discard'
        showImportBtn='true'
        showListOrCardItem='false'
        showPagination='false'
        showBreadcrumbs={breadcrumb}
      />
      <div className='main--content__create'>
        <div className='container'>
          <form className='pt-5' onSubmit={(e) => handleSubmit(e)}>
            {alert.show && (
              <div className={`alert ${alert.type}`} role='alert'>
                {alert.message}
              </div>
            )}
            {/* <img src={isCompany === 'company' ? <faBuilding /> : <faUser />} width='100px' className='img-thumbnail mb-3' alt='...'></img> */}
            <span className='user__icons'>{isCompany === 'company' ? <BiBuildings /> : <BiUser />}</span>
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

export default ContactCreate
