import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import RecordItem from './RecordItem'
import './GrowupRecord.scss'

export default class Clearn extends Component {
  render() {
    return (
      <div className='clearn growup-record toolbar-page'>
        <Toolbar link='/growup' title='打扫记录' />
        <div className='record-list toolbar-page-content'>
          <RecordItem profit='+18.63' pasture='1号牧场' data='2017-08-14 16:14:27' />
          <RecordItem profit='+18.63' pasture='1号牧场' data='2017-08-14 16:14:27' />
          <RecordItem profit='+18.63' pasture='1号牧场' data='2017-08-14 16:14:27' />
          <RecordItem profit='+18.63' pasture='1号牧场' data='2017-08-14 16:14:27' />
          <RecordItem profit='+18.63' pasture='1号牧场' data='2017-08-14 16:14:27' />
          <RecordItem profit='+18.63' pasture='1号牧场' data='2017-08-14 16:14:27' />
          <RecordItem profit='+18.63' pasture='1号牧场' data='2017-08-14 16:14:27' />
        </div>
        <NoMore />
      </div>
    )
  }
}