import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../providers/user'
import './login.scss'

import { Grid } from 'semantic-ui-react'
import LoginForm from '../../components/LoginForm'

//

const LoginPage = () => {
  const { userData } = useContext(UserContext)

  if (userData.isAuthenticated && userData.user) {
    return <Redirect to='/' />
  }

  return (
    <div className='login-page__container'>
      <h1>Login</h1>
      <Grid>
        <Grid.Column
          stretched
          tablet='8'
          mobile='10'
          largeScreen='6'
          className='login-form__container'
        >
          <LoginForm />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default LoginPage
