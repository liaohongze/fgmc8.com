import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import './Redbag.scss'

export default class Redbag extends Component {
  render() {
    return (
      <div className='redbag toolbar-page'>
        <Toolbar link='/luckyGame' title='红包抽奖' />
        <div className='redbag-content toolbar-page-content'>
          <div className='tear-redbag'><img src={require('./img/asd23.png')} alt='' /></div>
          <div className='redbag-text'>
            <p>每推荐好友一名可获得红包一个哦</p>
            <p>暂时没有可以打开的红包</p>
          </div>
        </div>
      </div>
    )
  }
}