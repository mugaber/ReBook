import React, { useState, createContext } from 'react'
import { setAuthToken } from '../utils'
import Axios from 'axios'

//

const initialUserData = {
  user: null,
  token: null,
  loading: true,
  isAuthenticated: false
}

// CONTEXT

export const UserContext = createContext({
  userData: initialUserData,
  loadUser: () => {},
  loginUser: () => {},
  logoutUser: () => {},
  signupUser: () => {}
})

// PROVIDER

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialUserData)

  const loadUser = async () => {
    const authToken = localStorage.getItem('rebook-user-token')
    setAuthToken(authToken)

    if (!authToken) {
      return setUserData(initialUserData)
    }

    try {
      const res = await Axios.get('/users/auth')

      return setUserData({
        user: res.data.user,
        isAuthenticated: true,
        loading: false,
        token: authToken
      })

      // ALERT USER

      //
    } catch (err) {
      setUserData(initialUserData)
      localStorage.removeItem('rebook-user-token')

      // err -> response ->

      // ALERT USER
    }
  }

  const loginUser = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ email, password })

    try {
      const res = await Axios.post('/users/auth', body, config)

      localStorage.setItem('rebook-user-token', res.data.token)
      loadUser()

      // ALERT USER

      //
    } catch (error) {
      // ALERT IN THE FORM
      return error.response
    }
  }

  const signupUser = async (username, email, password) => {
    const body = JSON.stringify({ username, email, password })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await Axios.post('/users', body, config)

      localStorage.setItem('rebook-user-token', res.data.token)
      loadUser()

      // ALERT USER

      //
    } catch (err) {
      // ALERT IN THE FORM
      return err.response
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('rebook-user-token')
    setUserData(initialUserData)
  }

  return (
    <UserContext.Provider
      value={{ userData, loadUser, loginUser, signupUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
