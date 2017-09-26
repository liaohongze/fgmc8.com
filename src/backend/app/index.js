import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import { AppContainer } from 'react-hot-loader'
import configureStore from './store/configureStore'
import Root from './containers/Root'

const history = createHistory()
const store = configureStore(history)

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default
    render(
      <AppContainer>
        <NewRoot store={store} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}