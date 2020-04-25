import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import SearchPage from './pages/Search'
import HomePage from './pages/Home'
import Book from './pages/Book'

//

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/search' component={SearchPage} />
        <Route exact path='/book/:id' component={Book} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
