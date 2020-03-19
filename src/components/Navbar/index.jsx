import React, { useState } from 'react'
import './style.scss'

import { Menu, Segment, Button } from 'semantic-ui-react'

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home')

  const handleClick = (e, { name }) => setActiveItem(name)

  return (
    <Segment inverted className='nav-bar__segment'>
      <Menu size='huge' inverted secondary>
        <Menu.Item className='rebook-name'>ReBook</Menu.Item>

        <Menu.Item name='home' active={activeItem === 'home'} onClick={handleClick} />

        <Menu.Item name='search' active={activeItem === 'search'} onClick={handleClick} />

        <Menu.Item
          name='library'
          active={activeItem === 'library'}
          onClick={handleClick}
        />

        <Menu.Menu position='right'>
          <Menu.Item>
            <Button as='a' className='button log-in' inverted>
              Log In
            </Button>
            <Button as='a' className='button sign-up' inverted>
              Sign Up
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}

export default Navbar
