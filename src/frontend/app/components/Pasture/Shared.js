import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import { Base64Encode } from '../../utils/basecode'
import './Shared.scss'

let USERNAME

export default class Shared extends Component {
  state = {
    qrCode: ''
  }

  componentWillMount() {
    USERNAME = currentUser().name
  }

  componentDidMount() {
    Client.getQRCode(USERNAME, auth.getToken(), result => {
      if (!result.errored) {
        this.setState({ qrCode: result.object })
      }
    })
  }

  render() {
    const { qrCode } = this.state
    const userName = Base64Encode(USERNAME)
    return (
      <div className='shared toolbar-page'>
        <Toolbar link='/pasture' title='分享给好友' />
        <div className='shared-content toolbar-page-content'>
          <p>推广链接：</p>
          <p>{`http://` + location.hostname + `/signup?rec=${userName}`}</p>
          <p className='open-link'><Link to={`/signup?rec=${userName}`}>打开链接</Link></p>
          <p className='qrcode'>{qrCode ? <img src={qrCode} width='100%' height='100%' alt='' /> : '二维码生成中...'}</p>
        </div>
      </div>
    )
  }
}