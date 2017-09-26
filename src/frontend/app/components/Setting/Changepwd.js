import React, { Component } from 'react'
import { Toast } from 'react-weui'
import Client from '../../common/Client'
import { auth } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import './Changepwd.scss'

let ID, USERNAME

export default class Changepwd extends Component {
  state = {
    timer: null,
    changeSuccess: false,
    changeInfo: '',
    oldpwdIsError: false,
    oldpwdErrorInfo: '',
    newpwdIsEmpty: false,
    confirmpwdIsError: false,
    confirmpwdErrorInfo: ''
  }

  changePwd = () => {
    if (this.refs.oldpwd.value.length === 0) { this.setState({ oldpwdIsError: true, oldpwdErrorInfo: '原密码不能为空！' }) }
    if (this.refs.newpwd.value.length === 0) { this.setState({ newpwdIsEmpty: true }) }
    if (this.refs.confirmpwd.value.length === 0) { this.setState({ confirmpwdIsError: true, confirmpwdErrorInfo: '确认密码不能为空！' }) }

    if (this.refs.oldpwd.value.length !== 0 && this.refs.newpwd.value.length !== 0 && this.refs.confirmpwd.value.length !== 0) {
      if (this.refs.newpwd.value === this.refs.confirmpwd.value) {
        let values = { 'userName': USERNAME, 'password': this.refs.newpwd.value, 'oldPassword': this.refs.oldpwd.value }
        Client.changePassword(values, ID, changepwdResult => {
          if (!changepwdResult.errored && this.refs.changepwdBox) {
            if (changepwdResult.object.passwordResult === 100) {
              this.setState({
                changeSuccess: true,
                changeInfo: changepwdResult.errorMessage
              })
              this.refs.oldpwd.value = null
              this.refs.newpwd.value = null
              this.refs.confirmpwd.value = null
              this.state.timer = setTimeout(() => { this.setState({ changeSuccess: false }) }, 2000)
            } else if (changepwdResult.object.passwordResult === 101) {
              this.setState({ oldpwdIsError: true, oldpwdErrorInfo: '原密码错误！' })
            }
          }
        })
      }
    }
  }

  handleChange = () => {
    if (this.refs.oldpwd.value.length !== 0) { this.setState({ oldpwdIsError: false }) }
    if (this.refs.newpwd.value.length !== 0) { this.setState({ newpwdIsEmpty: false }) }
  }

  confirmChange = () => {
    if (this.refs.newpwd.value !== this.refs.confirmpwd.value) {
      this.setState({ confirmpwdIsError: true, confirmpwdErrorInfo: '与新密码不一致！' })
    } else {
      this.setState({ confirmpwdIsError: false })
    }
  }

  componentWillMount() {
    ID = auth.getCurrentUser().id
    USERNAME = auth.getCurrentUser().userName
  }

  componentWillUnMount() {
    clearTimeout(this.state.timer)
  }

  render() {
    const { changeSuccess, changeInfo, oldpwdIsError, oldpwdErrorInfo, newpwdIsEmpty, confirmpwdIsError, confirmpwdErrorInfo } = this.state
    return (
      <div className='changepwd toolbar-page' ref='changepwdBox'>
        <Toolbar link='/setting' title='重置登录密码' />
        <div className='changepwd-content toolbar-page-content'>
          <div className={oldpwdIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <input type='password' ref='oldpwd' placeholder='原登录密码' onChange={this.handleChange} />
          </div>
          {oldpwdIsError ? <div className='validata-info'>{oldpwdErrorInfo}</div> : null}

          <div className={newpwdIsEmpty ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <input type='password' ref='newpwd' placeholder='新登录密码（至少6位）' onChange={this.handleChange} />
          </div>
          {newpwdIsEmpty ? <div className='validata-info'>新密码不能为空！</div> : null}

          <div className={confirmpwdIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <input type='password' ref='confirmpwd' placeholder='确认新登录密码' onChange={this.confirmChange} />
          </div>
          {confirmpwdIsError ? <div className='validata-info'>{confirmpwdErrorInfo}</div> : null}

          <div className='info' style={{ display: changeSuccess ? null : 'none' }}>
            <p>{changeInfo}</p>
          </div>
          <div className='submit-btn'>
            <button onClick={this.changePwd}>确认</button>
          </div>
        </div>
        <Toast icon='success-no-circle' show={changeSuccess}>修改成功</Toast>
      </div>
    )
  }
}