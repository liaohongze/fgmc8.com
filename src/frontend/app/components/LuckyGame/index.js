import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import ListItem from './ListItem'
import QueueAnim from 'rc-queue-anim'

export default class LuckyGame extends Component {
  render() {
    return (
      <div className='lucky-game toolbar-page'>
        <Toolbar link='/' title='大转盘' />
        <div className='lucky-game-list toolbar-page-content'>
          <QueueAnim delay={300} className='queue-simple'>
            <ListItem key='1' link='/luckygame/turntable' title='幸运大转盘' img='/img/turntable.png' />
            <ListItem key='2' link='/luckygame/turntablerecord' title='大转盘记录' img='/img/honey.png' />
            <ListItem key='3' link='/luckygame/zhx' title='庄和闲游戏' img='/img/willage.png' />
            <ListItem key='4' link='/luckygame/zhxrecord' title='庄和闲记录' img='/img/honey.png' />
          </QueueAnim>
        </div>
      </div>
    )
  }
}