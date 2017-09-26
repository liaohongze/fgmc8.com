import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import ListItem from './ListItem'
import './Growup.scss'

export default class Growup extends Component {
  render() {
    return (
      <div className='growup toolbar-page'>
        <Toolbar link='/' title='养殖记录' />
        <div className='growup-list toolbar-page-content'>
          <ListItem link='/growup/harvest' title='收获记录' img='/img/grow.png' />
          <ListItem link='/growup/pasture' title='开牧场记录' img='/img/dug.png' />
          <ListItem link='/growup/addbreed' title='增养记录' img='/img/sow.png' />
          {/* <ListItem link='/growup/clearn' title='打扫记录' img='/img/reap.png' /> */}
        </div>
      </div>
    )
  }
}