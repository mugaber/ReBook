import React from 'react'
import './style.scss'

import StayFocusedVideo from '../../shared/stay-focused.mp4'

const HomePage = () => {
  return (
    <>
      <div className='main-section__container'>
        <div className='main-section__text'>
          <h1 className='header'>ReBook</h1>
          <p>Search, find, learn, add and imporve.</p>
        </div>
      </div>

      <div className='second-section__container'>
        <video autoPlay loop width='100%'>
          <source src={StayFocusedVideo} />
        </video>

        <div data-aos='fade-right' data-aos-once={true} className='second-section__box'>
          Stay Focused and Collaborate
        </div>
      </div>
    </>
  )
}

export default HomePage
