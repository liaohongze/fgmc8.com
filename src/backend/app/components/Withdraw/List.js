import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Panel, Table, Pagination } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import ListItem from './ListItem'
import './List.scss'

export default class List extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    totalPage: 1,
    activePage: 1,
    pageSize: 10,
    loading: false,
    withdrawlData: []
  }

  refreshData = (page, size) => {
    this.setState({ loading: true })
    Client.getWithdraw(page, size, result => {
      if (!result.errored && this.refs.withdrawRecord) {
        this.setState({
          loading: false,
          totalPage: Math.ceil(result.object.total / size),
          withdrawlData: result.object.list
        })
      }
    })
  }

  confirm = (id, cutomerId, location) => {
    let values = {
      'withdrawId': id,
      'customerId': cutomerId,
      'status': '提现完成'
    }

    Client.confirmWithdraws(values, result => {
      let newArr = this.state.withdrawlData.slice()
      newArr[location].status = '提现完成'
      newArr[location].reviewTime = result.object.reviewTime
      if (!result.errored && this.refs.withdrawRecord) {
        this.setState({ withdrawlData: newArr })
      }
    })
  }

  handleSelect = (eventKey) => {
    this.setState({
      activePage: eventKey
    })
    this.refreshData(eventKey, this.state.pageSize)
  }

  renderWithdraw = (item, index) => {
    return <ListItem key={index} location={index} withdraw={item} confirm={this.confirm} />
  }

  componentDidMount() {
    this.refreshData(this.state.activePage, this.state.pageSize)
  }

  render() {
    const { loading, withdrawlData, totalPage, activePage } = this.state
    return (
      <div className='withdraw-record' ref='withdrawRecord'>
        <Panel collapsible defaultExpanded header='提现记录' bsStyle='info'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='2x' /></div>
              : (
                withdrawlData.length === 0
                  ? <div className='no-result'>暂无数据</div>
                  : (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>申请日期</th>
                          <th>提现金额</th>
                          <th>用户名称</th>
                          <th>账户余额</th>
                          <th>手机号码</th>
                          <th>提现类型</th>
                          <th>提现状态</th>
                          <th>审核日期</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          withdrawlData.map(this.renderWithdraw)
                        }
                      </tbody>
                    </Table>
                  )
              )
          }
          <div className='pagination-wrapper'>
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={totalPage}
              maxButtons={4}
              activePage={activePage}
              onSelect={this.handleSelect} />
          </div>
        </Panel>
      </div>
    )
  }
}