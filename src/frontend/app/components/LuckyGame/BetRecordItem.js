import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../utils/tools'
// import './BuyItem.scss'

export default class BuyItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired
  }

  render() {
    const { item } = this.props
    return (
      <div className='buy-item'>
        <div className='buy-item-header'>
          <span className='trade-statu'>第{item.pn}期</span>
          <span className='trade-data'>{formatDate(item.created, 'YYYY-MM-DD HH:mm:ss')}</span>
        </div>
        <div className='buy-item-content'>
          <div className='info-row'>
            <div className='info-box'>
              <strong>{item.openName}</strong>
              <p>开奖</p>
            </div>
            <div className='info-box'>
              <strong>{item.betName}</strong>
              <p>押注</p>
            </div>
          </div>
          <div className='info-row'>
            <div className='info-box'>
              <strong>{item.amount}</strong>
              <p>下注</p>
            </div>
            <div className='info-box'>
              <strong>{item.income}</strong>
              <p>收益</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}