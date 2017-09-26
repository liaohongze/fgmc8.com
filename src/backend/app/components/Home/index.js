import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Welcome from './Welcome'
import Changepwd from './Changepwd'

const Home = ({ match }) => (
  <div className='home-route'>
    <Route exact path={`${match.url}`} component={Welcome} />
    <Route exact path={`${match.url}/changepwd`} component={Changepwd} />
  </div>
)

Home.propTypes = {
  match: PropTypes.object
}

export default Home