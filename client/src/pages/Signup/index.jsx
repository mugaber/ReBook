import React from 'react'
import './signup.scss'
import { Grid } from 'semantic-ui-react'
import SignupForm from '../../components/SignupForm'

//

const SignupPage = () => {
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
