import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { auth } from '../../common/Auth'
import {getCaptcha} from '../../utils/tools'
import './Login.scss'

export default class Login extends Component {
  static propTypes = {
    location: PropTypes.object
  }

  state = {
    redirectToReferrer: false,
    loginFault: false,
    errorMsg: '',
    expression: '',
    captchaResult: ''
  }

  handleSubmit = () => {
    const userName = this.refs.name.value
    const password = this.refs.pwd.value
    const values = { 'UserName': userName, 'password': password }
    auth.authenticate(values, result => {
      if (result) {
        this.setState({ loginFault: false, redirectToReferrer: result })
      } else {
        this.setState({ loginFault: true, errorMsg: '账号或密码错误，登录失败！请重试！' })
      }
    })
  }

  handleEnter = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit()
    }
  }

  handleCaptcha = () => {
    const captchaData = getCaptcha()
    console.log(captchaData)
    this.setState({
      expression: captchaData.expression,
      captchaResult: captchaData.result
    })
  }

  handleChange = () => {
    if (this.refs.captcha.value === this.state.captchaResult.toString()) {
      this.setState({ loginFault: false })
    } else {
      this.setState({ loginFault: true, errorMsg: '验证码错误！请重试！' })
    }
  }

  componentDidMount () {
    this.refs.loginbtn.addEventListener('click', this.handleSubmit)
    this.handleCaptcha()
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

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer, loginFault } = this.state
    if (redirectToReferrer) {
      return (
        <Redirect push to={from} />
      )
    }
    return (
      <div className='login'>
        <div className='title'>富贵牧场</div>
        <div className='form-wrapper'>
          <div className='rowself name'>
            <div className='col-3'><img src={require('./img/account.png')} alt='' /></div>
            <div className='col-7'><input type='text' ref='name' tabIndex={1} /></div>
          </div>

          <div className='rowself password'>
            <div className='col-3'><img src={require('./img/password.png')} alt='' /></div>
            <div className='col-7'><input type='password' ref='pwd' tabIndex={2} /></div>
          </div>

          <div className='rowself captcha'>
            <div className='col-3'><img src={require('./img/captcha.png')} alt='' /></div>
            <div className='col-7 captcha'>
              <input type='text' ref='captcha' onChange={this.handleChange} tabIndex={3} />
              <div className='captcha-img' onClick={this.handleCaptcha}>{this.state.expression}</div>
            </div>
          </div>

          <div className='rowself error-info'>
            <div className='col-3' />
            <div className='col-7' style={{ height: loginFault ? '44px' : '0' }}>{this.state.errorMsg}</div>
          </div>

          <div className='login-btn'>
            <img src={require('./img/login-submit.png')} alt='' ref='loginbtn' tabIndex={4} onKeyDown={this.handleEnter} />
          </div>
        </div>
      </div>
    )
  }
}