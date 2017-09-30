import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import './Sell.scss'

let ID, USERNAME

export default class Sell extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  state = {
    amountIsError: false,
    amountErrorInfo: '',
    buyerIsError: false,
    buyerErrorInfo: ''
  }

  handleSubmit = () => {
    if (this.refs.amount.value.length === 0) { this.setState({ amountIsError: true, amountErrorInfo: '数量不能为空！' }) }
    if (this.refs.buyer.value.length === 0) { this.setState({ buyerIsError: true, buyerErrorInfo: '买家账号不能为空！' }) }

    if (this.refs.amount.value.length !== 0 && this.refs.buyer.value.length !== 0 && !this.state.amountIsError && !this.state.buyerIsError) {
      let values = {
        'customerId': ID,
        'buyer': this.refs.buyer.value,
        'amount': parseInt(this.refs.amount.value)
      }

      Client.transactions(values, auth.getToken(), result => {
        if (!result.errored) {
          this.props.history.push('/trade/sellrecord')
        }
      })
    }
  }

  amountChange = () => {
    if (this.refs.amount.value.length !== 0) {
      if (this.refs.amount.value.length > 6) {
        this.refs.amount.value = this.refs.amount.value.substr(0, 7)
      }
      if (parseInt(this.refs.amount.value) % 100 !== 0) {
        this.setState({ amountIsError: true, amountErrorInfo: '出售数量必须为100的整数倍！' })
      } else {
        this.setState({ amountIsError: false })
      }
    }
  }

  buyerChange = () => {
    if (this.refs.buyer.value.length !== 0) {
      Client.customerExist(this.refs.buyer.value, auth.getToken(), result => {
        if (!result.errored && this.refs.tradeSellBox) {
          if (result.object) {
            this.setState({ buyerIsError: false })
            if (this.refs.buyer.value === USERNAME) {
              this.setState({ buyerIsError: true, buyerErrorInfo: '买家账号不能为自己！' })
            } else {
              this.setState({ buyerIsError: false })
            }
          } else {
            this.setState({ buyerIsError: true, buyerErrorInfo: '该用户不存在！' })
          }
        }
      })
    }
  }

  componentWillMount() {
    ID = currentUser().id
    USERNAME = currentUser().name
  }

  render() {
    const { amountIsError, amountErrorInfo, buyerIsError, buyerErrorInfo } = this.state
    return (
      <div className='trade-sell toolbar-page' ref='tradeSellBox'>
        <Toolbar link='/trade' title='创建交易' />
        <div className='sell-content toolbar-page-content'>
          <div className={amountIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <input type='number' ref='amount' placeholder='出售数量（必须为100的整数倍）' onChange={this.amountChange} />
          </div>
          {amountIsError ? <div className='validata-info'>{amountErrorInfo}</div> : null}

          <div className={buyerIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <input type='text' ref='buyer' placeholder='买家账号' onChange={this.buyerChange} />
          </div>
          {buyerIsError ? <div className='validata-info'>{buyerErrorInfo}</div> : null}

          <div className='input-wrapper auth-code'>
            <input type='text' placeholder='短信验证码' />
            <button>获取验证码</button>
          </div>
        </div>
        <div className='submit-btn'>
          <button onClick={this.handleSubmit}>确认出售</button>
        </div>
      </div>
    )
  }
}