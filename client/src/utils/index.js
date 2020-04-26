import axios from 'axios'

//

export function validateSignup(username, email, password) {
  const emailRe = /^(\w){2,20}@(\w){2,10}\.(\w){2,10}$/gi
  const usernameRe = /^(\w){2,25}$/gi

  const isUsernameValid = usernameRe.test(username)
  if (!isUsernameValid)
    return {
      name: 'username',
      value: { state: true, text: 'Username can only contain letters, numbers and _' },
    }

  const isEmailValid = emailRe.test(email)
  if (!isEmailValid)
    return {
      name: 'email',
      value: { state: true, text: 'Invalid email address' },
    }

  const isPasswordValid = password.length >= 6
  if (!isPasswordValid)
    return {
      name: 'password',
      value: { state: true, text: 'Password can not be less than 6 chars' },
    }

  return { name: false }
}

//

export async function signupUser(username, email, password) {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } }
    const body = JSON.stringify({ username, email, password })
    const res = await axios.post('http://localhost:5000/api/users', body, config)

    console.log('signup success', res)

    localStorage.setItem('rebookUser', email)
    localStorage.setItem('rebookToken', res.token)

    return { res, type: 'success' }
  } catch (error) {
    console.log('error signing up', error.response)

    return { type: 'error', error }
  }
}
