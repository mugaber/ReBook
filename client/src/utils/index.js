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

// SIGNUP

export async function signupUserUtil(username, email, password) {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } }
    const body = JSON.stringify({ username, email, password })
    const res = await Axios.post('/users', body, config)

    console.log('signup success', res)

    localStorage.setItem('rebook-user-token', res.token)

    return res

    //
  } catch (error) {
    return error.response
  }
}

// LOGIN

export async function loginUserUtil(email, password) {
  try {
    const body = JSON.stringify({ email, password })
    const config = {
      headers: {
        'Contect-Type': 'application/json'
      }
    }

    const res = await Axios.post('/auth', body, config)

    localStorage.setItem('rebook-user-token', res.token)

    return res

    //
  } catch (error) {
    const res = error.response
    return res
  }
}
