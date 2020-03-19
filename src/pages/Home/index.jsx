import React from 'react'
import './style.scss'

import Research from '../../shared/research-books.mp4'

import Navbar from '../../components/Navbar'

const HomePage = () => {
  return (
    <>
      <div className='main-section__container'>
        <Navbar />
        <div className='main-section__text'>
          <h1 className='header'>ReBook</h1>
          <p>Search, find, learn, add and imporve.</p>
        </div>
      </div>
      <div className='second-section__container'>
        <video className='video__container' loop autoPlay>
          <source src={Research} />
        </video>
      </div>
    </>
  )
}

export default HomePage
