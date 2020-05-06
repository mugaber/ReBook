import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from '../action_types'

const initialState = {
  token: localStorage.getItem('rebook-user-token'),
  isAuthenticated: null,
  loading: true,
  user: null
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('rebook-user-token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      }

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('rebook-user-token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      }

    default:
      return state
  }
}
