import React, { useState, useRef } from 'react'

import { Modal, Button } from 'react-bootstrap-v5'
// import { BiUser } from 'react-icons/bi'

function Login() {
  const [modalShow, setModalShow] = useState(true)
  const refEmail = useRef(null)
  const refPassword = useRef(null)

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal className='modal-open' {...props} size='lg' aria-labelledby='login-modal' centered>
        <Modal.Header>
          <Modal.Title id='login-modal'>Login</Modal.Title>
        </Modal.Header>
        <form>
          <Modal.Body>
            <h4>Login User</h4>
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
            <Button type='submit' onClick={props.onHide}>
              Login
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }
  return (
    <div className='main'>
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(true)} />
    </div>
  )
}

export default Login
