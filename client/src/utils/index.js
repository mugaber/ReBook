import Axios from 'axios'

//

export function setAuthToken(authToken) {
  if (authToken) {
    Axios.defaults.headers.common['x-auth-token'] = authToken
  } else {
    delete Axios.defaults.headers.common['x-auth-token']
  }
}

// VALIDATION

export function validateLogin(email, password) {
  const emailRe = /^(\w){2,20}@(\w){2,10}\.(\w){2,10}$/gi

  const isEmailValid = emailRe.test(email)
  if (!isEmailValid)
    return {
      name: 'email',
      value: { state: true, text: 'Invalid email address' }
    }

  const isPasswordValid = password.length >= 6
  if (!isPasswordValid)
    return {
      name: 'password',
      value: { state: true, text: 'Password can not be less than 6 chars' }
    }

  return { name: false }
}

export function validateSignup(username, email, password) {
  const emailRe = /^(\w){2,20}@(\w){2,10}\.(\w){2,10}$/gi
  const usernameRe = /^(\w){2,25}$/gi

  const isUsernameValid = usernameRe.test(username)
  if (!isUsernameValid)
    return {
      name: 'username',
      value: { state: true, text: 'Username can only contain letters, numbers and _' }
    }

  const isEmailValid = emailRe.test(email)
  if (!isEmailValid)
    return {
      name: 'email',
      value: { state: true, text: 'Invalid email address' }
    }

  const isPasswordValid = password.length >= 6
  if (!isPasswordValid)
    return {
      name: 'password',
      value: { state: true, text: 'Password can not be less than 6 chars' }
    }

  return { name: false }
}
