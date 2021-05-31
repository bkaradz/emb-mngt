import React, { useState, useRef } from 'react'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap-v5'
// import { BiUser } from 'react-icons/bi'

function Login({ setNotLoggedIn }) {
  const [modalShow, setModalShow] = useState(true)
  const [userToken, setUserToken] = useState(null)
  const refEmail = useRef(null)
  const refPassword = useRef(null)

  console.log(userToken)

  const handleSubmit = (e) => {
    e.preventDefault()
    const getData = async () => {
      const credentials = {
        email: refEmail.current.value,
        password: refPassword.current.value,
      }
      console.log(credentials)
      try {
        const response = await axios.post('http://localhost:4000/api/auth', credentials)

        console.log(response.data)
        setUserToken(response.data)
        setModalShow(false)
        setNotLoggedIn(false)
      } catch (err) {
        console.error(err.message)
        console.log('Server Error')
      }
    }
    getData()
  }

  return (
    <div className='main'>
      {/* <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(true)} /> */}
      <Modal show={modalShow} className='modal-open' size='lg' aria-labelledby='login-modal' centered>
        <Modal.Header>
          <Modal.Title className='text-primary' id='login-modal'>
            Login
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Body>
            <h4>Sign In</h4>
            <div className='mb-3'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Email address
              </label>
              <input ref={refEmail} type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' />
            </div>
            <div className='mb-3'>
              <label htmlFor='exampleInputPassword1' className='form-label'>
                Password
              </label>
              <input ref={refPassword} type='password' className='form-control' id='exampleInputPassword1' />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type='submit'>Login</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default Login
