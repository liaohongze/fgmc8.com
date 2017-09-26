import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import List from './List'
import UserTransactions from './UserTransactions'

const Transactions = ({ match }) => (
  <div className='transactions'>
    <Route exact path={`${match.url}`} component={List} />
    <Route path={`${match.url}/:name`} component={UserTransactions} />
  </div>
)

Transactions.propTypes = {
  match: PropTypes.object
}

export default Transactions