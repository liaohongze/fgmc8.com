import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import rootReducers from '../reducers'
import api from '../middlewares/api'
import DevTools from '../containers/Devtools'

export default function configureStore(history, initialState) {
  const logger = createLogger()

  const createStoreWithMiddleware = applyMiddleware(
    routerMiddleware(history),
    thunk,
    api,
    logger
  )(createStore)

  const store = createStoreWithMiddleware(
    rootReducers,
    initialState,
    DevTools.instrument()
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}