import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? <Component {...props} /> : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
)

PrivateRoute.propTypes = {
    component: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    const { auth } = state
    const { token, isAuthenticated } = auth

    return {
        token,
        isAuthenticated
    }
}

export default connect(mapStateToProps)(PrivateRoute)