import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import List from './List'
import Edit from './Edit'
import Changepwd from './Changepwd'
import Detail from './Detail'

const User = ({ match }) => (
  <div>
    <Route exact path={`${match.url}`} component={List} />
    <Route path={`${match.url}/detail/:id`} component={Detail} />
    <Route path={`${match.url}/edit/:id`} component={Edit} />
    <Route path={`${match.url}/changepwd/:id`} component={Changepwd} />
  </div>
)

User.propTypes = {
  match: PropTypes.object
}

export default User