import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import './Toolbar.scss'

export default class Toolbar extends Component {
  static propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    action: PropTypes.string,
    actionLink: PropTypes.string
  }

  render() {
    const { link, title, action, actionLink } = this.props
    if (action) {
      return (
        <div className='toolbar'>
          <div className='left-side'>
            <Link to={link} className='back'><FontAwesome className='super-crazy-colors' name='arrow-left' size='lg' /></Link>
            <div className='page-title'>{title}</div>
          </div>
          <Link to={actionLink} className='action'>{action}</Link>
        </div>
      )
    } else {
      return (
        <div className='toolbar'>
          <div className='left-side'>
            <Link to={link} className='back'><FontAwesome className='super-crazy-colors' name='arrow-left' size='lg' /></Link>
            <div className='page-title'>{title}</div>
          </div>
        </div>
      )
    }
  }
}