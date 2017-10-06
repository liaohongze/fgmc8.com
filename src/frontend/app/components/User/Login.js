import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {Toast} from 'react-weui'
import PropTypes from 'prop-types'
import { auth } from '../../common/Auth'
import Client from '../../common/Client'
import './Login.scss'

let Timer

export default class Login extends Component {
  static propTypes = {
    location: PropTypes.object
  }

  state = {
    redirectToReferrer: false,
    showError: false,
    errorMsg: '',
    captchaStatus: false,
    captchaSrc: '',
    code: ''
  }

  handleSubmit = () => {
    const userName = this.refs.name.value
    const password = this.refs.pwd.value

    if (!this.refs.captcha.value) {
      this.setState({
        showError: true,
        errorMsg: '验证码不能为空！'
      })
      Timer = window.setTimeout(() => {
        this.setState({showError: false})
      }, 2000)
    }

    if (!password) {
      this.setState({
        showError: true,
        errorMsg: '登录密码不能为空！'
      })
      Timer = window.setTimeout(() => {
        this.setState({showError: false})
      }, 2000)
    }
    if (!userName) {
      this.setState({
        showError: true,
        errorMsg: '账号不能为空！'
      })
      Timer = window.setTimeout(() => {
        this.setState({showError: false})
      }, 2000)
    }

    const values = { 'UserName': userName, 'Password': password }
    if (userName && password && this.state.captchaStatus) {
      auth.authenticate(values, result => {
        if (result) {
          this.setState({ showError: false, redirectToReferrer: result })
        } else {
          this.setState({ showError: true, errorMsg: '账号或密码错误，登录失败！请重试！' })
        }
      })
    }
  }

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit()
    }
  }

  refreshCaptcha = () => {
    Client.getCaptcha(result => {
      this.setState({
        captchaSrc: result.object.img.fileContents,
        code: result.object.code
      })
      this.refs.hiddenInput.value = result.object.code
    })
  }

  captchaBlur = () => {
    if (this.refs.captcha.value) {
      Client.isCaptcha(this.refs.captcha.value, this.state.code, result => {
        if (result) {
          this.setState({
            showError: false,
            captchaStatus: true
          })
        } else {
          this.setState({
            showError: true,
            errorMsg: '验证码错误',
            captchaStatus: false
          })
          Timer = window.setTimeout(() => {
            this.setState({showError: false})
          }, 2000)
        }
      })
    }
  }

  componentDidMount() {
    this.refs.loginbtn.addEventListener('click', this.handleSubmit)
    this.refreshCaptcha()
    // 全屏
    // var docElm = document.documentElement
    // if (docElm.requestFullscreen) {
    //   docElm.requestFullscreen()
    // } else if (docElm.mozRequestFullScreen) {
    //   docElm.mozRequestFullScreen()
    // } else if (docElm.webkitRequestFullscreen) {
    //   docElm.webkitRequestFullscreen()
    // } else if (docElm.msRequestFullscreen) {
    //   docElm.msRequestFullscreen()
    // }
  }

  componentWillUnmount() {
    window.clearTimeout(Timer)
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer, showError, captchaSrc, errorMsg } = this.state
    if (redirectToReferrer) {
      return (
        <Redirect push to={from} />
      )
    }
    return (
      <div className='login'>
        <div className='form-wrapper'>
          <div className='rowself name'>
            <div className='col-3'><img src={require('./img/account.png')} alt='' /></div>
            <div className='col-7'><input type='text' ref='name' tabIndex={1} placeholder='请输入账号' /></div>
          </div>

          <div className='rowself password'>
            <div className='col-3'><img src={require('./img/password.png')} alt='' /></div>
            <div className='col-7'><input type='password' ref='pwd' tabIndex={2} placeholder='请输入密码' /></div>
          </div>

          <div className='rowself captcha'>
            <div className='col-3'><img src={require('./img/captcha.png')} alt='' /></div>
            <div className='col-7 captcha'>
              <input type='hidden' ref='hiddenInput' />
              <input type='text' ref='captcha' onBlur={this.captchaBlur} maxLength='4' tabIndex={3} placeholder='验证码' />
              <div className='captcha-img'><img src={'data:image/png;base64,' + captchaSrc} alt='' onClick={this.refreshCaptcha} /></div>
            </div>
          </div>

          <div className='login-btn'>
            <img src={require('./img/login-submit.png')} alt='' ref='loginbtn' tabIndex={4} onKeyDown={this.handleEnter} />
          </div>
        </div>
        <Toast className='login-toast' icon='warn' show={showError}>{errorMsg}</Toast>
      </div>
    )
  }
}