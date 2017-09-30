import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import { auth } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import QueueAnim from 'rc-queue-anim'
import './Setting.scss'

export default class Setting extends Component {
  signout = () => {
    auth.signout()
  }

  // handleClick = () => {
  //   let token = window.localStorage.getItem('token')
  //   let payload = JSON.parse(window.atob(token.split('.')[1]))
  //   let nowDate = Date.now() / 1000
  //   console.log(payload.exp)
  //   console.log(nowDate)
  //   console.log((payload.exp - nowDate) / 3600)
  // }

  render() {
    return (
      <div className='setting toolbar-page'>
        <Toolbar link='/' title='设置' />
        <div className='setting-content toolbar-page-content'>
          <QueueAnim delay={300} className='queue-simple'>
            <Link key='1' to='/changepwd' className='setting-item'>
              <span>登录密码</span>
              <span><FontAwesome className='super-crazy-colors' name='angle-right' size='lg' /></span>
            </Link>
            <div key='2' className='setting-item'>
              <span>版本号</span>
              <span>1.0.0</span>
            </div>
            <div key='3' className='submit-btn'>
              <Link to='/login' onClick={this.signout}>退出</Link>
            </div>
            {/* <button onClick={this.handleClick}>获取</button> */}
          </QueueAnim>
        </div>
      </div>
    )
  }
}