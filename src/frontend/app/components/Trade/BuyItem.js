import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../utils/tools'
import './BuyItem.scss'

export default class BuyItem extends PureComponent {
  static propTypes = {
    buyitem: PropTypes.object.isRequired
  }

  render() {
    const { buyitem } = this.props
    return (
      <div className='buy-item'>
        <div className='buy-item-header'>
          <span className='trade-statu'>{buyitem.status}</span>
          <span className='trade-data'>{formatDate(buyitem.created, 'YYYY-MM-DD HH:mm:ss')}</span>
        </div>
        <div className='buy-item-content'>
          <div className='info-row'>
            <div className='info-box'>
              <strong>{buyitem.amount}</strong>
              <p>购买数量</p>
            </div>
            <div className='info-box'>
              <strong>{buyitem.amount}</strong>
              <p>实际到账</p>
            </div>
          </div>
          <div className='info-row'>
            <div className='info-box'>
              <strong>{buyitem.seller}</strong>
              <p>卖家账号</p>
            </div>
            <div className='info-box'>
              <strong>{buyitem.sellerMobile}</strong>
              <p>卖家手机</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}