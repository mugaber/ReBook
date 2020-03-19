import React, { useState } from 'react'
import './style.scss'
import Favicon from '../../shared/favicon.ico'

import { Menu, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('home')

  const handleClick = (e, { name }) => setActiveItem(name)

  return (
    <Segment inverted className='nav-bar__segment'>
      <Menu inverted secondary>
        <Menu.Item className='rebook-name'>
          <img src={Favicon} alt='favicon' />
          ReBook
        </Menu.Item>

        <Menu.Item name='home' active={activeItem === 'home'} onClick={handleClick}>
          <Link to='/'>Home</Link>
        </Menu.Item>

        <Menu.Item name='search' active={activeItem === 'search'} onClick={handleClick}>
          <Link className='link-button' to='/search'>
            Search
          </Link>
        </Menu.Item>

        <Menu.Item name='library' active={activeItem === 'library'} onClick={handleClick}>
          <Link to='/library'>Library</Link>
        </Menu.Item>

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
