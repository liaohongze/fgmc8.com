import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import QueueAnim from 'rc-queue-anim'
import './Recharge.scss'

let ID

export default class Recharge extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  state = {
    amountIsError: false,
    amountErrorInfo: '',
    paymentIsEmpty: false,
    nameIsError: false
  }

  componentWillMount() {
    ID = currentUser().id
  }

  handleSubmit = () => {
    if (this.refs.amount.value.length === 0) { this.setState({ amountIsError: true, amountErrorInfo: '充值金额不能为空！' }) }
    if (this.refs.channel.value === 'select') { this.setState({ paymentIsEmpty: true }) }
    if (this.refs.name.value.length === 0) { this.setState({ nameIsError: true }) }

    if (this.refs.amount.value.length !== 0 && this.refs.channel.value !== 'select' && this.refs.name.value.length !== 0) {
      let values = {
        'customerId': ID,
        'name': this.refs.name.value,
        'amount': parseInt(this.refs.amount.value),
        'channel': this.refs.channel.value,
        'picture': 'string'
      }

      Client.Recharges(values, auth.getToken(), result => {
        if (!result.errored) {
          this.props.history.push('/pasture/rechargerecord')
        }
      })
    }
  }

  // 监听验证
  amountChange = () => {
    if (this.refs.amount.value.length !== 0) {
      if (this.refs.amount.value.length > 6) {
        this.refs.amount.value = this.refs.amount.value.substr(0, 6)
      }
      if (parseInt(this.refs.amount.value) % 100 !== 0) {
        this.setState({ amountIsError: true, amountErrorInfo: '充值金额必须为100的整数倍！' })
      } else {
        this.setState({ amountIsError: false })
      }
    }
  }

  handleChange = () => {
    if (this.refs.channel.value !== 'select') { this.setState({ paymentIsEmpty: false }) }
    if (this.refs.name.value.length !== 0) { this.setState({ nameIsError: false }) }
  }

  render() {
    const { amountIsError, amountErrorInfo, paymentIsEmpty, nameIsError } = this.state
    return (
      <div className='recharge toolbar-page'>
        <Toolbar link='/pasture' title='创建充值' />
        <div className='recharge-content toolbar-page-content'>
          <QueueAnim delay={200} className='queue-simple'>
            <div key='1' className={amountIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
              <input type='number' ref='amount' placeholder='请输入充值的金额' onChange={this.amountChange} />
            </div>
            {amountIsError ? <div className='validata-info'>{amountErrorInfo}</div> : null}

            <div key='2' className={paymentIsEmpty ? 'input-wrapper validata-error' : 'input-wrapper'}>
              <select ref='channel' onChange={this.handleChange}>
                <option value='select'>请选择支付方式</option>
                <option value='Wechat'>微信支付</option>
                <option value='Alipay'>支付宝</option>
              </select>
            </div>
            {paymentIsEmpty ? <div className='validata-info'>支付方式不能为空！</div> : null}

            <div key='3' className={nameIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
              <input type='text' ref='name' maxLength='20' placeholder='请输入付款人昵称' onChange={this.handleChange} />
            </div>
            {nameIsError ? <div className='validata-info'>付款人昵称不能为空！</div> : null}

            <div key='4' className='submit-btn'>
              <button onClick={this.handleSubmit}>确认充值</button>
            </div>
          </QueueAnim>
        </div>
      </div>
    )
  }
}