import React, { useState } from 'react'
import './style.scss'

import { connect } from 'react-redux'
import { register } from '../../redux/user/actions'
import { setAlert } from '../../redux/alert/actions'

import { validateSignup } from '../../utils'
import { Form, Popup, Button, Message } from 'semantic-ui-react'

//

const initFormErrors = {
  username: { state: false, text: '' },
  email: { state: false, text: '' },
  password: { state: false, text: '' }
}

//

const SignupForm = ({ register, setAlert }) => {
  const [formInputs, setFormInputs] = useState({ username: '', email: '', password: '' })
  const { username, email, password } = formInputs

  const [formLoading, setFormLoading] = useState(false)
  const [formErrors, setFormErrors] = useState(initFormErrors)

  const [signupResponse, setSignupResponse] = useState({ show: false, errors: [] })

  const handleInputChange = e => {
    setFormErrors(initFormErrors)
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    const validateData = validateSignup(username, email, password)

    if (validateData.name)
      return setFormErrors({ ...formErrors, [validateData.name]: validateData.value })

    setFormLoading(true)

    const res = await register(username, email, password)

    // if errors
    if (res) {
      setFormLoading(false)

      setSignupResponse({
        show: true,
        errors: res.data.errors
      })

      setTimeout(() => setSignupResponse({ show: false, errors: [] }), 6000)
    }

    setAlert('Signedup successfully', 'success')
  }

  return (
    <Form size="large" onSubmit={handleSubmit} loading={formLoading}>
      <Popup
        inverted
        style={{ opacity: 0.8 }}
        position="right center"
        open={formErrors.username.state}
        content={formErrors.username.text}
        trigger={
          <Form.Input
            fluid
            icon="user"
            iconPosition="left"
            required
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleInputChange}
            error={formErrors.username.state}
          />
        }
      />

      <Popup
        inverted
        style={{ opacity: 0.8 }}
        position="right center"
        open={formErrors.email.state}
        content={formErrors.email.text}
        trigger={
          <Form.Input
            fluid
            icon="mail"
            iconPosition="left"
            required
            name="email"
            value={email}
            placeholder="E-mail"
            onChange={handleInputChange}
            error={formErrors.email.state}
          />
        }
      />

      <Popup
        inverted
        style={{ opacity: 0.8 }}
        position="right center"
        open={formErrors.password.state}
        content={formErrors.password.text}
        trigger={
          <Form.Input
            fluid
            icon="lock"
            type="password"
            iconPosition="left"
            required
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleInputChange}
            error={formErrors.password.state}
          />
        }
      />

      <Button color="teal" fluid size="large" className="register-button">
        Register
      </Button>

      {signupResponse.show &&
        signupResponse.errors.map(error => (
          <Message key={error.msg} color="red" header={error.param} content={error.msg} />
        ))}
    </Form>
  )
}

export default connect(null, { register, setAlert })(SignupForm)
