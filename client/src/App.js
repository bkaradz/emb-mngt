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

import Error from './components/Error'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [bigNav, setBigNav] = useState(true)
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || '')

  useEffect(() => {
    // console.log(typeof jwt)
    // console.log(jwt)
    if (jwt) {
      // console.log(jwt)
      // check that the jwt is still valid
      const getAuth = async () => {
        // console.log('Test')
        try {
          // console.log('Test2')
          axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('jwt')
          await axios.get('/api/auth')
          // console.log('Test3')
          // console.log(response.data)
          setIsLoggedIn(true)
        } catch (err) {
          console.error(err.message)
        }
      }
      getAuth()
    } else {
      localStorage.setItem('jwt', '')
      setJwt('')
      setIsLoggedIn(false)
    }
  }, [jwt])

  const handleClick = (e) => {
    if (bigNav === true) {
      setBigNav(false)
    } else {
      setBigNav(true)
    }
  }
  if (!isLoggedIn) {
    return (
      <div className='App_Login'>
        <Router>
          <Login setIsLoggedIn={setIsLoggedIn} />
        </Router>
      </div>
    )
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
          <Route path='/customer/view/:id' children={<CustomerView />} />
          <Route exact path='/customer/create'>
            <CustomerCreate />
          </Route>
          <Route path='/customer/edit/:id' children={<CustomerEdit />} />
          <Route exact path='/Sales'>
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
