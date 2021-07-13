import Notification from '../../Notification/Notification'

import Button from '@material-ui/core/Button'
import { createAlert } from '../../../store/features/alerts/alertsSlice'

import { useDispatch } from 'react-redux'
import MainPageBase from '../MainPageBase'

const Dashboard = (props) => {
  const dispatch = useDispatch()

  const clickHandler = () => {
    dispatch(createAlert({ msg: 'This is an error alert', type: 'error' }))
  }

  return (
    <MainPageBase>
      <h1>Dashboard</h1>
      <Notification />

      <Button variant='contained' onClick={clickHandler}>
        Notification
      </Button>
    </MainPageBase>
  )
}

export default Dashboard
