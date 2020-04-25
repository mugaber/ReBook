import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import './style.scss'

import SignupModal from '../Signup'
import Favicon from '../../assets/favicon.ico'
import { Menu, Segment, Button } from 'semantic-ui-react'

//

const Navbar = ({ history }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const localUser = localStorage.getItem('rebookUser')
    setCurrentUser(localUser)
  }, [currentUser])

  const [activeItem, setActiveItem] = useState('home')

  const [showSignup, setShowSignup] = useState(false)

  const handleMenuItemClick = (e, { name }) => {
    setActiveItem(name)
    if (name === 'home') name = ''
    history.push(`/${name}`)
  }

  return (
    <Segment inverted className='nav-bar__segment'>
      <Menu inverted secondary>
        <Menu.Item className='rebook-name'>
          <img src={Favicon} alt='favicon' />
          ReBook
        </Menu.Item>

        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleMenuItemClick}
        />

        <Menu.Item
          name='search'
          active={activeItem === 'search'}
          onClick={handleMenuItemClick}
        />

        {currentUser && (
          <Menu.Item
            name='library'
            active={activeItem === 'library'}
            onClick={handleMenuItemClick}
          />
        )}

        <Menu.Menu position='right'>
          <Menu.Item>
            {currentUser ? (
              <Button className='nav-button' color='red' inverted>
                Log Out
              </Button>
            ) : (
              <>
                <Button as='a' className='nav-button log-in' color='green' inverted>
                  Log In
                </Button>

                <Button
                  as='a'
                  className='nav-button sign-up'
                  inverted
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Menu.Item>
        </Menu.Menu>

        {showSignup && (
          <SignupModal
            showModal={showSignup}
            setShowModal={setShowSignup}
            setUser={setCurrentUser}
          />
        )}
      </Menu>
    </Segment>
  )
}

export default withRouter(Navbar)
