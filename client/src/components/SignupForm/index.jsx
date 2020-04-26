import React, { useState } from 'react'
import './style.scss'

import { validateSignup, signupUser } from '../../utils'
import { Form, Popup, Button, Message } from 'semantic-ui-react'

//

const initSignupRes = { show: false, type: '', text: '' }

const initFormErrors = {
  username: { state: false, text: '' },
  email: { state: false, text: '' },
  password: { state: false, text: '' },
}

//

const SignupForm = () => {
  const [formInputs, setFormInputs] = useState({ username: '', email: '', password: '' })
  const { username, email, password } = formInputs

  const [formLoading, setFormLoading] = useState(false)
  const [formErrors, setFormErrors] = useState(initFormErrors)
  const [signupResponse, setSignupResponse] = useState(initSignupRes)

  const handleInputChange = e => {
    setFormErrors(initFormErrors)
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    const validateData = validateSignup(username, email, password)
    if (validateData.name)
      return setFormErrors({ ...formErrors, [validateData.name]: validateData.value })

    setFormLoading(true)

    const signupRes = await signupUser(username, email, password)

    if (signupRes.type === 'success') {
      // TO-DO: SETUP THE USER and ALERT THE USER
      setSignupResponse({ show: true, type: 'success' })
    } else if (signupRes.type === 'error') {
      setSignupResponse({
        show: true,
        type: 'error',
        text: signupRes.error.response.data.errors[0].msg,
      })
    }

    setFormLoading(false)
    setTimeout(() => setSignupResponse(initSignupRes), 6000)
  }

  return (
    <Form size='large' onSubmit={handleSubmit} loading={formLoading}>
      <Popup
        inverted
        style={{ opacity: 0.8 }}
        position='right center'
        open={formErrors.username.state}
        content={formErrors.username.text}
        trigger={
          <Form.Input
            fluid
            icon='user'
            iconPosition='left'
            required
            name='username'
            value={username}
            placeholder='Username'
            onChange={handleInputChange}
            error={formErrors.username.state}
          />
        }
      />

      <Popup
        inverted
        style={{ opacity: 0.8 }}
        position='right center'
        open={formErrors.email.state}
        content={formErrors.email.text}
        trigger={
          <Form.Input
            fluid
            icon='mail'
            iconPosition='left'
            required
            name='email'
            value={email}
            placeholder='E-mail'
            onChange={handleInputChange}
            error={formErrors.email.state}
          />
        }
      />

      <Popup
        inverted
        style={{ opacity: 0.8 }}
        position='right center'
        open={formErrors.password.state}
        content={formErrors.password.text}
        trigger={
          <Form.Input
            fluid
            icon='lock'
            type='password'
            iconPosition='left'
            required
            name='password'
            value={password}
            placeholder='Password'
            onChange={handleInputChange}
            error={formErrors.password.state}
          />
        }
      />

      <Button color='teal' fluid size='large' className='register-button'>
        Register
      </Button>

      {signupResponse.show && signupResponse.type === 'success' && (
        <Message
          color='green'
          header='Sign up success'
          content='Now you can save books to the library'
        />
      )}

      {signupResponse.show && signupResponse.type === 'error' && (
        <Message color='red' header='Sign up failure' content={signupResponse.text} />
      )}
    </Form>
  )
}

export default SignupForm
