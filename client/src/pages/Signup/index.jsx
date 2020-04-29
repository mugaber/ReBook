import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../providers/user'
import './signup.scss'

import { Grid } from 'semantic-ui-react'
import SignupForm from '../../components/SignupForm'

//

const SignupPage = () => {
  // requires clean up -> willUnMount
  const { userData } = useContext(UserContext)

  if (userData.isAuthenticated && userData.user) {
    return <Redirect to='/' />
  }

  return (
    <div className='signup-page__container'>
      <h1>Signup</h1>
      <Grid>
        <Grid.Column
          stretched
          tablet='8'
          mobile='10'
          largeScreen='6'
          className='signup-form__container'
        >
          <SignupForm />
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default SignupPage