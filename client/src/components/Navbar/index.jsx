import React, { useState } from 'react'
import './style.scss'

import Favicon from '../../shared/favicon.ico'
import SignModal from '../SignModal'

import { Menu, Segment, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const Navbar = ({ history }) => {
  const [activeItem, setActiveItem] = useState('home')

  const [showSignModal, setShowSignModal] = useState(false)

  const [activeSignTab, setActiveSignTab] = useState(0)

  const handleSignClick = e => {
    if (e.target.name === 'sign-up') setActiveSignTab(0)
    if (e.target.name === 'log-in') setActiveSignTab(1)
    setShowSignModal(!showSignModal)
  }

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

        <Menu.Item
          name='library'
          active={activeItem === 'library'}
          onClick={handleMenuItemClick}
        />

        <Menu.Menu position='right'>
          <Menu.Item>
            <Button
              as='a'
              className='nav-button log-in'
              color='green'
              inverted
              name='log-in'
              onClick={handleSignClick}
            >
              Log In
            </Button>

            <Button
              as='a'
              className='nav-button sign-up'
              inverted
              name='sign-up'
              onClick={handleSignClick}
            >
              Sign Up
            </Button>
          </Menu.Item>
        </Menu.Menu>

        {showSignModal && (
          <SignModal
            showModal={showSignModal}
            setShowModal={setShowSignModal}
            activeTab={activeSignTab}
            setActiveTab={setActiveSignTab}
          />
        )}
      </Menu>
    </Segment>
  )
}

export default withRouter(Navbar)
