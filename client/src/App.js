import './sass/main.scss'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header'
import Login from './components/Auth/Login'
import Nav from './components/Nav/Nav'
import Sales from './components/Sales'
import Dashboard from './components/Dashboard'
import Customers from './components/Main/Customers/Customers'
import CustomerCreate from './components/Main/Customers/CustomerCreate'
import CustomerEdit from './components/Main/Customers/CustomerEdit'
import CustomerView from './components/Main/Customers/CustomerView'
import Products from './components/Main/Products/Products'
import Users from './components/Main/Users/Users'
import Messages from './components/Main/Messages/Messages'
import { loadUser, userAuthFailed, userAuthSuccess } from './store/features/auth/authSlice'

import Error from './components/Error'
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
          <Route exact path='/'>
            <Dashboard />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/customers'>
            <Customers />
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route exact path='/settings/users'>
            <Users />
          </Route>
          <Route exact path='/messages'>
            <Messages />
          </Route>
          <Route path='/customer/view/:id' children={<CustomerView />} />
          <Route exact path='/customer/create'>
            <CustomerCreate />
          </Route>
          <Route path='/customer/edit/:id' children={<CustomerEdit />} />
          <Route exact path='/sales'>
            <Sales />
          </Route>
          <Route exact path='*'>
            <Error />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
