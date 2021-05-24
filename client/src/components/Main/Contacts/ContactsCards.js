import React from 'react'
import logo from '../../../img/logo.png'
import building from '../../../img/bootstrap/building.svg'
import person from '../../../img/bootstrap/person.svg'
import xCircle from '../../../img/bootstrap/x-circle.svg'

function ContactsCards({ contactsData }) {
  return (
    <div className='main--content__Cards container-fluid'>
      <div className='row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3 row-cols-xxl-4'>
        {contactsData.length > 0 ? (
          contactsData.map((contact) => {
            const { _id, isCompany, name, email, phone, balance } = contact
            return (
              <div className='col text-end' key={_id}>
                <div className='card mt-4' style={{ maxWidth: '450px' }}>
                  <div className='row g-0 d-flex justify-content-center align-items-center'>
                    <div className='col-md-4 d-flex justify-content-center align-items-center '>

                      <img src={isCompany === 'company' ? building : person} width='100px' className='img-thumbnail my-3' alt='...'></img>

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
                          <p className='p-0 m-0 text-primary'>
                            $ {balance}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (<div className='col'>
          <div className='card m-3 ' style={{ maxWidth: '350px' }}>
            <div className='row g-0'>
              <div className='col-md-4 d-flex justify-content-center align-items-center'>
                <img src={xCircle} alt='' width='100px' />
              </div>
              <div className='col-md-8'>
                <div className='card-body m-0 p-0 my-2'>
                  <h5 className='card-title'>Null</h5>
                  <div className='card-text'>
                    <p className='p-0 m-0'>
                      <small>There was an Error</small>
                    </p>
                    <p className='p-0 m-0'>
                      <small>Null</small>
                    </p>
                    <p className='p-0 m-0 text-primary'>
                      <small>Null</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)
        }

      </div>
    </div>
  )
}

export default ContactsCards
