import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Dialog } from 'react-weui'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import { CountDown } from '../../utils/tools'
import './Game.scss'

import Grade0 from './img/lv0.png'
import Grade1 from './img/lv1.png'
import Grade2 from './img/lv2.png'
import Grade3 from './img/lv3.png'
import Grade4 from './img/lv4.png'
import Grade5 from './img/lv5.png'

let stockTime = ['', '', '', '', '']
let timer1, recycTimer, ID

export default class Game extends Component {
  state = {
    rootWidth: 640,
    recycTimeStatus: false,
    pastureInfo: [],
    pastureCoordinate: [],
    userInfo: '',
    showCowBoxList: false,
    showEquipmentList: false,
    pastureOpenable: false,
    recycleable: false,
    stockingable: false,
    cursorStatus: false,
    cowsStatus: false,
    showMsg: false,
    msgContent: '',
    MsgPastureOpened: false
  }

  componentWillMount() {
    ID = currentUser().id
  }

  componentDidMount() {
    this.refreshData()
    recycTimer = setInterval(this.changeTimerStatus, 1000)
    if (this.refs.pastureGameBox) { this.setState({ rootWidth: document.getElementById('root').offsetWidth }) }
    window.addEventListener('resize', this.onWindowResize)
  }

  componentWillUnmount() {
    clearTimeout(timer1)
    clearInterval(recycTimer)
    window.removeEventListener('resize', this.onWindowResize)
  }

  refreshData = () => {
    const userInfo = Client.getUser(ID, auth.getToken(), result => { return result })
    const pasturesData = Client.getPastures(ID, auth.getToken(), result => { return result })
    Promise.all([userInfo, pasturesData]).then(results => {
      let array = []
      for (var i = 0; i < results[1].object.length; i++) {
        array.push(results[1].object[i].coordinate)
        stockTime[parseInt(results[1].object[i].code) - 1] = results[1].object[i].stockingTime
      }
      if (this.refs.pastureGameBox) {
        this.setState({
          pastureInfo: results[1].object,
          pastureCoordinate: array,
          userInfo: results[0].object,
          cowsStatus: !this.state.cowsStatus
        })
      }
    })
  }

  changeTimerStatus = () => {
    if (this.refs.pastureGameBox) { this.setState({ recycTimeStatus: !this.state.recycTimeStatus }) }
  }

  onWindowResize = () => {
    if (this.refs.pastureGameBox) { this.setState({ rootWidth: document.getElementById('root').offsetWidth }) }
  }

