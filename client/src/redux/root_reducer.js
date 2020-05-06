import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import user from './user/reducer'
import alert from './alert/reducer'

const persitConfig = {
  key: 'rebook-persistor',
  storage
}

const rootRedcuer = combineReducers({
  user,
  alert
})

export default persistReducer(persitConfig, rootRedcuer)
