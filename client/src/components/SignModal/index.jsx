import React, { useState } from 'react'
import './style.scss'

import { Modal, Tab, Form, Popup, Button, Label, Icon } from 'semantic-ui-react'

const SignModal = ({ showModal, setShowModal, activeTab, setActiveTab }) => {
  const handleTabChange = (e, { activeIndex }) => setActiveTab(activeIndex)

  const [signupForm, setSignupForm] = useState({
    usernmae: '',
    email: '',
    passowrd: ''
  })

  const { username, email: upEmail, password: upPassword } = signupForm

  const handleSignupChange = e => {}

  const handleSignupSubmit = e => {
    console.log(e.target)
  }

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  const { email: inEmail, passowrd: inPassword } = loginForm

  const handleLoginChange = e => {}

  return (
    <>
      <Modal open={showModal} size='tiny'>
        <Tab
          activeIndex={activeTab}
          onTabChange={handleTabChange}
          panes={[
            {
              menuItem: { content: 'Sign up', className: 'tab-header' },
              render: () => (
                <Tab.Pane>
                  <Form size='large' onSubmit={handleSignupSubmit}>
                    <Form.Input
                      fluid
                      icon='user'
                      iconPosition='left'
                      name='username'
                      value={username}
                      placeholder='Username'
                      onChange={handleSignupChange}
                    />

                    <Form.Input
                      fluid
                      icon='mail'
                      iconPosition='left'
                      name='email'
                      value={upEmail}
                      placeholder='E-mail'
                      onChange={handleSignupChange}
                    />

                    <Form.Input
                      fluid
                      icon='lock'
                      type='password'
                      iconPosition='left'
                      name='password'
                      value={upPassword}
                      placeholder='Password'
                      onChange={handleSignupChange}
                    />

                    <Button color='teal' fluid size='large'>
                      Login
                    </Button>
                  </Form>
                </Tab.Pane>
              )
            },

            {
              menuItem: { content: 'Log in', className: 'tab-header' },
              render: () => (
                <Tab.Pane>
                  <Form size='large' onSubmit={() => {}} loading={false}>
                    <Form.Input
                      fluid
                      icon='mail'
                      iconPosition='left'
                      name='email'
                      value={inEmail}
                      placeholder='E-mail'
                      onChange={handleLoginChange}
                    />

                    <Form.Input
                      error
                      fluid
                      icon='lock'
                      type='password'
                      iconPosition='left'
                      name='password'
                      value={inPassword}
                      placeholder='Password'
                      onChange={handleLoginChange}
                    />

                    <Button color='teal' fluid size='large'>
                      Login
                    </Button>
                  </Form>
                </Tab.Pane>
              )
            }
          ]}
        />

        <Label
          floating
          color='red'
          style={{ cursor: 'pointer' }}
          onClick={() => setShowModal(false)}
        >
          <Icon name='close' />
        </Label>
      </Modal>
    </>
  )
}

export default SignModal
