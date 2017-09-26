import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './FriendItem.scss'

export default class BuyItem extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    nickName: PropTypes.string.isRequired,
    grade: PropTypes.number.isRequired,
    mobile: PropTypes.string
  }

  render() {
    const { userName, nickName, grade, mobile } = this.props
    return (
      <div className='buy-item'>
        <div className='buy-item-content'>
          <div className='info-row'>
            <div className='info-box'>
              <strong>{userName}</strong>
              <p>用户名</p>
            </div>
            <div className='info-box'>
              <strong>{nickName}</strong>
              <p>昵称</p>
            </div>
          </div>
          <div className='info-row'>
            <div className='info-box'>
              <strong>{grade}</strong>
              <p>等级</p>
            </div>
            <div className='info-box'>
              <strong>{mobile}</strong>
              <p>手机号</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}