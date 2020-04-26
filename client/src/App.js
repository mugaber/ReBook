import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Book from './pages/Book'
import HomePage from './pages/Home'
import SearchPage from './pages/Search'
import SignupPage from './pages/Signup'

//

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/search' component={SearchPage} />
        <Route exact path='/book/:id' component={Book} />
        <Route exact path='/signup' component={SignupPage} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
