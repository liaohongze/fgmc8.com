import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'

export default class EquipmentRecord extends Component {
  render() {
    return (
      <div className='equipment-record toolbar-page'>
        <Toolbar link='/pasture' title='装备购买记录' />
        <div className='equipment-record-list toolbar-page-content'>
          <NoMore />
        </div>
      </div>
    )
  }
}