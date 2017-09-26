import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import rootReducers from '../reducers'
import api from '../middlewares/api'

export default function configureStore(history, initialState) {
  const createStoreWithMiddleware = applyMiddleware(
    routerMiddleware(history),
    thunk,
    api
  )(createStore)

  return createStoreWithMiddleware(
    rootReducers,
    initialState
  )
}