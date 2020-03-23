import React, { useState } from 'react'
import './style.scss'

import { Modal, Form, Popup, Button, Label, Icon } from 'semantic-ui-react'

const initFormErrors = {
  username: { state: false, text: '' },
  email: { state: false, text: '' },
  password: { state: false, text: '' }
}

const Signup = ({ showModal, setShowModal }) => {
  const [formInputs, setFormInputs] = useState({
    username: '',
    email: '',
    password: ''
  })

  const { username, email, password } = formInputs

  const handleInputChange = e => {
    setFormErrors(initFormErrors)
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value })
  }

  const [formErrors, setFormErrors] = useState(initFormErrors)

  const [formLoading, setFormLoading] = useState(false)

  const handleSubmit = e => {
    const emailRe = /^(\w){2,20}@(\w){2,10}\.(\w){2,10}$/gi
    const usernameRe = /^(\w){2,25}$/gi

    const isUsernameValid = usernameRe.test(username)
    if (!isUsernameValid)
      return setFormErrors({
        ...formErrors,
        username: {
          state: true,
          text: 'Username can only contain letters, numbers and _'
        }
      })

    const isEmailValid = emailRe.test(email)
    if (!isEmailValid)
      return setFormErrors({
        ...formErrors,
        email: { state: true, text: 'Invalid email address' }
      })

    const isPasswordValid = password.length >= 6
    if (!isPasswordValid)
      return setFormErrors({
        ...formErrors,
        password: { state: true, text: 'Password can not be less than 6 chars' }
      })

    setFormLoading(true)
    setTimeout(() => {
      setFormLoading(false)
      setShowModal(false)
    }, 500)
  }

  return (
    <Modal open={showModal} size='tiny'>
      <Modal.Header>Sign up</Modal.Header>
      <Modal.Content>
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
        </Form>

        <Label
          floating
          color='red'
          style={{ cursor: 'pointer' }}
          onClick={() => setShowModal(false)}
        >
          <Icon name='close' />
        </Label>
      </Modal.Content>
    </Modal>
  )
}

export default Signup
