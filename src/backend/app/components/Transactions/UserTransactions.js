import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { formatDate } from '../../utils/tools'
import { Table, Panel, Pagination, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import './UserTransactions.scss'

export default class UserTransactions extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: false,
    data: [],
    activePage: 1,
    totalPage: 1,
    pageSize: 10
  }

  refreshData = (page, size) => {
    this.setState({ loading: true })
    const { match: { params: { name } } } = this.props
    Client.getCustomerByName(name, result => {
      if (!result.errored) {
        Client.getUserTransactions(result.object.id, page, size, transResult => {
          if (!transResult.errored) {
            this.setState({
              loading: false,
              data: transResult.object.list,
              totalPage: Math.ceil(transResult.object.total / this.state.pageSize)
            })
          }
        })
      }
    })
  }

  componentDidMount() {
    this.refreshData(this.state.activePage, this.state.pageSize)
  }

  handleSelect = (eventKey) => {
    this.setState({
      activePage: eventKey
    })
    this.refreshData(this.state.activePage, this.state.pageSize)
  }

  render() {
    const { loading, data, activePage, totalPage } = this.state
    const { match: { params: { name } } } = this.props
    return (
      <div className='user-transactions-list'>
        <Form inline className='search-bar'>
          <FormGroup>
            <FormControl type='text' placeholder='搜索交易' />
          </FormGroup>
          <Button bsStyle='info'>搜索</Button>
        </Form>
        <Panel collapsible defaultExpanded header={name + '的交易'} bsStyle='info'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='2x' /></div>
              : (
                data.length === 0
                  ? <div className='no-result'>暂无数据</div>
                  : (
                    <div>
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>买家</th>
                            <th>交易金额</th>
                            <th>买家电话</th>
                            <th>交易日期</th>
                            <th>结束日期</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            data.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.buyer}</td>
                                  <td>{item.amount}</td>
                                  <td>{item.buyerMobile}</td>
                                  <td>{formatDate(item.created, 'YYYY-MM-DD HH:mm:ss')}</td>
                                  <td>{formatDate(item.endTime, 'YYYY-MM-DD HH:mm:ss')}</td>
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>

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
                    </div>
                  )
              )
          }
        </Panel>
      </div>
    )
  }
}