import React from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'
import List from './List'
import Edit from './Edit'

const About = ({match}) => (
  <div className='about-route'>
    <Route exact path={`${match.url}`} component={List} />
    <Route path={`${match.url}/edit/:id`} component={Edit} />
  </div>
)

About.propTypes = {
  match: PropTypes.object
}

export default About