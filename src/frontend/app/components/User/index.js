import React, { Component } from 'react'
import { Toast } from 'react-weui'
import Client from '../../common/Client'
import { auth } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import './User.scss'

let ID

export default class User extends Component {
  state = {
    timer: null,
    userInfo: [],
    nickName: '',
    changeSuccess: false,
    nickNameIsError: false,
    nickNameErrorInfo: ''
  }

  handleSubmit = () => {
    if (this.refs.nickName.value.length !== 0) {
      Client.editUser({ 'nickName': this.refs.nickName.value }, ID, result => {
        if (this.refs.updateuser) {
          this.setState({ changeSuccess: true })
          this.state.timer = setTimeout(() => {
            this.setState({ changeSuccess: false })
          }, 2000)
        }
      })
    }
  }

  nickChange = () => {
    if (this.refs.nickName.value.length !== 0) {
      Client.nicknameExist(this.refs.nickName.value, result => {
        if (!result.errored && this.refs.updateuser) {
          if (result.object) {
            this.setState({ nickNameIsError: true, nickNameErrorInfo: '该昵称已被使用！' })
          } else {
            this.setState({ nickNameIsError: false })
          }
        }
      })
    }
  }

  componentWillMount() {
    ID = auth.getCurrentUser().id
  }

  componentDidMount() {
    Client.getUser(ID, (result) => {
      if (!result.errored && this.refs.updateuser) {
        this.setState({
          userInfo: result.object,
          nickName: result.object.nickName
        })
        this.refs.nickName.value = result.object.nickName || ''
      }
    })
  }

  componentWillUnMount() {
    clearTimeout(this.state.timer)
  }

  render() {
    const { userInfo, changeSuccess, nickNameIsError, nickNameErrorInfo } = this.state
    return (
      <div className='updateuser toolbar-page' ref='updateuser'>
        <Toolbar link='/' title='修改个人资料' />
        <div className='updateuser-content toolbar-page-content'>
          <div className={nickNameIsError ? 'input-wrapper validata-error' : 'input-wrapper'}>
            <div className='item-title label'>昵称</div>
            <input type='text' ref='nickName' onChange={this.nickChange} />
          </div>
          {nickNameIsError ? <div className='validata-info'>{nickNameErrorInfo}</div> : null}

          <div className='item-content'>
            <div className='item-title label'>账号</div>
            <input type='text' value={userInfo.userName || ''} disabled />
          </div>
          <div className='item-content'>
            <div className='item-title label'>手机号码</div>
            <input type='text' value={userInfo.mobile || ''} disabled />
          </div>
          <div className='item-content'>
            <div className='item-title label'>微信号</div>
            <input type='text' value={userInfo.wechat || ''} disabled />
          </div>
          <div className='item-content'>
            <div className='item-title label'>支付宝</div>
            <input type='text' value={userInfo.alipay || ''} disabled />
          </div>
        </div>
        <div className='submit-btn'>
          <button onClick={this.handleSubmit}>保存</button>
        </div>
        <Toast icon='success-no-circle' show={changeSuccess}>修改昵称成功</Toast>
      </div>
    )
  }
}