import './sass/main.scss'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header/Header'
// import Login from './components/Auth/Login'
import Nav from './components/Nav/Nav'
import Sales from './components/Main/Sales/Sales'
import Dashboard from './components/Main/Dashboard/Dashboard'
import Customers from './components/Main/Customers/Customers'
import CustomerCreate from './components/Main/Customers/CustomerCreate'
import CustomerEdit from './components/Main/Customers/CustomerEdit'
import CustomerView from './components/Main/Customers/CustomerView'
import Products from './components/Main/Products/Products'
import Users from './components/Main/Users/Users'
import UserCreate from './components/Main/Users/UserCreate'
import UserEdit from './components/Main/Users/UserEdit'

import Messages from './components/Main/Messages/Messages'
import Error from './components/Main/Error'
import { loadUser, userAuthFailed, userAuthSuccess } from './store/features/auth/authSlice'
import { setAllUiStates } from './store/features/ui/uiSlice'
import { uiStates } from './components/Main/PageHeader/pageUiData'

import { useDispatch } from 'react-redux'
import setAuthToken from './utils/setAuthToken'

const App = () => {
  const dispatch = useDispatch()
  const [bigNav, setBigNav] = useState(true)

  setAuthToken(localStorage.token)

  useEffect(() => {
    const getData = async () => {
      try {
        // Load User
        const loadUserRes = await axios.get('/api/auth')
        dispatch(loadUser(loadUserRes.data))
        dispatch(userAuthSuccess(localStorage.token))
        // Load UI states
        dispatch(setAllUiStates(uiStates))
      } catch (err) {
        console.error(err.response.data.msg)
        dispatch(userAuthFailed())
        localStorage.removeItem('token')
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = (e) => {
    if (bigNav === true) {
      setBigNav(false)
    } else {
      setBigNav(true)
    }
  }

  return (
    <Router>
      <div className='App bg' style={bigNav ? { gridTemplateColumns: '220px 1fr' } : { gridTemplateColumns: '70px 1fr' }}>
        <Header handleClick={handleClick} bigNav={bigNav} />
        <Nav bigNav={bigNav} />
        <Switch>
          {/* Dashboard Routes */}
          <Route exact path='/' children={<Dashboard />} />

          {/* Login Routes */}
          {/* <Route exact path='/login' children={<Login />} /> */}

          {/* Products Routes */}
          <Route exact path='/products' children={<Products />} />

          {/* Users Routes */}
          <Route exact path='/settings/users' children={<Users />} />
          <Route exact path='/settings/user/create' children={<UserCreate />} />
          <Route exact path='/settings/user/edit/:id' children={<UserEdit />} />

          {/* Customers Routes */}
          <Route exact path='/customers' children={<Customers />} />
          <Route exact path='/customer/view/:id' children={<CustomerView />} />
          <Route exact path='/customer/edit/:id' children={<CustomerEdit />} />
          <Route exact path='/customer/create' children={<CustomerCreate />} />

          {/* Messages Routes */}
          <Route exact path='/messages' children={<Messages />} />

          {/* Sales Routes */}
          <Route exact path='/sales' children={<Sales />} />

          {/* Error Route */}
          <Route exact path='*' children={<Error />} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
