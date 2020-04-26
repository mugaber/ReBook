import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import './style.scss'

import { UserContext } from '../../providers'
import Favicon from '../../assets/favicon.ico'
import { Menu, Segment, Button } from 'semantic-ui-react'

//

const Navbar = ({ history, location }) => {
  const { user: currentUser } = useContext(UserContext)
  const [activeItem, setActiveItem] = useState(location.pathname.slice(1))

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
                  inverted
                  className='nav-button sign-up'
                  onClick={() => history.push('/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}

export default withRouter(Navbar)
