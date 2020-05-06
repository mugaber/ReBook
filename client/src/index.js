import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import 'semantic-ui-css/semantic.min.css'

import App from './App'
import Spinner from './components/Spinner'

import { store, persistor } from './redux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

//

if (module.hot) {
  module.hot.accept()
}

//

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Spinner />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,

  document.getElementById('root')
)
