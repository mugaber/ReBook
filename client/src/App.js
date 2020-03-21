import React from 'react'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import SearchPage from './pages/Search'
import HomePage from './pages/Home'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/search' component={SearchPage} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
