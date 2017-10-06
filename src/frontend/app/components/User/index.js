import React, { Component } from 'react'
import { Toast } from 'react-weui'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import QueueAnim from 'rc-queue-anim'
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
      Client.editUser({ 'nickName': this.refs.nickName.value }, ID, auth.getToken(), result => {
        this.setState({ changeSuccess: true })
        this.state.timer = setTimeout(() => {
          this.setState({ changeSuccess: false })
        }, 2000)
      })
    }
  }

  nickChange = () => {
    if (this.refs.nickName.value.length !== 0) {
      Client.nicknameExist(this.refs.nickName.value, auth.getToken(), result => {
        if (!result.errored) {
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
    ID = currentUser().id
  }

  componentDidMount() {
    Client.getUser(ID, auth.getToken(), (result) => {
      if (!result.errored) {
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
          <QueueAnim delay={300} className='queue-simple'>
            <div key='2' className='item-content'>
              <div className='item-title label'>账号</div>
              <input type='text' value={userInfo.userName || ''} disabled />
            </div>

            <div key='3' className='item-content'>
              <div className='item-title label'>手机号码</div>
              <input type='text' value={userInfo.mobile || ''} disabled />
            </div>

            <div key='4' className='item-content'>
              <div className='item-title label'>微信号</div>
              <input type='text' value={userInfo.wechat || ''} disabled />
            </div>

            <div key='5' className='item-content'>
              <div className='item-title label'>支付宝</div>
              <input type='text' value={userInfo.alipay || ''} disabled />
            </div>

            <div key='6' className='submit-btn'>
              <button onClick={this.handleSubmit}>保存</button>
            </div>
          </QueueAnim>
        </div>
        <Toast icon='success-no-circle' show={changeSuccess}>修改昵称成功</Toast>
      </div>
    )
  }
}