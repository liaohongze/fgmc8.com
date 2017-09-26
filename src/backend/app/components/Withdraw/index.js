import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import List from './List'

const Withdraw = ({ match }) => (
  <div className='withdrawl'>
    <Route path={`${match.url}`} component={List} />
  </div>
)

Withdraw.propTypes = {
  match: PropTypes.object
}

export default Withdraw