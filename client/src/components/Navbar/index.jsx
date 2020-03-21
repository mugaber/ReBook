import React, { useState } from 'react'
import './style.scss'
import Favicon from '../../shared/favicon.ico'

import { Menu, Segment, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const Navbar = ({ history }) => {
  const [activeItem, setActiveItem] = useState('home')

  const handleClick = (e, { name }) => {
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

        <Menu.Item name='home' active={activeItem === 'home'} onClick={handleClick} />

        <Menu.Item name='search' active={activeItem === 'search'} onClick={handleClick} />

        <Menu.Item
          name='library'
          active={activeItem === 'library'}
          onClick={handleClick}
        />

        <Menu.Menu position='right'>
          <Menu.Item>
            <Button as='a' className='nav-button log-in' inverted>
              Log In
            </Button>
            <Button as='a' className='nav-button sign-up' inverted>
              Sign Up
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}

export default withRouter(Navbar)
