import React from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'
import List from './List'
import Edit from './Edit'

const Article = ({match}) => (
  <div>
    <Route exact path={`${match.url}`} component={List} />
    <Route exact path={`${match.url}/edit/:id`} component={Edit} />
  </div>
)

Article.propTypes = {
  match: PropTypes.object
}

export default Article