import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import 'semantic-ui-css/semantic.min.css'

import App from './App'

import axios from 'axios'

// set auth token
if (localStorage.rebookToken) {
  axios.defaults.headers.common['x-auth-token'] = localStorage.rebookToken
} else {
  delete axios.defaults.headers.common['x-auth-token']
}

//
if (module.hot) {
  module.hot.accept()
}

//
ReactDOM.render(<App />, document.getElementById('root'))
