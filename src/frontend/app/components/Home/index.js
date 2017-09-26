import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth } from '../../common/Auth'
import Item from './Item'
import Navbar from './Navbar'
import './Home.scss'

let USERNAME, ID

export default class Home extends Component {
  state = {
    userInfo: '',
    friends: 0
  }

  componentWillMount() {
    ID = auth.getCurrentUser().id
    USERNAME = auth.getCurrentUser().userName
  }

  componentDidMount() {
    const userInfo = Client.getUser(ID, (result) => { return result })
    const recomUsers = Client.getRecommend(USERNAME, (result) => { return result })
    Promise.all([userInfo, recomUsers]).then(results => {
      if (this.refs.homeBox) {
        this.setState({
          userInfo: results[0].object,
          friends: results[1].object.length
        })
      }
    })
  }

  render() {
    const { userInfo, friends } = this.state
    return (
      <div className='home' ref='homeBox'>
        <div className='home-content'>
          <div className='banner'><img src={require('./img/banner.jpg')} alt='' /></div>
          <div className='list-block media-list'>
            <ul>
              <li>
                <Link to='/user' className='item-link item-content'>
                  <div className='item-media'>
                    <img src={require('./img/default_user.gif')} className='avadar' />
                  </div>
                  <div className='item-inner'>
                    <div className='item-title-row'>
                      <div className='item-title'>{userInfo.userName}（{userInfo.nickName}）</div>
                      <div className='item-arrow'><FontAwesome className='super-crazy-colors' name='angle-right' size='lg' /></div>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div className='game-data'>
            <div className='category'>
              <strong>{userInfo.stock}</strong>
              <p>仓库</p>
            </div>
            <div className='friend'>
              <strong>{userInfo.direct}({friends})</strong>
              <p>直推好友</p>
            </div>
            <div className='production'>
              <strong>{userInfo.invest}</strong>
              <p>生产中</p>
            </div>
            <div className='income'>
              <strong>{userInfo.income}</strong>
              <p>总收益</p>
            </div>
          </div>

          <div className='application'>
            <p>应用</p>
            <div className='item-wrapper'>
              <div className='item-row'>
                <Item link='/news' img='/img/news.png' title='公告' subTitle='了解最新动态' />
                <Item link='/rule' img='/img/play.png' title='游戏玩法' subTitle='轻松融入游戏' />
              </div>
              <div className='item-row'>
                <Item link='/pasture' img='/img/farm.png' title='牧场管理' subTitle='边玩边赚钱' />
                <Item link='/growup' img='/img/growup.png' title='养殖记录' subTitle='记录每天收益' />
              </div>
              <div className='item-row'>
                <Item link='/trade' img='/img/trade.png' title='交易中心' subTitle='交易牛群' />
                <Item link='/luckygame' img='/img/game.png' title='碰碰运气' subTitle='大转盘' />
              </div>
              <div className='item-row'>
                <Item link='/contact' img='/img/service.png' title='联系我们' subTitle='你的专属客服' />
                <Item link='/setting' img='/img/settings.png' title='设置' subTitle='保护账户安全' />
              </div>
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    )
  }
}