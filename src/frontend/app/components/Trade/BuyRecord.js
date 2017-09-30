import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import BuyItem from './BuyItem'
import './BuyRecord.scss'

let USERNAME

export default class BuyRecord extends Component {
  state = {
    totalPage: 1,
    pageSize: 4,
    activePage: 1,
    loading: false,
    record: []
  }

  refreshData = (page, size) => {
    this.setState({ loading: true })
    Client.getBuyRecord(USERNAME, page, size, auth.getToken(), result => {
      if (!result.errored && this.refs.buyRecord) {
        this.setState({
          loading: false,
          totalPage: Math.ceil(result.object.total / this.state.pageSize),
          record: this.state.record.concat(result.object.list),
          activePage: this.state.activePage + 1
        })
      }
    })
  }

  arrivedBottom = () => {
    if (this.refs.buyRecord.scrollTop + this.refs.buyRecord.clientHeight === this.refs.buyRecord.scrollHeight) {
      if (this.state.activePage <= this.state.totalPage) {
        this.refreshData(this.state.activePage, this.state.pageSize)
      }
    }
  }

  componentWillMount() {
    USERNAME = currentUser().name
  }

  componentDidMount() {
    this.refs.buyRecord.addEventListener('scroll', this.arrivedBottom)
    this.refreshData(this.state.activePage, this.state.pageSize)
  }

  componentWillUnmount() {
    this.refs.buyRecord.removeEventListener('scroll', this.arrivedBottom)
  }

  render() {
    const { loading, record } = this.state
    return (
      <div className='trade-buyRecord toolbar-page' ref='buyRecord'>
        <Toolbar link='/trade' title='购买记录' />
        <div className='trade-buyRecord-content toolbar-page-content'>
          {
            record.length === 0
              ? (loading ? null : <NoMore />)
              : (
                record.map((item, index) => {
                  return <BuyItem key={index} buyitem={item} />
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