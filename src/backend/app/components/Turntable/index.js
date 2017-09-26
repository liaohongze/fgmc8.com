import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import List from './List'
import Edit from './Edit'

const Turntable = ({ match }) => (
  <div className='turntable-route'>
    <Route exact path={`${match.url}`} component={List} />
    <Route path={`${match.url}/edit/:id`} component={Edit} />
  </div>
)

Turntable.propTypes = {
  match: PropTypes.object
}

export default Turntable