import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import QueueAnim from 'rc-queue-anim'
import './CreatPasture.scss'

let ID, USERNAME

export default class CreatPasture extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  state = {
    recomName: '',
    createSuccess: null,
    userNameIsError: false,
    userNameErrorInfo: '',
    passwordIsError: false,
    passwordErrorInfo: '',
    nickNameIsError: false,
    nickNameErrorInfo: '',
    phoneIsError: false,
    phoneErrorInfo: '',
    wechatIsEmpty: false,
    alipayIsEmpty: false
  }

  handleSubmit = () => {
    const { userNameIsError, passwordIsError, phoneIsError } = this.state
    if (this.refs.userName.value.length === 0) { this.setState({ userNameIsError: true, userNameErrorInfo: '用户名不能为空！' }) }
    if (this.refs.password.value.length === 0) { this.setState({ passwordIsError: true, passwordErrorInfo: '密码不能为空！' }) }
    if (this.refs.nickName.value.length === 0) { this.setState({ nickNameIsError: true, nickNameErrorInfo: '昵称不能为空！' }) }
    if (this.refs.phone.value.length === 0) { this.setState({ phoneIsError: true, phoneErrorInfo: '手机号码不能为空！' }) }
    if (this.refs.wechat.value.length === 0) { this.setState({ wechatIsEmpty: true }) }
    if (this.refs.alipay.value.length === 0) { this.setState({ alipayIsEmpty: true }) }

    if (
      this.refs.userName.value.length !== 0 &&
      this.refs.password.value.length !== 0 &&
      this.refs.nickName.value.length !== 0 &&
      this.refs.phone.value.length !== 0 &&
      this.refs.wechat.value.length !== 0 &&
      this.refs.alipay.value.length !== 0 &&
      !userNameIsError &&
      !passwordIsError &&
      !phoneIsError
    ) {
      const values = {
        'userName': this.refs.userName.value,
        'password': this.refs.password.value,
        'recomName': this.state.recomName,
        'nickName': this.refs.nickName.value,
        'mobile': this.refs.phone.value,
        'wechat': this.refs.wechat.value,
        'alipay': this.refs.alipay.value
      }
      Client.createUser(ID, values, auth.getToken(), result => {
        this.props.history.push('/pasture/friends')
      })
    }
  }

  // 监听验证
  nameChange = () => {
    const min = 5
    const max = 12
    if (this.refs.userName.value.length !== 0) {
      if (this.refs.userName.value.length < min || this.refs.userName.value.length > max) {
        this.setState({ userNameIsError: true, userNameErrorInfo: '用户名长度只能为5-12位！' })
      }
      var myreg = /^[A-Za-z0-9_]*$/g
      if (!myreg.test(this.refs.userName.value)) {
        this.setState({ userNameIsError: true, userNameErrorInfo: '只能含有数字、字母、下划线！' })
      } else {
        if (this.refs.userName.value.length >= min && this.refs.userName.value.length <= max) {
          Client.customerExist(this.refs.userName.value, auth.getToken(), result => {
            if (!result.errored && this.refs.creatPasture) {
              if (result.object) {
                this.setState({ userNameIsError: true, userNameErrorInfo: '该用户已存在！' })
              } else {
                this.setState({ userNameIsError: false })
              }
            }
          })
        }
      }
    }
  }

  pwdChange = () => {
    if (this.refs.password.value.length !== 0) { this.setState({ passwordIsError: false }) }
    if (this.refs.password.value.length < 6) { this.setState({ passwordIsError: true, passwordErrorInfo: '密码长度至少6位！' }) }
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
          if (!result.errored && this.refs.creatPasture) {
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

  nickChange = () => {
    if (this.refs.nickName.value.length !== 0) {
      Client.nicknameExist(this.refs.nickName.value, auth.getToken(), result => {
        if (!result.errored && this.refs.creatPasture) {
          if (result.object) {
            this.setState({ nickNameIsError: true, nickNameErrorInfo: '该昵称已被注册！' })
          } else {
            this.setState({ nickNameIsEmpty: false })
          }
        }
      })
    }
  }

  handleChange = () => {
    if (this.refs.wechat.value.length !== 0) { this.setState({ wechatIsEmpty: false }) }
    if (this.refs.alipay.value.length !== 0) { this.setState({ alipayIsEmpty: false }) }
  }

  componentWillMount() {
    ID = currentUser().id
    USERNAME = currentUser().name
  }

  componentDidMount() {
    Client.getRecommend(USERNAME, auth.getToken(), result => {
      if (!result.errored && this.refs.creatPasture) {
        this.setState({ recomName: result[0] })
      }
    })
  }

  render() {
    const {
      userNameIsError,
      userNameErrorInfo,
      passwordIsError,
      passwordErrorInfo,
      nickNameIsError,
      nickNameErrorInfo,
      phoneIsError,
      phoneErrorInfo,
      wechatIsEmpty,
      alipayIsEmpty } = this.state
    return (
      <div className='creat-pasture toolbar-page' ref='creatPasture'>
        <Toolbar link='/pasture' title='开发新牧场' />
        <div className='creat-pasture-content toolbar-page-content'>
          <QueueAnim delay={300} className='queue-simple'>
            <div key='1' className={userNameIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
              <input type='text' maxLength='12' ref='userName' placeholder='用户名（5-12位，只能含有数字、字母、下划线）' onChange={this.nameChange} />
            </div>
            {userNameIsError ? <div className='validata-info'>{userNameErrorInfo}</div> : null}

            <div key='2' className={passwordIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
              <input type='password' ref='password' placeholder='新账号登录密码（至少6位）' onChange={this.pwdChange} />
            </div>
            {passwordIsError ? <div className='validata-info'>{passwordErrorInfo}</div> : null}

            <div key='3' className={nickNameIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
              <input type='text' ref='nickName' maxLength='20' placeholder='昵称（0-20位）' onChange={this.nickChange} />
            </div>
            {nickNameIsError ? <div className='validata-info'>{nickNameErrorInfo}</div> : null}

            <div key='4' className={phoneIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
              <input type='text' maxLength='11' ref='phone' placeholder='手机号码' onChange={this.phoneChange} />
            </div>
            {phoneIsError ? <div className='validata-info'>{phoneErrorInfo}</div> : null}

            <div key='5' className={wechatIsEmpty ? 'input-wrapper validata-error' : 'input-wrapper'}>
              <input type='text' ref='wechat' maxLength='30' placeholder='微信' onChange={this.handleChange} />
            </div>
            {wechatIsEmpty ? <div className='validata-info'>微信不能为空！</div> : null}

            <div key='6' className={alipayIsEmpty ? 'input-wrapper validata-error' : 'input-wrapper'}>
              <input type='text' ref='alipay' maxLength='30' placeholder='支付宝' onChange={this.handleChange} />
            </div>
            {alipayIsEmpty ? <div className='validata-info'>支付宝不能为空！</div> : null}

            <div key='7' className='submit-btn'>
              <button onClick={this.handleSubmit}>确认开发新牧场</button>
            </div>
          </QueueAnim>
        </div>
      </div>
    )
  }
}