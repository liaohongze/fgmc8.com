import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { auth } from '../../common/Auth'
import { form, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap'
import './Login.scss'

export default class Login extends Component {
  static propTypes = {
    location: PropTypes.object
  }

  state = {
    usernameIsEmpty: false,
    passwordIsEmpty: false,
    redirectToReferrer: false,
    loginFault: false
  }

  componentDidMount () {
    this.refs.submitbtn.addEventListener('click', this.handleSubmit)
  }

  handleSubmit = () => {
    const userName = this.userName.value
    const password = this.password.value
    if (userName.length === 0) {
      this.setState({
        usernameIsEmpty: true
      })
    } else {
      this.setState({
        usernameIsEmpty: false
      })
    }
    if (password.length === 0) {
      this.setState({
        passwordIsEmpty: true
      })
    } else {
      this.setState({
        passwordIsEmpty: false
      })
    }
    if (userName.length !== 0 && password.length !== 0) {
      const values = { 'UserName': userName, 'password': password }
      auth.authenticate(values, (result) => {
        if (result) {
          if (this.refs.loginBox) { this.setState({ redirectToReferrer: result }) }
        } else {
          if (this.refs.loginBox) { this.setState({ loginFault: true }) }
        }
      })
    }
  }

  handleChange = () => {
    if (this.userName.value.length !== 0) {
      this.setState({
        usernameIsEmpty: false
      })
    }
    if (this.password.value.length !== 0) {
      this.setState({
        passwordIsEmpty: false
      })
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/home' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer) {
      return (
        <Redirect push to={from} />
      )
    }
    return (
      <div className='login-bg' ref='loginBox'>
        <div className='login-panel'>
          <h2 className='logo'>管理系统</h2>
          <form onSubmit={this.handleSubmit}>
            <FormGroup
              controlId='userName'
              validationState={this.state.usernameIsEmpty ? 'error' : null}
            >
              <FormControl
                type='text'
                placeholder='用户名'
                onChange={this.handleChange}
                inputRef={ref => { this.userName = ref }}
              />
              <FormControl.Feedback />
              {this.state.usernameIsEmpty ? <HelpBlock>用户名不能为空!</HelpBlock> : null}
            </FormGroup>
            <FormGroup
              controlId='password'
              validationState={this.state.passwordIsEmpty ? 'error' : null}
            >
              <FormControl
                type='password'
                placeholder='密码'
                onChange={this.handleChange}
                inputRef={ref => { this.password = ref }}
              />
              <FormControl.Feedback />
              {
                this.state.passwordIsEmpty ? <HelpBlock>密码不能为空!</HelpBlock> : null
              }
            </FormGroup>
          </form>
          <Alert bsStyle='danger' style={{ display: this.state.loginFault ? null : 'none' }}>
            密码或账号错误！请重试。
          </Alert>
          <div className='submit-btn' ref='submitbtn'>登录</div>
        </div>
        <p>
          Copyright &copy; 2017 FuGuiMuChang.
        </p>
      </div>
    )
  }
}