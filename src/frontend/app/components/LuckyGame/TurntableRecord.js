import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth } from '../../common/Auth'
import { formatDate } from '../../utils/tools'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import RecordItem from './RecordItem'

let ID

export default class TurntableRecord extends Component {
  state = {
    totalPage: 1,
    pageSize: 7,
    activePage: 1,
    loading: false,
    data: []
  }

  refreshData = (page, size) => {
    this.setState({ loading: true })
    Client.getTurntable(ID, page, size, result => {
      if (!result.errored && this.refs.turntableRecord) {
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
    if (this.refs.turntableRecord.scrollTop + this.refs.turntableRecord.clientHeight === this.refs.turntableRecord.scrollHeight) {
      if (this.state.activePage <= this.state.totalPage) {
        this.refreshData(this.state.activePage, this.state.pageSize)
      }
    }
  }

  componentWillMount() {
    ID = auth.getCurrentUser().id
  }

  componentDidMount() {
    this.refs.turntableRecord.addEventListener('scroll', this.arrivedBottom)
    this.refreshData(this.state.activePage, this.state.pageSize)
  }

  componentWillUnmount() {
    this.refs.turntableRecord.removeEventListener('scroll', this.arrivedBottom)
  }

  render() {
    const { loading, data } = this.state
    return (
      <div className='turntable-record growup-record toolbar-page' ref='turntableRecord'>
        <Toolbar link='/luckygame' title='大转盘记录' />
        <div className='record-list toolbar-page-content'>
          {
            data.length === 0
              ? <NoMore />
              : (
                data.map((item, index) => {
                  return <RecordItem key={index} profit={item.amount} pasture={item.name} date={formatDate(item.created, 'YYYY-MM-DD HH:mm:ss')} />
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