import React from 'react'
import './style.scss'

const HomePage = () => {
  return (
    <>
      <div className='main-section__container'>
        <div className='main-section__text'>
          <h1 className='header'>ReBook</h1>
          <p>Search, find, read, save add and imporve.</p>
        </div>
      </div>

      <div className='second-section__container'>
        <div
          data-aos='fade-right'
          data-aos-once={true}
          className='second-section__text-box'
        >
          Stay Focused and Read
        </div>
      </div>
    </>
  )
}

export default HomePage
