import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import WithdrawItem from './WithdrawItem'
import './WithdrawRecord.scss'

let ID

export default class WithdrawRecord extends Component {
  state = {
    totalPage: 1,
    pageSize: 4,
    activePage: 1,
    loading: false,
    records: []
  }

  refreshData = (page, size) => {
    this.setState({ loading: true })
    Client.withdrawsRecord(ID, page, size, result => {
      if (!result.errored && this.refs.withdrawRecord) {
        this.setState({
          loading: false,
          records: this.state.records.concat(result.object.list),
          totalPage: Math.ceil(result.object.total / this.state.pageSize),
          activePage: this.state.activePage + 1
        })
      }
    })
  }

  arrivedBottom = () => {
    if (this.refs.withdrawRecord.scrollTop + this.refs.withdrawRecord.clientHeight === this.refs.withdrawRecord.scrollHeight) {
      if (this.state.activePage <= this.state.totalPage) {
        this.refreshData(this.state.activePage, this.state.pageSize)
      }
    }
  }

  renderRecord = (record, index) => {
    return <WithdrawItem key={index} record={record} />
  }

  componentWillMount() {
    ID = auth.getCurrentUser().id
  }

  componentDidMount() {
    this.refs.withdrawRecord.addEventListener('scroll', this.arrivedBottom)
    this.refreshData(this.state.activePage, this.state.pageSize)
  }

  componentWillUnmount() {
    this.refs.withdrawRecord.removeEventListener('scroll', this.arrivedBottom)
  }

  render() {
    const { loading, records } = this.state
    return (
      <div className='withdraw-record toolbar-page' ref='withdrawRecord'>
        <Toolbar link='/trade' title='提现记录' />
        <div className='withdraw-record-content toolbar-page-content'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='lg' /></div>
              : (
                records.length === 0
                  ? <NoMore />
                  : (
                    records.map(this.renderRecord)
                  )
              )
          }
        </div>
      </div>
    )
  }
}