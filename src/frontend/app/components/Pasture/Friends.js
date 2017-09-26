import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth } from '../../common/Auth'
import FriendItem from './FriendItem'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import './Friends.scss'

let USERNAME

export default class Friends extends Component {
  state = {
    loading: false,
    data: []
  }

  componentWillMount() {
    USERNAME = auth.getCurrentUser().userName
  }

  componentDidMount() {
    this.setState({ loading: true })
    Client.getRecommend(USERNAME, result => {
      if (!result.errored && this.refs.friendsBox) {
        this.setState({
          loading: false,
          data: result.object
        })
      }
    })
  }

  render() {
    const { loading, data } = this.state
    return (
      <div className='friends toolbar-page' ref='friendsBox'>
        <Toolbar link='/pasture' title='直推好友' />
        <div className='friends-content toolbar-page-content'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='lg' /></div>
              : (
                data.length === 0
                  ? <NoMore />
                  : (
                    data.map((item, index) => {
                      return (
                        <FriendItem key={index} userName={item.userName} nickName={item.nickName} grade={item.grade} mobile={item.mobile} />
                      )
                    })
                  )
              )
          }
        </div>
      </div>
    )
  }
}