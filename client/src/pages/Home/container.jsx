import React from 'react'
import { connect } from 'react-redux'
import HomePageComponent from './index'
import { Redirect } from 'react-router-dom'

//

const HomePageContainer = ({ user }) => {
  if (user.isAuthenticated && user.user) {
    return <Redirect to='/search' />
  }

  return <HomePageComponent />
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(HomePageContainer)
