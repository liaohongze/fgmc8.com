import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import './ListItem.scss'

export default class ListItem extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }

  render() {
    const { link, img, title } = this.props
    return (
      <Link to={link} className='growup-list-item'>
        <div className='item-icon'><img src={require('.' + img)} alt='' /></div>
        <div className='right-side'>
          <span className='item-title'>{title}</span>
          <span className='arrow'><FontAwesome className='super-crazy-colors' name='angle-right' size='lg' /></span>
        </div>
      </Link>
    )
  }
}