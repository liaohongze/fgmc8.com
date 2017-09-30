import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import ListItem from './ListItem'
import QueueAnim from 'rc-queue-anim'

export default class Trade extends Component {
  render() {
    return (
      <div className='trade toolbar-page'>
        <Toolbar link='/' title='交易中心' />
        <div className='trade-list toolbar-page-content'>
          <QueueAnim delay={300} className='queue-simple'>
            <ListItem key='1' link='/trade/sell' title='出售小牛' img='/img/trade_create.png' />
            <ListItem key='2' link='/trade/sellrecord' title='出售记录' img='/img/sell.png' />
            <ListItem key='3' link='/trade/buyrecord' title='购买记录' img='/img/buy.png' />
            <ListItem key='4' link='/trade/withdraw' title='提现申请' img='/img/pet.png' />
            <ListItem key='5' link='/trade/withdrawrecord' title='提现记录' img='/img/withdraw.png' />
          </QueueAnim>
        </div>
      </div>
    )
  }
}