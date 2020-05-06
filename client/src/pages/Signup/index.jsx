import React from 'react'
import { Redirect } from 'react-router-dom'
import './signup.scss'

import { connect } from 'react-redux'

import { Grid } from 'semantic-ui-react'
import SignupForm from '../../components/SignupForm'

//

const SignupPage = ({ user }) => {
  // requires clean up -> willUnMount

  if (user.isAuthenticated && user.user) {
    return <Redirect to="/" />
  }

  return (
    <div className="signup-page__container">
      <h1>Signup</h1>
      <Grid>
        <Grid.Column
          stretched
          tablet="8"
          mobile="10"
          largeScreen="6"
          className="signup-form__container"
        >
          <SignupForm />
        </Grid.Column>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(SignupPage)
