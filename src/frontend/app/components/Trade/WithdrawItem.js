import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../utils/tools'

export default class WithdrawItem extends React.PureComponent {
  static propTypes = {
    record: PropTypes.object.isRequired
  }

  render() {
    const {record} = this.props
    return (
      <div className='record-item'>
        <div className='record-item-row'>
          <div className='record-col record-col-3'>申请日期：</div>
          <div className='record-col record-col-7'>{formatDate(record.created, 'YYYY-MM-DD HH:mm:ss')}</div>
        </div>
        <div className='record-item-row'>
          <div className='record-col record-col-3'>提现金额：</div>
          <div className='record-col record-col-7'>{record.amount}</div>
        </div>
        <div className='record-item-row'>
          <div className='record-col record-col-3'>提现类型：</div>
          <div className='record-col record-col-7'>{record.type}</div>
        </div>
        <div className='record-item-row'>
          <div className='record-col record-col-3'>提现状态：</div>
          <div className='record-col record-col-7'>{record.status}</div>
        </div>
        <div className='record-item-row'>
          <div className='record-col record-col-3'>审核日期：</div>
          <div className='record-col record-col-7'>{formatDate(record.reviewTime, 'YYYY-MM-DD HH:mm:ss')}</div>
        </div>
      </div>
    )
  }
}