import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../utils/tools'

export default class SellItem extends React.PureComponent {
  static propTypes = {
    location: PropTypes.number,
    record: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }

  state = {
    status: this.props.record.status
  }

  cancelOrder = () => { this.props.onClick(this.props.location, 'Cancel', this.props.record.id) }
  finishOrder = () => { this.props.onClick(this.props.location, 'Finish', this.props.record.id) }

  componentWillReceiveProps(nextProps) {
    this.setState({status: nextProps.record.status})
  }

  render() {
    const {record} = this.props
    return (
      <div className='record-item'>
        <div className='record-item-row'>
          <div className='record-col record-col-3'>交易日期：</div>
          <div className='record-col record-col-7'>{formatDate(record.created, 'YYYY-MM-DD HH:mm:ss')}</div>
        </div>
        <div className='record-item-row'>
          <div className='record-col record-col-3'>交易数量：</div>
          <div className='record-col record-col-7'>{record.amount}</div>
        </div>
        <div className='record-item-row'>
          <div className='record-col record-col-3'>买家：</div>
          <div className='record-col record-col-7'>{record.buyer}</div>
        </div>
        <div className='record-item-row'>
          <div className='record-col record-col-3'>买家电话：</div>
          <div className='record-col record-col-7'>{record.buyerMobile}</div>
        </div>
        <div className='record-item-row'>
          <div className='record-col record-col-3'>交易状态：</div>
          <div className='record-col record-col-7'>{this.state.status}</div>
        </div>
        <div className='record-item-row' style={{display: this.state.status === '交易中' ? null : 'none'}}>
          <div className='record-col record-col-10'>
            <button
              className='cancelbtn'
              onClick={this.cancelOrder}
            >
            取消订单
            </button>

            <button
              className='finishbtn'
              onClick={this.finishOrder}
            >
            确认订单
            </button>
          </div>
        </div>
      </div>
    )
  }
}