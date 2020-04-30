import React, { useEffect, useContext, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { UserContext } from './providers/user'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Spinner from './components/Spinner'
import ErrorBoundary from './components/ErrorBoundary'

const BookPage = lazy(() => import('./pages/Book'))
const HomePage = lazy(() => import('./pages/Home'))
const SearchPage = lazy(() => import('./pages/Search'))
const LoginPage = lazy(() => import('./pages/Login'))
const SignupPage = lazy(() => import('./pages/Signup'))

//

function App() {
  const { loadUser } = useContext(UserContext)

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <Router>
      <Navbar />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/search' component={SearchPage} />
            <Route exact path='/book/:id' component={BookPage} />
            <Route exact path='/signup' component={SignupPage} />
            <Route exact path='/login' component={LoginPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
