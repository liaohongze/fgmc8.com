import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Toast } from 'react-weui'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import './Withdraw.scss'

let ID

export default class Withdraw extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  state = {
    timer: null,
    amountIsError: false,
    amountErrorInfo: '',
    withdrawIsEmpty: false,
    toast: false,
    toastInfo: ''
  }

  handleSubmit = () => {
    if (this.refs.amount.value.length === 0) { this.setState({ amountIsError: true, amountErrorInfo: '提现金额不能为空！' }) }
    if (this.refs.channel.value === 'select') { this.setState({ withdrawIsEmpty: true }) }

    if (
      this.refs.amount.value.length !== 0 &&
      this.refs.channel.value !== 'select' &&
      !this.state.amountIsError
    ) {
      let values = {
        'customerId': ID,
        'amount': parseInt(this.refs.amount.value),
        'type': this.refs.channel.value
      }
      Client.withdraws(values, auth.getToken(), result => {
        if (!result.errored && this.refs.withdrawBox) {
          this.refs.amount.value = null
          this.refs.channel.value = 'select'
          this.setState({ toast: true, toastInfo: '申请成功' })
          this.state.timer = setTimeout(() => {
            this.setState({ toast: false })
            this.props.history.push('/trade/withdrawrecord')
          }, 2000)
        } else {
          this.setState({ toast: true, toastInfo: '申请失败' })
          this.state.timer = setTimeout(() => {
            this.setState({ toast: false })
          }, 2000)
        }
      })
    }
  }

  handleChange = () => {
    if (this.refs.channel.value !== 'select') { this.setState({ withdrawIsEmpty: false }) }
  }

  amountChange = () => {
    if (this.refs.amount.value.length !== 0) {
      if (this.refs.amount.value.length > 6) {
        this.refs.amount.value = this.refs.amount.value.substr(0, 6)
      }
      if (parseInt(this.refs.amount.value) % 100 !== 0) {
        this.setState({ amountIsError: true, amountErrorInfo: '提现金额必须为100的整数倍！' })
      } else {
        this.setState({ amountIsError: false })
      }
    }
  }

  componentWillMount() {
    ID = currentUser().id
  }

  componentWillUnMount() {
    clearTimeout(this.state.timer)
  }

  render() {
    const { amountIsError, withdrawIsEmpty, amountErrorInfo, toast, toastInfo } = this.state
    return (
      <div className='withdraw toolbar-page' ref='withdrawBox'>
        <Toolbar link='/trade' title='提现申请' />
        <div className='withdraw-content toolbar-page-content'>
          <div className={withdrawIsEmpty ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <select ref='channel' onChange={this.handleChange}>
              <option value='select'>请选择</option>
              <option value='Direct'>直推</option>
              <option value='Income'>收益</option>
            </select>
          </div>
          {withdrawIsEmpty ? <div className='validata-info'>请选择提现方式！</div> : null}

          <div className={amountIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <input type='number' ref='amount' placeholder='提现金额(必须为100的整数倍)' onChange={this.amountChange} />
          </div>
          {amountIsError ? <div className='validata-info'>{amountErrorInfo}</div> : null}

        </div>
        <div className='submit-btn'>
          <button onClick={this.handleSubmit}>确认</button>
        </div>
        <Toast icon={toastInfo === '申请失败' ? 'warn' : 'success-no-circle'} show={toast}>{toastInfo}</Toast>
      </div>
    )
  }
}