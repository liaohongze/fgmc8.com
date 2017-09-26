import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import List from './List'
import UserRecharge from './Recharge'

const Recharge = ({ match }) => (
  <div>
    <Route exact path={`${match.url}`} component={List} />
    <Route path={`${match.url}/user`} component={UserRecharge} />
  </div>
)

Recharge.propTypes = {
  match: PropTypes.object
}

export default Recharge