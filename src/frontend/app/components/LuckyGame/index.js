import React, { Component } from 'react'
import Toolbar from '../shared/Toolbar'
import ListItem from './ListItem'
import './LuckyGame.scss'

export default class LuckyGame extends Component {
  render() {
    return (
      <div className='lucky-game toolbar-page'>
        <Toolbar link='/' title='大转盘' />
        <div className='lucky-game-list toolbar-page-content'>
          <ListItem link='/luckygame/turntable' title='幸运大转盘' img='/img/turntable.png' />
          <ListItem link='/luckygame/turntablerecord' title='大转盘记录' img='/img/honey.png' />
          <ListItem link='/luckygame/zhx' title='庄和闲游戏' img='/img/willage.png' />
          <ListItem link='/luckygame/zhxrecord' title='庄和闲记录' img='/img/honey.png' />
        </div>
      </div>
    )
  }
}