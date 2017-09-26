import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './Item.scss'

export default class Item extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired
  }

  render() {
    const { img, title, subTitle } = this.props
    return (
      <Link to={this.props.link} className='application-item-link'>
        <div className='application-item'>
          <div className='item-icon'><img src={require('.' + img)} alt='' /></div>
          <div className='item-text'>
            <div className='item-title'>{title}</div>
            <div className='item-subtitle'>{subTitle}</div>
          </div>
        </div>
      </Link>
    )
  }
}