  pastureAction = (code, coordinate, price) => {
    // this.state.pastureCoordinate.indexOf(coordinate) === -1 为判断该牧场是否存在
    // 开牧场
    if (this.state.pastureOpenable) {
      if (this.state.pastureCoordinate.indexOf(coordinate) === -1 && this.refs.pastureGameBox) {
        const values = {
          'name': code + '号牧场',
          'customerId': this.state.userInfo.id,
          'price': price,
          'code': code,
          'coordinate': coordinate
        }

        Client.openPasture(values, auth.getToken(), result => {
          if (!result.errored) {
            if (result.object.pastureIssue === 100) {
              this.setState({
                pastureOpenable: false,
                showMsg: true,
                msgContent: '牧场开辟成功！'
              })
              this.refreshData()
              timer1 = window.setTimeout(() => { this.setState({ showMsg: false }) }, 3000)
            } else if (result.object.pastureIssue === 101) {
              this.setState({
                pastureOpenable: false,
                showMsg: true,
                msgContent: '牛群不足！'
              })
              timer1 = window.setTimeout(() => { this.setState({ showMsg: false }) }, 3000)
            } else if (result.object.pastureIssue === 102) {
              this.setState({
                pastureOpenable: false,
                showMsg: true,
                msgContent: '还没有开这块牧场的权限！'
              })
              timer1 = window.setTimeout(() => { this.setState({ showMsg: false }) }, 3000)
            }
          }
        })
      } else {
        this.setState({ MsgPastureOpened: true })
      }
    }

    // 放养
    if (this.state.pastureCoordinate.indexOf(coordinate) !== -1 && this.state.stockingable) {
      let values = {
        'customerId': this.state.userInfo.id,
        'code': code
      }
      Client.stocking(values, auth.getToken(), result => {
        if (!result.errored && this.refs.pastureGameBox) {
          if (result.object.stockingIssue === 100) {
            this.setState({
              stockingable: false,
              showMsg: true,
              msgContent: '放养成功！',
              cursorStatus: !this.state.cursorStatus
            })
            this.refreshData()
            timer1 = window.setTimeout(() => { this.setState({ showMsg: false }) }, 3000)
          } else if (result.object.stockingIssue === 101) {
            this.setState({
              stockingable: false,
              showMsg: true,
              msgContent: '仓库里的牛群不足！',
              cursorStatus: !this.state.cursorStatus
            })
            timer1 = window.setTimeout(() => { this.setState({ showMsg: false }) }, 3000)
          } else if (result.object.stockingIssue === 103) {
            this.setState({
              stockingable: false,
              showMsg: true,
              msgContent: '该牧场牧场当天放养次数已过！',
              cursorStatus: !this.state.cursorStatus
            })
            timer1 = window.setTimeout(() => { this.setState({ showMsg: false }) }, 3000)
          } else if (result.object.stockingIssue === 104) {
            this.setState({
              stockingable: false,
              showMsg: true,
              msgContent: '没过限定时间，无法操作！',
              cursorStatus: !this.state.cursorStatus
            })
            timer1 = window.setTimeout(() => { this.setState({ showMsg: false }) }, 3000)
          } else if (result.object.stockingIssue === 105) {
            this.setState({
              stockingable: false,
              showMsg: true,
              msgContent: '休息时间，无法操作！',
              cursorStatus: !this.state.cursorStatus
            })
            timer1 = window.setTimeout(() => { this.setState({ showMsg: false }) }, 3000)
          }
        }
      })
    }

    // 收回
    if (this.state.pastureCoordinate.indexOf(coordinate) !== -1 && this.state.recycleable) {
      let values = {
        'customerId': this.state.userInfo.id,
        'code': code
      }
      Client.recycle(values, auth.getToken(), result => {
        if (!result.errored && this.refs.pastureGameBox) {
          if (result.object.recyclingIssue === 100) {
            this.setState({
              recycleable: false,
              showMsg: true,
              msgContent: '回收成功！',
              cursorStatus: !this.state.cursorStatus
            })
            this.refreshData()
            timer1 = window.setTimeout(() => { this.setState({ showMsg: false }) }, 3000)
          } else if (result.object.recyclingIssue === 101) {
            this.setState({
              recycleable: false,
              showMsg: true,
              msgContent: '没过限定时间，无法回收！',
              cursorStatus: !this.state.cursorStatus
            })
            timer1 = window.setTimeout(() => { this.setState({ showMsg: false }) }, 3000)
          } else if (result.object.recyclingIssue === 102) {
            this.setState({
              recycleable: false,
              showMsg: true,
              msgContent: '已经没有可以回收的牛了',
              cursorStatus: !this.state.cursorStatus
            })
            timer1 = window.setTimeout(() => { this.setState({ showMsg: false }) }, 3000)
          }
        }
      })
    }
  }

  showCowBox = () => {
    if (this.refs.pastureGameBox) {
      this.setState({
        pastureOpenable: false,
        recycleable: false,
        showEquipmentList: false,
        showCowBoxList: !this.state.showCowBoxList
      })
    }
  }

  showEquipment = () => {
    if (this.refs.pastureGameBox) {
      this.setState({
        pastureOpenable: false,
        recycleable: false,
        showCowBoxList: false,
        showEquipmentList: !this.state.showEquipmentList
      })
    }
  }

  mouseAction = (key) => {
    if (this.refs.pastureGameBox) {
      if (key === 'recycle') {
        this.setState({
          stockingable: false,
          recycleable: true,
          pastureOpenable: false,
          showCowBoxList: false,
          showEquipmentList: false,
          cursorStatus: !this.state.cursorStatus
        })
      } else if (key === 'openPasture') {
        this.setState({
          stockingable: false,
          pastureOpenable: true,
          recycleable: false,
          showCowBoxList: false,
          showEquipmentList: false,
          cursorStatus: !this.state.cursorStatus
        })
      } else if (key === 'stocking') {
        this.setState({
          stockingable: true,
          pastureOpenable: false,
          recycleable: false,
          showCowBoxList: false,
          showEquipmentList: false,
          cursorStatus: !this.state.cursorStatus
        })
      }
    }
  }

  cursorStyle = () => {
    if (!this.state.pastureOpenable && !this.state.recycleable && !this.state.stockingable) {
      return 'game'
    }
    if (this.state.pastureOpenable) {
      return 'game shovel-cursor'
    }
    if (this.state.recycleable) {
      return 'game hand-cursor'
    }
    if (this.state.stockingable) {
      return 'game thumb-cursor'
    }
  }

