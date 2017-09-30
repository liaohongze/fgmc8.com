import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import ListItem from './ListItem'
import QueueAnim from 'rc-queue-anim'

export default class Pasture extends Component {
  render() {
    return (
      <div className='pasture toolbar-page'>
        <Toolbar link='/' title='牧场管理' />
        <div className='pasture-list toolbar-page-content'>
          <QueueAnim delay={300} className='queue-simple'>
            <ListItem key='a' link='/pasture/creatpasture' title='开发新牧场' img='/img/develop.png' />
            <ListItem key='b' link='/pasture/friends' title='直推好友' img='/img/friend.png' />
            <ListItem key='c' link='/pasture/incomes' title='直推收益' img='/img/honey.png' />
            <ListItem key='d' link='/pasture/recharge' title='用户充值' img='/img/market.png' />
            <ListItem key='e' link='/pasture/rechargerecord' title='充值记录' img='/img/seed.png' />
            <ListItem key='f' link='/pasture/shared' title='分享给好友' img='/img/fruit.png' />
          </QueueAnim>
        </div>
      </div>
    )
  }
}