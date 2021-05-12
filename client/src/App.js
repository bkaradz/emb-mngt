import './sass/main.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Nav from './components/Nav/Nav'
import Sales from './components/Sales'
import Dashboard from './components/Dashboard'
import Contacts from './components/Contacts'
import Error from './components/Error'

const App = () => {
  return (
    //
    <Router>
      {/* style={{ gridTemplateColumns: '70px 1fr' }} */}
      <div className='App'>
        <Header />
        <Nav />
        <Switch>
          <Route exact path='/'>
            <Dashboard />
          </Route>
          <Route exact path='/contacts'>
            <Contacts />
          </Route>
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
