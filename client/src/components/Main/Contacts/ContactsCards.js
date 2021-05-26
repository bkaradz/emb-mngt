import React from 'react'
import { FaThLarge, FaThList, FaBuilding, FaEdit, FaUser } from 'react-icons/fa'
import { BiBuildings, BiUser, BiXCircle } from 'react-icons/bi'

function ContactsCards({ contactsData }) {
  if (contactsData === null) {
    return (
      <div className='main--content__Cards container-fluid'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <div className='main--content__Cards container-fluid'>
      <div className='row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4'>
        {contactsData.map((contact) => {
          const { _id, isCompany, name, email, phone, balance } = contact
          return (
            <div className='col text-end' key={_id}>
              <div className='card mt-4' style={{ maxWidth: '450px' }}>
                <div className='row g-0 d-flex justify-content-center align-items-center'>
                  <div className='col-md-4 d-flex justify-content-center align-items-center '>
                    <span className='user__icons'>{isCompany === 'company' ? <BiBuildings /> : <BiUser />}</span>
                  </div>
                  <div className='col-md-8'>
                    <div className='card-body m-0 p-0 pe-3'>
                      <h5 className='card-title'>{name}</h5>
                      <div className='card-text'>
                        <p className='p-0 m-0'>
                          <small>{phone}</small>
                        </p>
                        <p className='p-0 m-0'>
                          <small>{email}</small>
                        </p>
                        <p className='p-0 m-0 text-primary fw-bold fst-italic'>$ {balance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ContactsCards
