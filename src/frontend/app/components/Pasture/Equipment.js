import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import Item from './EquipmentItem'
import './Equipment.scss'

export default class Equipment extends Component {
  render() {
    return (
      <div className='equipment toolbar-page'>
        <Toolbar link='/pasture' title='装备购买' action='充值' actionLink='/pasture/recharge' />
        <div className='equipment-content toolbar-page-content'>
          <Item name='初级饲料' price='200' effict='1500.00' />
          <Item name='中级饲料' price='500' effict='7000.00' />
          <Item name='高级饲料' price='1500' effict='30000.00' />
        </div>
      </div>
    )
  }
}