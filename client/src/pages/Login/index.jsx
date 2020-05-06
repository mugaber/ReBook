import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import './login.scss'

import { connect } from 'react-redux'

import { Grid } from 'semantic-ui-react'
import LoginForm from '../../components/LoginForm'

//

const LoginPage = ({ user }) => {
  if (user.isAuthenticated && user.user) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-page__container">
      <h1>Login</h1>
      <Grid>
        <Grid.Column
          stretched
          tablet="8"
          mobile="10"
          largeScreen="6"
          className="login-form__container"
        >
          <LoginForm />
        </Grid.Column>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(LoginPage)
