import './sass/main.scss'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'

// Main page components
import Header from './components/Header/Header'
import Nav from './components/Nav/Nav'
// Dashboard components
import Dashboard from './components/Main/Dashboard/Dashboard'
// Messages components
import Messages from './components/Main/Messages/Messages'
// Customers components
import Customers from './components/Main/Customers/Customers'
import CustomerCreate from './components/Main/Customers/CustomerCreate'
import CustomerEdit from './components/Main/Customers/CustomerEdit'
import CustomerView from './components/Main/Customers/CustomerView'
// Sales components
import Sales from './components/Main/Sales/Sales'
import SalesQuotation from './components/Main/Sales/SalesQuotation'
// Products components
import Products from './components/Main/Products/Products'
import ProductView from './components/Main/Products/ProductView'
import ProductEdit from './components/Main/Products/ProductEdit'
import ProductCreate from './components/Main/Products/ProductCreate'
// Production components
import Production from './components/Main/Production/Production'
// Settings components
import Settings from './components/Main/Settings/Settings'
// Users components
import Users from './components/Main/Users/Users'
import UserCreate from './components/Main/Users/UserCreate'
import UserEdit from './components/Main/Users/UserEdit'
// Error components
import Error from './components/Main/Error'

import { loadUser, userAuthFailed, userAuthSuccess } from './store/features/auth/authSlice'

import { useDispatch } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { getCurrentUiState } from './store/features/ui/uiSlice'

const App = () => {
  const dispatch = useDispatch()
  const [bigNav, setBigNav] = useState(true)

  setAuthToken(localStorage.token)

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(getCurrentUiState('/'))
        // Load UI states
        // dispatch(getAllUiStates())
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
          {/* Login Routes */}
          {/* <Route exact path='/login' children={<Login />} /> */}

          {/* Dashboard Routes */}
          <Route exact path='/' children={<Dashboard />} />

          {/* Messages Routes */}
          <Route exact path='/messages' children={<Messages />} />

          {/* Customers Routes */}
          <Route exact path='/customers' children={<Customers />} />
          <Route exact path='/customer/view/:id' children={<CustomerView />} />
          <Route exact path='/customer/edit/:id' children={<CustomerEdit />} />
          <Route exact path='/customer/create' children={<CustomerCreate />} />

          {/* Sales Routes */}
          <Route exact path='/sales' children={<Sales />} />
          <Route exact path='/sales/quotation' children={<SalesQuotation />} />

          {/* Products Routes */}
          <Route exact path='/products' children={<Products />} />
          <Route exact path='/product/create' children={<ProductCreate />} />
          <Route exact path='/product/view/:id' children={<ProductView />} />
          <Route exact path='/product/edit/:id' children={<ProductEdit />} />

          {/* Production Routes */}
          <Route exact path='/production' children={<Production />} />

          {/* Settings Routes */}
          <Route exact path='/settings' children={<Settings />} />

          {/* Users Routes */}
          <Route exact path='/settings/users' children={<Users />} />
          <Route exact path='/settings/user/create' children={<UserCreate />} />
          <Route exact path='/settings/user/edit/:id' children={<UserEdit />} />

          {/* Error Route */}
          <Route exact path='*' children={<Error />} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
