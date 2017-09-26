import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import './Navbar.scss'

export default class Navbar extends Component {
  render() {
    return (
      <div className='navbar'>
        <Link to='/game' className='action-box'>
          <div className='icon-box'>
            <FontAwesome className='super-crazy-colors'
              name='gamepad'
              size='lg'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </div>
          <div className='action-text'>牧场</div>
        </Link>
        <div className='action-box'>
          <div className='icon-box'>
            <FontAwesome className='super-crazy-colors'
              name='user-o'
              size='lg'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </div>
          <div className='action-text'>我的</div>
        </div>
      </div>
    )
  }
}