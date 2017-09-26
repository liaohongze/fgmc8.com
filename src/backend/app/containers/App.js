import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import * as globalActions from '../actions/global'
import '../styles/app.scss'

import Login from '../components/Shared/Login'
import PrivateRoute from '../components/Shared/PrivateRoute'
import Dashboard from '../components/Shared/Dashboard'

const history = createHistory()

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route render={({ location }) => {
          return (
            <Switch location={location}>
              <Route location={location} exact path='/login' component={Login} />
              <PrivateRoute location={location} path='/' component={Dashboard} />
            </Switch>
          )
        }} />
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  const { auth } = state
  const { token, isAuthenticated, errorMessage } = auth

  return {
    token,
    isAuthenticated,
    errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(globalActions, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)