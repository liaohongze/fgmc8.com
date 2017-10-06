import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import RecordItem from './BetRecordItem'

let ID

export default class BetRecord extends Component {
  state = {
    totalPage: 1,
    pageSize: 7,
    activePage: 1,
    loading: false,
    data: []
  }

  refreshData = (page, size) => {
    this.setState({ loading: true })
    Client.getWillageRecord(ID, page, size, auth.getToken(), result => {
      if (!result.errored) {
        this.setState({
          loading: false,
          totalPage: Math.ceil(result.object.total / this.state.pageSize),
          data: this.state.data.concat(result.object.list),
          activePage: this.state.activePage + 1
        })
      }
    })
  }

  arrivedBottom = () => {
    if (this.refs.betRecord.scrollTop + this.refs.betRecord.clientHeight === this.refs.betRecord.scrollHeight) {
      if (this.state.activePage <= this.state.totalPage) {
        this.refreshData(this.state.activePage, this.state.pageSize)
      }
    }
  }

  componentWillMount() {
    ID = currentUser().id
  }

  componentDidMount() {
    this.refs.betRecord.addEventListener('scroll', this.arrivedBottom)
    this.refreshData(this.state.activePage, this.state.pageSize)
  }

  componentWillUnmount() {
    this.refs.betRecord.removeEventListener('scroll', this.arrivedBottom)
  }

  render() {
    const { loading, data } = this.state
    return (
      <div className='turntable-record growup-record toolbar-page' ref='betRecord'>
        <Toolbar link='/luckygame' title='庄和闲记录' />
        <div className='record-list toolbar-page-content'>
          {
            data.length === 0
              ? <NoMore />
              : (
                data.map((item, index) => {
                  return <RecordItem key={index} item={item} />
                })
              )
          }
          {
            loading ? <div className='loading'><FontAwesome className='super-crazy-colors' name='spinner' spin size='lg' /></div> : null
          }
        </div>
      </div>
    )
  }
}