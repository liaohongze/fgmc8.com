import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dialog } from 'react-weui'
import BetNumber from './BetNumber'
import BetAmount from './BetAmount'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import BetHistory from './BetHistory'
import './Bet.scss'

let timer, timer2, countDownTimer, roundTimer, waitTimer, closeWaitTimer, ID

export default class Bet extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  state = {
    stock: 0,
    showErrorMsg: false,
    gameStatus: false,
    activeNum: 0,
    betNum: 0,
    betName: '庄',
    odds: 1.9,
    amount: '5',
    countDown: 20,
    countDownStatus: false,
    waitTime: 3,
    showWaitDialog: false,
    showResultDialog: false,
    showBetDialog: false,
    showHistory: false,
    hadBet: false,
    winBetNumber: 3, // 省缺值
    historyData: [],
    gamblings: {id: '', 'periodNumber': '', 'round': 0, 'stage': 0}
  }

  refreshUserInfo = () => {
    Client.getUser(ID, auth.getToken(), result => {
      if (!result.errored && this.refs.betBox) {
        this.setState({ stock: result.object.stock })
      }
    })
  }

  startGame = () => {
    // 初始化游戏数据
    this.setState(() => {
      return {
        countDownStatus: true,
        hadBet: false,
        countDown: 20
      }
    })
    // 重置所有定时器
    this.clearAllTimer()
    // 获取期数
    Client.gamblings(auth.getToken(), result => {
      // && this.refs.betBox 如果组件卸载了就不执行setState，否则会出现错误
      if (!result.errored && this.refs.betBox) {
        this.setState({
          gamblings: result.object
        })
      }
    })
    // 获取往期记录
    Client.getGamblingsRound(auth.getToken(), result => {
      if (!result.errored) { this.setState({historyData: result.object}) }
    })
    // 开始倒计时
    this.countDowner()
  }

  countDowner = () => {
    countDownTimer = window.setInterval(() => {
      if (this.state.countDown !== 0) {
        this.setState({ countDown: this.state.countDown - 1 })
      }
      this.countDownEnd()
    }, 1000)
  }

  countDownEnd = () => {
    if (this.state.countDown === 0) {
      window.clearInterval(countDownTimer)
      this.setState({ countDownStatus: false, showWaitDialog: true })
      this.waitBetResult()
    }
  }

  waitBetResult = () => {
    waitTimer = window.setInterval(() => {
      this.setState({ waitTime: this.state.waitTime - 1 })
    }, 1000)

    if (this.state.hadBet) {
      this.gethadBetResult()
    } else {
      this.getNoBetResult()
    }

    closeWaitTimer = window.setTimeout(() => {
      window.clearInterval(waitTimer)
      this.setState({ showWaitDialog: false, waitTime: 3, gameStatus: true, activeNum: 0 })
      this.startSpin(this.state.winBetNumber)
    }, 3800)
  }

  gethadBetResult = () => {
    let values = {
      'customerId': ID,
      'periodNumber': this.state.gamblings.periodNumber,
      'round': this.state.gamblings.round,
      'stage': this.state.gamblings.stage,
      'betName': this.state.betName,
      'amount': parseInt(this.state.amount),
      'odds': this.state.odds,
      'number': this.state.betNum
    }
    Client.getWillage(values, auth.getToken(), result => {
      if (!result.errored && this.refs.betBox) {
        this.setState(() => { return { winBetNumber: result.object.number } })
      } else {
        window.clearInterval(waitTimer)
        window.clearTimeout(closeWaitTimer)
        this.setState({ showWaitDialog: false, waitTime: 3, countDown: 20 })
        this.betUnable()
      }
    })
  }

  getNoBetResult = () => {
    let values = {
      'periodNumber': this.state.gamblings.periodNumber
    }
    Client.getNoBet(values, this.state.gamblings.id, auth.getToken(), result => {
      if (!result.errored && this.refs.betBox) {
        this.setState(() => { return { winBetNumber: result.object } })
      }
    })
  }

  startSpin = (winNumber) => {
    let turnTime = 5425 // 6圈
    if (winNumber === 0) {
      let randomNum = parseInt((Math.random() * (9 - 1) + 1), 10)
      let zhuang = [11, 12, 13, 14, 15, 16, 17, 18]
      turnTime = turnTime + zhuang[randomNum - 1] * 50
    } else if (winNumber === 1) {
      let randomNum = parseInt((Math.random() * (3 - 1) + 1), 10)
      let he = [1, 10]
      turnTime = turnTime + he[randomNum - 1] * 50
    } else if (winNumber === 2) {
      let randomNum = parseInt((Math.random() * (9 - 1) + 1), 10)
      let xian = [2, 3, 4, 5, 6, 7, 8, 9]
      turnTime = turnTime + xian[randomNum - 1] * 50
    }
    timer = window.setInterval(() => {
      if (this.state.activeNum === 18) {
        this.setState({ activeNum: 1 })
      } else {
        this.setState({
          activeNum: this.state.activeNum + 1
        })
      }
    }, 50)
    timer2 = window.setTimeout(() => {
      window.clearInterval(timer)
      this.setState({
        gameStatus: false
      })
      if (this.state.hadBet) {
        this.setState({ showResultDialog: true })
      } else {
        this.startGame()
      }
    }, turnTime)
  }

  customerBet = () => {
    this.setState(() => { return { showBetDialog: true } })
    window.clearInterval(countDownTimer)
  }

  betUnable = () => {
    this.setState(() => { return { showBetDialog: false, showErrorMsg: true } })
  }

  chooseBetNum = (num, betName, odds) => {
    this.setState({
      betNum: num,
      betName: betName,
      odds: odds
    })
  }

  betAmount = (amount) => {
    this.setState({ amount: amount })
  }

  pageGoBack = () => {
    this.props.history.goBack()
  }

  hideDialog = () => {
    this.setState({ showErrorMsg: false })
    this.countDowner()
  }

  goRecharge = () => {
    this.setState({ showErrorMsg: false })
    this.props.history.push('/pasture/recharge')
  }

  clearAllTimer = () => {
    window.clearInterval(timer)
    window.clearTimeout(timer2)
    window.clearInterval(countDownTimer)
    window.clearTimeout(roundTimer)
    window.clearInterval(waitTimer)
    window.clearTimeout(closeWaitTimer)
  }

  componentWillMount() {
    ID = currentUser().id
  }

  componentDidMount() {
    this.refreshUserInfo()
    this.startGame()
  }

  componentWillUnmount() {
    this.clearAllTimer()
  }

  render() {
    const {
      stock,
      activeNum,
      betNum,
      betName,
      amount,
      gameStatus,
      showErrorMsg,
      countDown,
      waitTime,
      odds,
      showWaitDialog,
      showResultDialog,
      showBetDialog,
      showHistory,
      winBetNumber,
      gamblings,
      historyData
    } = this.state
    return (
      <div className='guess-game' ref='betBox'>
        <div className='game-content'>
          <div className='issue'>
            <div className='goback' onClick={gameStatus ? null : this.pageGoBack}>返回</div>
            <div className='period'>{gamblings.periodNumber}期</div>
            <div className='history' onClick={!gameStatus ? () => { this.setState({showHistory: true}) } : null}>往期</div>
          </div>
          <div className='turngame'>
            <div className='circle'>
              <div className={activeNum === 1 ? 'item item1 active-number' : 'item item1'}>和</div>
              <div className={activeNum === 2 ? 'item item2 active-number' : 'item item2'}>闲</div>
              <div className={activeNum === 3 ? 'item item3 active-number' : 'item item3'}>闲</div>
              <div className={activeNum === 4 ? 'item item4 active-number' : 'item item4'}>闲</div>
              <div className={activeNum === 5 ? 'item item5 active-number' : 'item item5'}>闲</div>
              <div className={activeNum === 6 ? 'item item6 active-number' : 'item item6'}>闲</div>
              <div className={activeNum === 7 ? 'item item7 active-number' : 'item item7'}>闲</div>
              <div className={activeNum === 8 ? 'item item8 active-number' : 'item item8'}>闲</div>
              <div className={activeNum === 9 ? 'item item9 active-number' : 'item item9'}>闲</div>
              <div className={activeNum === 10 ? 'item item10 active-number' : 'item item10'}>和</div>
              <div className={activeNum === 11 ? 'item item11 active-number' : 'item item11'}>庄</div>
              <div className={activeNum === 12 ? 'item item12 active-number' : 'item item12'}>庄</div>
              <div className={activeNum === 13 ? 'item item13 active-number' : 'item item13'}>庄</div>
              <div className={activeNum === 14 ? 'item item14 active-number' : 'item item14'}>庄</div>
              <div className={activeNum === 15 ? 'item item15 active-number' : 'item item15'}>庄</div>
              <div className={activeNum === 16 ? 'item item16 active-number' : 'item item16'}>庄</div>
              <div className={activeNum === 17 ? 'item item17 active-number' : 'item item17'}>庄</div>
              <div className={activeNum === 18 ? 'item item18 active-number' : 'item item18'}>庄</div>
              <div className='count-down'>{countDown}</div>
            </div>
          </div>
        </div>
        <div className='game-control'>
          <BetNumber betNum={betNum} chooseBetNum={this.chooseBetNum} gameStatus={gameStatus} />
          <BetAmount amount={amount} betAmount={this.betAmount} gameStatus={gameStatus} />
          <div className='start-game'>
            <button disabled={gameStatus} onClick={this.customerBet}>下注</button><br />
          </div>
        </div>

        <Dialog
          type='ios'
          show={showErrorMsg}
          buttons={[{ type: 'default', label: '好的', onClick: this.hideDialog }, { type: 'primary', label: '去充值', onClick: this.goRecharge }]}
        >
          余额不足，无法下注！
        </Dialog>

        <Dialog
          className='dialog-opened'
          type='ios'
          show={showWaitDialog}
        >
          结束投注，等待开奖...<br />{waitTime}S
        </Dialog>

        <Dialog
          className='betresult-dialog'
          type='ios'
          show={showBetDialog}
        >
          <div className='result-title'>{gamblings.periodNumber}</div>
          <div className='result-content'>
            <div><span>本次竞猜</span><span className='betresult'>{betName}</span></div>
            <div><span>本次投注</span><span>{amount}金币</span></div>
            <div><span>本次赔率</span><span>1赔{odds}</span></div>
            <div><span>预期收益</span><span>{parseInt(amount) * odds}金币</span></div>
          </div>
          <button
            onClick={() => {
              if (stock < parseInt(amount)) {
                this.betUnable()
              } else {
                this.setState(() => { return { hadBet: true, showBetDialog: false } })
                this.countDowner()
              }
            }}
          >
            确定
          </button>
        </Dialog>

        <Dialog
          className='betresult-dialog'
          type='ios'
          show={showResultDialog}
        >
          <div className='result-title'>{gamblings.periodNumber}<span className='red-text result-text'>{winBetNumber === betNum ? '恭喜你中奖了！' : '很遗憾！'}</span></div>
          <div className='result-content'>
            <div>
              <span className='red-text'>开奖结果</span>
              <span className='betresult'>{winBetNumber === 0 ? '庄' : (winBetNumber === 1 ? '和' : '闲')}</span>
            </div>
            <div><span>[庄]下注</span><span>{betNum === 0 ? amount : '0'}金币</span></div>
            <div><span>[和]下注</span><span>{betNum === 1 ? amount : '0'}金币</span></div>
            <div><span>[闲]下注</span><span>{betNum === 2 ? amount : '0'}金币</span></div>
            <div><span>获得奖金</span><span>{winBetNumber === betNum ? parseInt(amount) * odds : '0'}金币</span></div>
          </div>
          <button
            onClick={() => {
              this.setState({ showResultDialog: false })
              this.startGame()
            }}
          >
            确定
          </button>
        </Dialog>

        {showHistory ? <BetHistory gamblings={gamblings} historyData={historyData} close={() => { this.setState({showHistory: false}) }} /> : null}
      </div>
    )
  }
}