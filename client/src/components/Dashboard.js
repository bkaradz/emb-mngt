import MainHeader from './Main/Header/MainHeader'
// import Notification from '../components/Notification/Notification'
// import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { createAlert, deleteAlert } from '../store/features/alerts/alertsSlice'
import Alert from '@material-ui/lab/Alert'
import { useSelector, useDispatch } from 'react-redux'

const Dashboard = (props) => {
  const dispatch = useDispatch()
  const allAlerts = useSelector((state) => state.alerts)
  let setId = ''
  const breadcrumb = {
    link: [
      { name: 'Home', url: '/' },
      { name: 'Contacts', url: '/contacts' },
      { name: 'View', url: '#' },
    ],
  }

  const clickHandler = (e) => {
    dispatch(createAlert({ msg: 'This is an error alert', type: 'error' }))
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
      <div>
        {/* <Notification /> */}
        <div>
          {allAlerts.map((alt) => {
            const { id, msg, type } = alt
            setId = id
            return (
              <Alert key={id} severity={type}>
                {msg}
              </Alert>
            )
          })}
        </div>
        <Button variant='contained' onClick={clickHandler}>
          Default
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
