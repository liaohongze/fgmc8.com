import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { global } from './global'
import auth from './auth'
// import cart from './modules/cart'

const rootReducer = combineReducers({
  routing,
  global,
  auth
  // [cart.constants.NAME]: cart.reducer
})

export default rootReducer