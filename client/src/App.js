import './sass/main.scss'
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
// import Login from './components/Login/Login'
import Nav from './components/Nav/Nav'
import Sales from './components/Sales'
import Dashboard from './components/Dashboard'
import Contacts from './components/Main/Contacts/Contacts'
import ContactsCreate from './components/Main/Contacts/ContactCreate'
import ContactEdit from './components/Main/Contacts/ContactEdit'
import ContactView from './components/Main/Contacts/ContactView'

import Error from './components/Error'

const App = () => {
  const [bigNav, setBigNav] = useState(true)
  const handleClick = (e) => {
    if (bigNav === true) {
      setBigNav(false)
    } else {
      setBigNav(true)
    }
  }
  return (
    <Router>
      {/* style={{ gridTemplateColumns: '220px 1fr' }} */}
      <div className='App' style={bigNav ? { gridTemplateColumns: '220px 1fr' } : { gridTemplateColumns: '70px 1fr' }}>
        <Header handleClick={handleClick} bigNav={bigNav} />
        <Nav bigNav={bigNav} />
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
          <Route exact path='/contacts'>
            <Contacts />
          </Route>
          <Route path='/contacts/view/:id' children={<ContactView />} />
          <Route exact path='/contacts/create'>
            <ContactsCreate />
          </Route>
          <Route path='/contacts/edit/:id' children={<ContactEdit />} />
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