  hideDialog = () => {
    this.setState({
      MsgPastureOpened: false
    })
  }

  showCows = (coordinate) => {
    if (this.state.pastureCoordinate.indexOf(coordinate) !== -1) {
      for (var i = 0; i < this.state.pastureInfo.length; i++) {
        if (this.state.pastureInfo[i].coordinate === coordinate) {
          if (this.state.pastureInfo[i].quantity > 0) {
            return null
          } else {
            return 'none'
          }
        }
      }
    } else {
      return 'none'
    }
  }

  render() {
    const {
      recycTimeStatus,
      showCowBoxList,
      showEquipmentList,
      userInfo,
      cowsStatus,
      showMsg,
      cursorStatus,
      msgContent,
      rootWidth,
      pastureOpenable,
      stockingable,
      recycleable } = this.state

    let pastureTop = rootWidth * 0.634375
    let pastureHeight = rootWidth * 0.59375
    let userInfoHeight = rootWidth * 0.34
    let levelHeight = rootWidth * 0.294
    let Grade = [
      Grade0,
      Grade1,
      Grade2,
      Grade3,
      Grade4,
      Grade5
    ]
    return (
      <div className={cursorStatus ? this.cursorStyle() : this.cursorStyle()} ref='pastureGameBox'>
        <div className='userinfo' style={{ height: userInfoHeight }}>
          <div className='upper-part'>
            <div className='avatar'>
              <Link to='/'><img src={require('./img/t.jpg')} alt='' /></Link>
            </div>
            <div className='userinfo-text'>
              <div className='user-account'>用户名：{userInfo.mobile}</div>
              <div className='game-data'>
                <div className='warehouse'>仓库：{userInfo.stock}</div>
                <div className='pasture'>牧场：{userInfo.invest}</div>
                <div className='total'>总量：{userInfo.stock + userInfo.invest}</div>
              </div>
            </div>
          </div>
          <div className='down-part'>
            <p style={{ display: showMsg ? null : 'none' }}>{msgContent}</p>
          </div>
        </div>

        <div className='level' style={{ height: levelHeight }}>
          <Link to='/luckygame/zhx' className='wheel'><img src={require('./img/wheel.png')} alt='' /></Link>
          <img className='level-grade' src={Grade[userInfo.grade]} alt='' />
        </div>

        <div className='game-pasture' style={{ top: pastureTop, height: pastureHeight }}>
          <ul>
            <li className={this.state.pastureCoordinate.indexOf('1,0') === -1 ? 'land1' : 'land2'} style={{ top: '7%', left: '28%' }}>
              <div className='cow' style={{ display: cowsStatus ? this.showCows('1,0') : this.showCows('1,0') }}><span className='countdown'>{recycTimeStatus ? CountDown(stockTime[0]) : CountDown(stockTime[0])}</span></div>
              <div className='clkdiv' onClick={(code, coordinate, price) => { this.pastureAction('1', '1,0', 300) }} />
            </li>
            <li className={this.state.pastureCoordinate.indexOf('1,0') === -1 ? 'land1' : 'land2'} style={{ top: '17%', left: '17.5%' }} />
            <li className={this.state.pastureCoordinate.indexOf('1,0') === -1 ? 'land1' : 'land2'} style={{ top: '27%', left: '7.5%' }} />

            <li className={this.state.pastureCoordinate.indexOf('2,0') === -1 ? 'land1' : 'land2'} style={{ top: '15.5%', left: '39.5%' }}>
              <div className='cow' style={{ display: cowsStatus ? this.showCows('2,0') : this.showCows('2,0') }}><span className='countdown'>{recycTimeStatus ? CountDown(stockTime[1]) : CountDown(stockTime[1])}</span></div>
              <div className='clkdiv' onClick={(code, coordinate, price) => { this.pastureAction('2', '2,0', 300.00) }} />
            </li>
            <li className={this.state.pastureCoordinate.indexOf('2,0') === -1 ? 'land1' : 'land2'} style={{ top: '25.5%', left: '29%' }} />
            <li className={this.state.pastureCoordinate.indexOf('2,0') === -1 ? 'land1' : 'land2'} style={{ top: '35.5%', left: '19%' }} />

            <li className={this.state.pastureCoordinate.indexOf('3,0') === -1 ? 'land1' : 'land2'} style={{ top: '24%', left: '51%' }}>
              <div className='cow' style={{ display: cowsStatus ? this.showCows('3,0') : this.showCows('3,0') }}><span className='countdown'>{recycTimeStatus ? CountDown(stockTime[2]) : CountDown(stockTime[2])}</span></div>
              <div className='clkdiv' onClick={(code, coordinate, price) => { this.pastureAction('3', '3,0', 300.00) }} />
            </li>
            <li className={this.state.pastureCoordinate.indexOf('3,0') === -1 ? 'land1' : 'land2'} style={{ top: '34%', left: '40.5%' }} />
            <li className={this.state.pastureCoordinate.indexOf('3,0') === -1 ? 'land1' : 'land2'} style={{ top: '44%', left: '30%' }} />

            <li className={this.state.pastureCoordinate.indexOf('4,0') === -1 ? 'land1' : 'land2'} style={{ top: '32.5%', left: '62.5%' }}>
              <div className='cow' style={{ display: cowsStatus ? this.showCows('4,0') : this.showCows('4,0') }}><span className='countdown'>{recycTimeStatus ? CountDown(stockTime[3]) : CountDown(stockTime[3])}</span></div>
              <div className='clkdiv' onClick={(code, coordinate, price) => { this.pastureAction('4', '4,0', 300.00) }} />
            </li>
            <li className={this.state.pastureCoordinate.indexOf('4,0') === -1 ? 'land1' : 'land2'} style={{ top: '42.5%', left: '52%' }} />
            <li className={this.state.pastureCoordinate.indexOf('4,0') === -1 ? 'land1' : 'land2'} style={{ top: '52.5%', left: '41.5%' }} />

            <li className={this.state.pastureCoordinate.indexOf('5,0') === -1 ? 'land1' : 'land2'} style={{ top: '41%', left: '74%' }}>
              <div className='cow' style={{ display: cowsStatus ? this.showCows('5,0') : this.showCows('5,0') }}><span className='countdown'>{recycTimeStatus ? CountDown(stockTime[4]) : CountDown(stockTime[4])}</span></div>
              <div className='clkdiv' onClick={(code, coordinate, price) => { this.pastureAction('5', '5,0', 300.00) }} />
            </li>
            <li className={this.state.pastureCoordinate.indexOf('5,0') === -1 ? 'land1' : 'land2'} style={{ top: '51.5%', left: '63.5%' }} />
            <li className={this.state.pastureCoordinate.indexOf('5,0') === -1 ? 'land1' : 'land2'} style={{ top: '61.5%', left: '53%' }} />
          </ul>
          <Link to='/' className='back-home'><img src={require('./img/back.png')} alt='' /></Link>
        </div>

        <div className='operation'>
          <div className='item-list-bar-wrapper'>
            <div className='cows item-list-bar' style={{ display: showCowBoxList ? null : 'none' }}>
              <div className='prev' />
              <div className='content-box'><img src={require('./img/thumb.png')} alt='' onClick={(key) => { this.mouseAction('stocking') }} /></div>
              <div className='next' />
            </div>
            <div className='equipment item-list-bar' style={{ display: showEquipmentList ? null : 'none' }}>
              <div className='prev' />
              <div className='content-box'>装备内容</div>
              <div className='next' />
            </div>
          </div>
          <div className='item-wrapper'>
            <div className='operation-item' onClick={(key) => { this.mouseAction('openPasture') }}>
              <img src={require('./img/shovel.png')} alt='' style={{ width: pastureOpenable ? '120%' : '100%', border: pastureOpenable ? '1px solid #333' : '1px solid transparent' }} /><br />
              <span>开牧场</span>
            </div>
            <div className='operation-item' onClick={this.showCowBox}>
              <img src={require('./img/setgerm.png')} alt='' style={{ width: stockingable ? '120%' : '100%', border: stockingable ? '1px solid #333' : '1px solid transparent' }} /><br />
              <span>放养</span>
            </div>
            <div className='operation-item' onClick={(key) => { this.mouseAction('recycle') }}>
              <img src={require('./img/hand.png')} alt='' style={{ width: recycleable ? '120%' : '100%', border: recycleable ? '1px solid #333' : '1px solid transparent' }} /><br />
              <span>收回</span>
            </div>
            {/* <div className='operation-item' onClick={this.showEquipment}>
              <img src={require('./img/huafeis.png')} alt='' /><br />
              <span>装备</span>
            </div> */}
          </div>
        </div>

        <Dialog className='dialog-opened' type='ios' buttons={[{ label: '好的', onClick: this.hideDialog }]} show={this.state.MsgPastureOpened}>
          该牧场已开！
        </Dialog>
      </div>
    )
  }
}