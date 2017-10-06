import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import './Turntable.scss'

let ID

export default class Turntable extends Component {
  state = {
    stock: null,
    rotateTimer: null,
    doneTimer: null,
    isRotate: false,
    isClickable: true,
    rotateDeg: '',
    bonusGrade: null,
    luckDrawDone: false,
    bonusInfo: []
  }

  refreshData = () => {
    Client.getUser(ID, auth.getToken(), result => {
      if (!result.errored) {
        this.setState({ stock: result.object.stock })
        if (result.object.stock === 0) {
          this.setState({ isClickable: false })
        }
      }
    })
  }

  luckDraw = () => {
    let resultNum
    // 生成一个1-6的随机数
    let randomNum = parseInt((Math.random() * (7 - 1) + 1), 10)
    let noBonus = [2, 4, 6, 8, 10, 12]
    if (this.state.stock >= 3) {
      Client.turntable({ customerId: ID }, auth.getToken(), result => {
        if (!result.errored) {
          resultNum = result.object.level === 0 ? noBonus[randomNum - 1] : result.object.level * 2 - 1
          this.setState({
            rotateDeg: 3600 + (resultNum - 1) * 30,
            isRotate: true,
            isClickable: false
          })
        }
        this.state.rotateTimer = window.setTimeout(() => {
          this.setState({
            isClickable: true,
            rotateDeg: '',
            bonusGrade: result.object.level === 0 ? '没有中奖' : result.object.level + '等奖',
            isRotate: false
          })
          this.refreshData()
        }, 5000)
        this.state.doneTimer = window.setTimeout(() => { this.setState({ luckDrawDone: true }) }, 4700)
      })
    }
  }

  playAgain = () => {
    this.setState({ luckDrawDone: false })
  }

  componentWillMount() {
    ID = currentUser().id
  }

  componentDidMount() {
    this.refreshData()
    Client.getPrizes(auth.getToken(), result => {
      if (!result.errored) {
        if (result.object) {
          this.setState({ bonusInfo: result.object })
        }
      } else {
        this.setState({ bonusInfo: [] })
      }
    })
  }

  componentWillUnmount() {
    clearTimeout(this.state.rotateTimer)
    clearTimeout(this.state.doneTimer)
  }

  render() {
    const { stock, rotateDeg, bonusGrade, luckDrawDone, bonusInfo } = this.state
    return (
      <div className='turntable'>
        <div className='outercont' style={{ height: luckDrawDone ? '0' : '336px' }}>
          <div className='outer-cont'>
            <div className='outer' ref='outer'>
              <img
                src={require('./img/activity-lottery-1.png')}
                alt=''
                style={this.state.isRotate ? { transition: 'transform 5s', transform: 'rotate(' + rotateDeg.toString() + 'deg)' } : null}
              />
            </div>
          </div>

          <div className='inner-cont'>
            <button className='inner' onClick={this.luckDraw} disabled={!this.state.isClickable}>
              <img src={require('./img/activity-lottery-2.png')} alt='' />
            </button>
          </div>
        </div>

        <div className='content'>
          <div className='boxcontent boxyellow' id='result' style={{ display: luckDrawDone ? null : 'none' }}>
            <div className='box'>
              <div className='title-orange'><span>{bonusGrade === '没有中奖' ? '谢谢参与' : '恭喜你中奖了'}</span></div>
              <div className='detail'>
                <p>{bonusGrade === '没有中奖' ? '很遗憾：' : '你中了：'}<span className='red' id='prizetype'>{bonusGrade}</span></p>
                <p><button className='play-again' onClick={this.playAgain}>再玩一次</button></p>
              </div>
            </div>
          </div>

          <div className='boxcontent boxyellow'>
            <div className='box'>
              <center><Link to='/luckygame'>返回</Link></center>
            </div>
          </div>

          <div className='boxcontent boxyellow'>
            <div className='box'>
              <div className='title-green'><span>奖项设置：</span></div>
              <div className='detail'>
                {
                  bonusInfo.length === 0
                    ? <p>暂无数据</p>
                    : (
                      bonusInfo.map((item, index) => {
                        return <p key={index}>{item.title + '：' + item.name}</p>
                      })
                    )
                }
              </div>
            </div>
          </div>

          <div className='boxcontent boxyellow'>
            <div className='box'>
              <div className='title-green'>活动说明：</div>
              <div className='detail'>
                <p>本次活动每次消耗3头牛,您的库存牛群数：{stock}</p>
                <p className='red' style={{ display: stock === 0 ? null : 'none' }}>积分不足无法抽奖！</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}