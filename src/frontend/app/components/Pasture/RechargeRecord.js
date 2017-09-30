import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import { formatDate } from '../../utils/tools'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import './RechargeRecord.scss'

let ID

export default class RechargeRecord extends Component {
  state = {
    totalPage: 1,
    pageSize: 4,
    activePage: 1,
    loading: false,
    record: []
  }

  refreshData = (page, size) => {
    this.setState({ loading: true })
    Client.getRecharges(ID, page, size, auth.getToken(), result => {
      if (!result.errored && this.refs.rechargeRecordBox) {
        this.setState({
          loading: false,
          record: this.state.record.concat(result.object.list),
          totalPage: Math.ceil(result.object.total / this.state.pageSize),
          activePage: this.state.activePage + 1
        })
      }
    })
  }

  arrivedBottom = () => {
    if (this.refs.rechargeRecordBox.scrollTop + this.refs.rechargeRecordBox.clientHeight === this.refs.rechargeRecordBox.scrollHeight) {
      if (this.state.activePage <= this.state.totalPage) {
        this.refreshData(this.state.activePage, this.state.pageSize)
      }
    }
  }

  componentWillMount() {
    ID = currentUser().id
  }

  componentDidMount() {
    this.refs.rechargeRecordBox.addEventListener('scroll', this.arrivedBottom)
    this.refreshData(this.state.activePage, this.state.pageSize)
  }

  componentWillUnmount() {
    this.refs.rechargeRecordBox.removeEventListener('scroll', this.arrivedBottom)
  }

  render() {
    const { loading, record } = this.state
    return (
      <div className='recharge-record toolbar-page' ref='rechargeRecordBox'>
        <Toolbar link='/pasture' title='充值记录' action='充值' actionLink='/pasture/recharge' />
        <div className='recharge-record-list toolbar-page-content'>
          {
            record.length === 0
              ? <NoMore />
              : (
                record.map((item, index) => {
                  return (
                    <div className='recharge-item' key={index}>
                      <div className='recharge-item-row'>
                        <div className='recharge-col recharge-col-3'>昵称：</div>
                        <div className='recharge-col recharge-col-7'>{item.name}</div>
                      </div>
                      <div className='recharge-item-row'>
                        <div className='recharge-col recharge-col-3'>充值金额：</div>
                        <div className='recharge-col recharge-col-7'>{item.amount}</div>
                      </div>
                      <div className='recharge-item-row'>
                        <div className='recharge-col recharge-col-3'>支付方式：</div>
                        <div className='recharge-col recharge-col-7'>{item.channel}</div>
                      </div>
                      <div className='recharge-item-row'>
                        <div className='recharge-col recharge-col-3'>状态：</div>
                        <div className='recharge-col recharge-col-7'>{item.status}</div>
                      </div>
                      <div className='recharge-item-row'>
                        <div className='recharge-col recharge-col-3'>充值时间：</div>
                        <div className='recharge-col recharge-col-7'>{formatDate(item.created, 'YYYY-MM-DD')}</div>
                      </div>
                    </div>
                  )
                })
              )
          }
          {
            loading ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='lg' /></div> : null
          }
        </div>
      </div>
    )
  }
}