import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
import { Base64Decode } from '../../utils/basecode'
import './Promotional.scss'

export default class Promotional extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  // IsError: false,   ErrorInfo: '',
  state = {
    recomName: '',
    accountIsError: false,
    accountErrorInfo: '',
    nicknameIsError: false,
    nicknameErrorInfo: '',
    phoneIsError: false,
    phoneErrorInfo: '',
    passwordIsError: false,
    passwordErrorInfo: '',
    confirmpwdIsError: false,
    confirmpwdErrorInfo: '',
    wechatIsEmpty: false,
    alipayIsEmpty: false
  }

  handleSubmit = () => {
    if (this.refs.account.value.length === 0) { this.setState({ accountIsError: true, accountErrorInfo: '用户名不能为空！' }) }
    if (this.refs.password.value.length === 0) { this.setState({ passwordIsError: true, passwordErrorInfo: '密码不能为空！' }) }
    if (this.refs.confirmpwd.value.length === 0) { this.setState({ confirmpwdIsError: true, confirmpwdErrorInfo: '确认密码不能为空！' }) }
    if (this.refs.nickname.value.length === 0) { this.setState({ nicknameIsError: true, nicknameErrorInfo: '昵称不能为空！' }) }
    if (this.refs.phone.value.length === 0) { this.setState({ phoneIsError: true, phoneErrorInfo: '手机号码不能为空！' }) }
    if (this.refs.wechat.value.length === 0) { this.setState({ wechatIsEmpty: true }) }
    if (this.refs.alipay.value.length === 0) { this.setState({ alipayIsEmpty: true }) }

    if (
      this.refs.account.value.length !== 0 &&
      this.refs.password.value.length !== 0 &&
      this.refs.confirmpwd.value.length !== 0 &&
      this.refs.nickname.value.length !== 0 &&
      this.refs.phone.value.length !== 0 &&
      this.refs.wechat.value.length !== 0 &&
      this.refs.alipay.value.length !== 0 &&
      !this.state.accountIsError &&
      !this.state.nicknameIsError &&
      !this.state.phoneIsError &&
      !this.state.passwordIsError &&
      !this.state.confirmpwdIsError
    ) {
      const values = {
        'userName': this.refs.account.value,
        'password': this.refs.password.value,
        'recomName': this.refs.recommender.value,
        'nickName': this.refs.nickname.value,
        'mobile': this.refs.phone.value,
        'wechat': this.refs.wechat.value,
        'alipay': this.refs.alipay.value
      }
      Client.signup(values, auth.getToken(), result => {
        if (!result.errored && this.refs.promotionalBox) {
          this.props.history.push('/login')
        }
      })
    }
  }

  // 监听输入框
  accountChange = () => {
    const min = 5
    const max = 12
    if (this.refs.account.value.length !== 0) {
      if (this.refs.account.value.length < min || this.refs.account.value.length > max) {
        this.setState({ accountIsError: true, accountErrorInfo: '用户名长度只能为5-12位！' })
      }
      var myreg = /^[A-Za-z0-9_]*$/g
      if (!myreg.test(this.refs.account.value)) {
        this.setState({ accountIsError: true, accountErrorInfo: '只能含有数字、字母、下划线！' })
      } else {
        if (this.refs.account.value.length >= min && this.refs.account.value.length <= max) {
          Client.customerExist(this.refs.account.value, auth.getToken(), result => {
            if (!result.errored && this.refs.promotionalBox) {
              if (result.object) {
                this.setState({ accountIsError: true, accountErrorInfo: '该用户已存在！' })
              } else {
                this.setState({ accountIsError: false })
              }
            }
          })
        }
      }
    }
  }

  nickChange = () => {
    if (this.refs.nickname.value.length !== 0) {
      Client.nicknameExist(this.refs.nickname.value, auth.getToken(), result => {
        if (!result.errored && this.refs.promotionalBox) {
          if (result.object) {
            this.setState({ nicknameIsError: true, nicknameErrorInfo: '该昵称已被使用！' })
          } else {
            this.setState({ nicknameIsEmpty: false })
          }
        }
      })
    }
  }

  phoneChange = () => {
    if (this.refs.phone.value.length !== 0) { this.setState({ phoneIsError: false }) }
    if (this.refs.phone.value.length !== 11) { this.setState({ phoneIsError: true, phoneErrorInfo: '手机号码需要11位！' }) }
    var myreg = /^1[34578]\d{9}$/
    if (!myreg.test(this.refs.phone.value)) {
      this.setState({ phoneIsError: true, phoneErrorInfo: '请输入有效的手机号码！' })
    } else {
      if (this.refs.phone.value.length === 11) {
        Client.mobileExist(this.refs.phone.value, auth.getToken(), result => {
          if (!result.errored && this.refs.promotionalBox) {
            if (result.object) {
              this.setState({ phoneIsError: true, phoneErrorInfo: '该手机号码已被注册！' })
            } else {
              this.setState({ phoneIsError: false })
            }
          }
        })
      }
    }
  }

  pwdChange = () => {
    if (this.refs.password.value.length !== 0) { this.setState({ passwordIsError: false }) }
    if (this.refs.password.value.length < 6) { this.setState({ passwordIsError: true, passwordErrorInfo: '密码长度至少6位！' }) }
  }

  confirmChange = () => {
    if (this.refs.password.value !== this.refs.confirmpwd.value) {
      this.setState({ confirmpwdIsError: true, confirmpwdErrorInfo: '与新密码不一致！' })
    } else {
      this.setState({ confirmpwdIsError: false })
    }
  }

  handleChange = () => {
    if (this.refs.wechat.value.length !== 0) { this.setState({ wechatIsEmpty: false }) }
    if (this.refs.alipay.value.length !== 0) { this.setState({ alipayIsEmpty: false }) }
  }

  componentDidMount() {
    const recom = location.search.split('=')
    if (recom[1]) {
      this.setState({ recomName: Base64Decode(recom[1]) })
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    const {
      recomName,
      accountIsError,
      accountErrorInfo,
      nicknameIsError,
      nicknameErrorInfo,
      phoneIsError,
      phoneErrorInfo,
      passwordIsError,
      passwordErrorInfo,
      confirmpwdIsError,
      confirmpwdErrorInfo,
      wechatIsEmpty,
      alipayIsEmpty
    } = this.state
    return (
      <div className='promotional-link toolbar-page' ref='promotionalBox'>
        <div className='promotional-link-content toolbar-page-content'>
          <div className='input-wrapper'>
            <label htmlFor='recommender'>推荐人：</label>
            <input id='recommender' ref='recommender' type='text' value={recomName} disabled />
          </div>
          <div className={accountIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <label htmlFor='account'>会员账号：</label>
            <input id='account' ref='account' type='text' maxLength='12' placeholder='用户名（5-12位，只能含有数字、字母、下划线）' onChange={this.accountChange} />
          </div>
          {accountIsError ? <div className='validata-info'>{accountErrorInfo}</div> : null}

          <div className={nicknameIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <label htmlFor='nickname'>昵称：</label>
            <input id='nickname' ref='nickname' maxLength='20' type='text' placeholder='昵称：' onChange={this.nickChange} />
          </div>
          {nicknameIsError ? <div className='validata-info'>{nicknameErrorInfo}</div> : null}

          <div className={phoneIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <label htmlFor='phone'>手机号码：</label>
            <input id='phone' ref='phone' maxLength='11' type='text' placeholder='手机号码' onChange={this.phoneChange} />
          </div>
          {phoneIsError ? <div className='validata-info'>{phoneErrorInfo}</div> : null}

          <div className={wechatIsEmpty ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <label htmlFor='wechat'>微信号：</label>
            <input id='wechat' ref='wechat' maxLength='20' type='text' placeholder='微信号' onChange={this.handleChange} />
          </div>
          {wechatIsEmpty ? <div className='validata-info'>微信账号不能为空！</div> : null}

          <div className={alipayIsEmpty ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <label htmlFor='alipay'>支付宝：</label>
            <input id='alipay' ref='alipay' maxLength='20' type='text' placeholder='支付宝' onChange={this.handleChange} />
          </div>
          {alipayIsEmpty ? <div className='validata-info'>支付宝不能为空！</div> : null}

          <div className={passwordIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <label htmlFor='password'>登录密码：</label>
            <input id='password' ref='password' maxLength='12' type='password' placeholder='6-12位任意字符' onChange={this.pwdChange} />
          </div>
          {passwordIsError ? <div className='validata-info'>{passwordErrorInfo}</div> : null}

          <div className={confirmpwdIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <label htmlFor='confirmpwd'>确认密码：</label>
            <input id='confirmpwd' ref='confirmpwd' maxLength='12' type='password' placeholder='请再次输入您的登录密码' onChange={this.confirmChange} />
          </div>
          {confirmpwdIsError ? <div className='validata-info'>{confirmpwdErrorInfo}</div> : null}

        </div>

        <div className='submit-btn'>
          <button onClick={this.handleSubmit}>注册</button>
        </div>
      </div>
    )
  }
}