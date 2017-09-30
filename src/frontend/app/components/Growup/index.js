import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import ListItem from './ListItem'
import QueueAnim from 'rc-queue-anim'

export default class Growup extends Component {
  render() {
    return (
      <div className='growup toolbar-page'>
        <Toolbar link='/' title='养殖记录' />
        <div className='growup-list toolbar-page-content'>
          <QueueAnim delay={300} className='queue-simple'>
            <ListItem key='1' link='/growup/harvest' title='收获记录' img='/img/grow.png' />
            <ListItem key='2' link='/growup/pasture' title='开牧场记录' img='/img/dug.png' />
            <ListItem key='3' link='/growup/addbreed' title='增养记录' img='/img/sow.png' />
          </QueueAnim>
        </div>
      </div>
    )
  }
}