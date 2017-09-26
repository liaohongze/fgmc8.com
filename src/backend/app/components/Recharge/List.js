import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Panel, Pagination, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { formatDate } from '../../utils/tools'
import './List.scss'

export default class List extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: false,
    rechargeData: [],
    totalPage: 1,
    activePage: 1,
    pageSize: 10
  }

  refleshData = (page, size) => {
    this.setState({ loading: true })
    Client.getRecharges(page, size, result => {
      if (!result.errored) {
        this.setState({
          loading: false,
          rechargeData: result.object.list,
          totalPage: Math.ceil(result.object.total / this.state.pageSize)
        })
      }
    })
  }

  componentDidMount() {
    this.refleshData(this.state.activePage, this.state.pageSize)
  }

  handleSelect = (eventKey) => {
    this.setState({
      activePage: eventKey
    })
    this.refleshData(eventKey, this.state.pageSize)
  }

  render() {
    const { loading, rechargeData, activePage, totalPage } = this.state
    const { match } = this.props

    return (
      <div className='recharge-list'>
        <Form inline className='search-bar'>
          <FormGroup>
            <FormControl type='text' placeholder='搜索记录' />
          </FormGroup>
          <Button bsStyle='info'>搜索</Button>
        </Form>
        <Panel collapsible defaultExpanded header='充值记录' bsStyle='info'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='2x' /></div>
              : (
                rechargeData.length === 0
                  ? <div className='no-result'>暂无数据</div>
                  : (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>充值昵称</th>
                          <th>充值金额</th>
                          <th>充值方式</th>
                          <th>申请日期</th>
                          <th>结束日期</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          rechargeData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
                                <td>{item.channel}</td>
                                <td>{formatDate(item.created, 'YYYY-MM-DD HH:mm:ss')}</td>
                                <td>{formatDate(item.endTime, 'YYYY-MM-DD HH:mm:ss')}</td>
                                <td>
                                  {item.endTime ? <span>充值完成</span> : <Link className='user-recharge-btn' to={`${match.url}/user?id=${item.id}`}>用户充值</Link>}
                                </td>
                              </tr>
                            )
                          })
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