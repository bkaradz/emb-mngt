import PageHeader from './Main/PageHeader/PageHeader'
import Notification from '../components/Notification/Notification'

import Button from '@material-ui/core/Button'
import { createAlert } from '../store/features/alerts/alertsSlice'

import { useDispatch } from 'react-redux'

const Dashboard = (props) => {
  const dispatch = useDispatch()
  const breadcrumb = {
    link: [
      { name: 'Home', url: '/' },
      { name: 'Contacts', url: '/contacts' },
      { name: 'View', url: '#' },
    ],
  }

  const clickHandler = () => {
    dispatch(createAlert({ msg: 'This is an error alert', type: 'error' }))
  }

  return (
    <div className='main'>
      <PageHeader
        showSearch='false'
        nameCreateBtn='Edit'
        nameImportBtn='Discard'
        showImportBtn='false'
        showListOrCardItem='false'
        showPagination='false'
        showBreadcrumbs={breadcrumb}
      />
      <div>
        <Notification />

        <Button variant='contained' onClick={clickHandler}>
          Notification
        </Button>
      </div>
    </div>
  )
}

export default Dashboard
