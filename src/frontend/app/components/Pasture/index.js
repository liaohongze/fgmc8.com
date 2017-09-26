import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import ListItem from './ListItem'
import './Pasture.scss'

export default class Pasture extends Component {
  render() {
    return (
      <div className='pasture toolbar-page'>
        <Toolbar link='/' title='牧场管理' />
        <div className='pasture-list toolbar-page-content'>
          <ListItem link='/pasture/creatpasture' title='开发新牧场' img='/img/develop.png' />
          <ListItem link='/pasture/friends' title='直推好友' img='/img/friend.png' />
          <ListItem link='/pasture/incomes' title='直推收益' img='/img/honey.png' />
          <ListItem link='/pasture/recharge' title='用户充值' img='/img/market.png' />
          <ListItem link='/pasture/rechargerecord' title='充值记录' img='/img/seed.png' />
          <ListItem link='/pasture/shared' title='分享给好友' img='/img/fruit.png' />
        </div>
      </div>
    )
  }
}