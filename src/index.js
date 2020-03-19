import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import 'semantic-ui-css/semantic.min.css'

import App from './App'

//
import 'aos/dist/aos.css'
import AOS from 'aos'
AOS.init({
  delay: 100,
  offset: 200,
  duration: 500,
  easing: 'ease-in-sine'
})

//
if (module.hot) {
  module.hot.accept()
}

//
ReactDOM.render(<App />, document.getElementById('root'))
