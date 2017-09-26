import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import ListItem from './ListItem'
import './Trade.scss'

export default class Trade extends Component {
  render() {
    return (
      <div className='trade'>
        <Toolbar link='/' title='交易中心' />
        <div className='trade-list'>
          <ListItem link='/trade/sell' title='出售小牛' img='/img/trade_create.png' />
          <ListItem link='/trade/sellrecord' title='出售记录' img='/img/sell.png' />
          <ListItem link='/trade/buyrecord' title='购买记录' img='/img/buy.png' />
          <ListItem link='/trade/withdraw' title='提现申请' img='/img/pet.png' />
          <ListItem link='/trade/withdrawrecord' title='提现记录' img='/img/withdraw.png' />
        </div>
      </div>
    )
  }
}