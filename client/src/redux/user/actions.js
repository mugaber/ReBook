import axios from 'axios'
import { setAuthToken } from '../../utils'
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT
} from '../action_types'

//

export const loadUser = () => async dispatch => {
  const token = localStorage.getItem('rebook-user-token')

  if (!token) {
    return
  }

  setAuthToken(token)

  try {
    const res = await axios.get('/users/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password })

  try {
    const res = await axios.post('/users', body, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    // ALERT IN FORM
    return err.response
  }
}

// LOGIN USER
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ email, password })

  try {
    const res = await axios.post('/users/auth', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    // ALERT IN FORM
    return err.response
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('rebook-user-token')

  dispatch({ type: LOGOUT })
}
