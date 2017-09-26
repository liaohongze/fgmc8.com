import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import List from './List'
import UserPastures from './UserPastures'
import Raises from './Raises'
import Incomes from './Incomes'

const Pastures = ({ match }) => (
  <div>
    <Route exact path={`${match.url}`} component={List} />
    <Route path={`${match.url}/user`} component={UserPastures} />
    <Route path={`${match.url}/raises`} component={Raises} />
    <Route path={`${match.url}/incomes`} component={Incomes} />
  </div>
)

Pastures.propTypes = {
  match: PropTypes.object
}

export default Pastures