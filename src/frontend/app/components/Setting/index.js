import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { auth } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import './Setting.scss'

export default class Setting extends Component {
  signout = () => {
    auth.signout()
  }

  render() {
    return (
      <div className='setting toolbar-page'>
        <Toolbar link='/' title='设置' />
        <div className='setting-content toolbar-page-content'>
          <Link to='/changepwd' className='setting-item'>
            <span>登录密码</span>
            <span><FontAwesome className='super-crazy-colors' name='angle-right' size='lg' /></span>
          </Link>
          <div className='setting-item'>
            <span>版本号</span>
            <span>1.0.0</span>
          </div>
          <div className='submit-btn'>
            <Link to='/login' onClick={this.signout}>退出</Link>
          </div>
        </div>
      </div>
    )
  }
}