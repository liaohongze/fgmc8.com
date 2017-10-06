import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import SellItem from './SellItem'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import './SellRecord.scss'

let ID, USERNAME

export default class SellRecord extends Component {
  state = {
    totalPage: 1,
    pageSize: 4,
    activePage: 1,
    loading: false,
    record: []
  }

  refreshData = (page, size) => {
    this.setState({ loading: true })
    Client.getSellRecord(USERNAME, page, size, auth.getToken(), result => {
      if (!result.errored) {
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
    if (this.refs.sellRecord.scrollTop + this.refs.sellRecord.clientHeight === this.refs.sellRecord.scrollHeight) {
      if (this.state.activePage <= this.state.totalPage) {
        this.refreshData(this.state.activePage, this.state.pageSize)
      }
    }
  }

  orderAction = (location, status, tranId) => {
    let newArr = this.state.record.slice()
    newArr[location].status = status === 'Cancel' ? '交易取消' : '交易完成'

    let values = {
      'tranId': tranId,
      'userId': ID,
      'status': status
    }

    Client.transactionsAction(values, auth.getToken(), actionResult => {
      if (!actionResult.errored) {
        this.setState({ record: newArr })
      }
    })
  }

  renderRecord = (item, index) => {
    return <SellItem key={index} location={index} record={item} onClick={this.orderAction} />
  }

  componentWillMount() {
    ID = currentUser().id
    USERNAME = currentUser().name
  }

  componentDidMount() {
    this.refs.sellRecord.addEventListener('scroll', this.arrivedBottom)
    this.refreshData(this.state.activePage, this.state.pageSize)
  }

  componentWillUnmount() {
    this.refs.sellRecord.removeEventListener('scroll', this.arrivedBottom)
  }

  render() {
    const { loading, record } = this.state
    return (
      <div className='trade-sell-record toolbar-page' ref='sellRecord'>
        <Toolbar link='/trade' title='出售记录' />
        <div className='trade-sell-record-content toolbar-page-content'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='spinner' spin size='lg' /></div>
              : (
                record.length === 0
                  ? <NoMore />
                  : (
                    record.map(this.renderRecord)
                  )
              )
          }
        </div>
      </div>
    )
  }
}