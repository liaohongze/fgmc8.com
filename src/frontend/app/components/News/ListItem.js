import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import './ListItem.scss'

export default class ListItem extends Component {
  static propTypes ={
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired
  }

  render() {
    const { link, title, data } = this.props
    return (
      <Link to={link} className='news-list-item'>
        <span className='title'>{title}</span>
        <div className='right-side'>
          <span className='data'>{data}</span>
          <span className='arrow'><FontAwesome className='super-crazy-colors' name='angle-right' size='lg' /></span>
        </div>
      </Link>
    )
  }
}