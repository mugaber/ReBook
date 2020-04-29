import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import 'semantic-ui-css/semantic.min.css'

import App from './App'
import { UserProvider } from './providers/user'

//

if (module.hot) {
  module.hot.accept()
}

//

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
)
