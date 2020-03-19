import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import SearchPage from './pages/Search'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/search' component={SearchPage} />
      </Switch>
    </Router>
  )
}

export default App
