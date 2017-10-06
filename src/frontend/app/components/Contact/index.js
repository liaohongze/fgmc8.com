import React, { Component } from 'react'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import './Contact.scss'

export default class Contact extends Component {
  state = {
    loading: false,
    serverAccount: null
  }

  componentDidMount() {
    this.setState({ loading: true })
    Client.getAbout('wechat', auth.getToken(), result => {
      if (!result.errored) {
        this.setState({
          loading: false,
          serverAccount: result.object
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  render() {
    const { loading, serverAccount } = this.state
    return (
      <div className='contact toolbar-page' ref='contactBox'>
        <Toolbar link='/' title='联系我们' />
        <div className='contact-content toolbar-page-content'>
          <div className='contact-item'>
            <div className='item-icon'><img src={require('./img/wechat.jpg')} alt='' /></div>
            <div className='right-side'>
              <span>微信客服</span>
              <span>
                {
                  loading
                    ? '加载中...'
                    : (
                      serverAccount ? serverAccount.title : '暂无数据'
                    )
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}