import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Panel, Pagination, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import { formatDate } from '../../utils/tools'
import Client from '../../common/Client'
import './List.scss'

export default class List extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: false,
    data: [],
    totalPage: 1,
    activePage: 1,
    pageSize: 10
  }

  refleshData = (page, size) => {
    this.setState({ loading: true })
    Client.getTransactions(page, size, result => {
      if (!result.errored) {
        this.setState({
          loading: false,
          data: result.object.list,
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
    const { loading, data, activePage, totalPage } = this.state

    return (
      <div className='transactions-list'>
        <Form inline className='search-bar'>
          <FormGroup>
            <FormControl type='text' placeholder='搜索交易' />
          </FormGroup>
          <Button bsStyle='info'>搜索</Button>
        </Form>
        <Panel collapsible defaultExpanded header='所有交易' bsStyle='info'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='2x' /></div>
              : (
                data.length === 0
                  ? <div className='no-result'>暂无数据</div>
                  : (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>卖家</th>
                          <th>买家</th>
                          <th>交易金额</th>
                          <th>卖家电话</th>
                          <th>买家电话</th>
                          <th>交易日期</th>
                          <th>结束日期</th>
                          <th>交易状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td><Link className='seller' to={`${this.props.match.url}/` + item.seller}>{item.seller}</Link></td>
                                <td>{item.buyer}</td>
                                <td>{item.amount}</td>
                                <td>{item.sellerMobile}</td>
                                <td>{item.buyerMobile}</td>
                                <td>{formatDate(item.created, 'YYYY-MM-DD HH:mm:ss')}</td>
                                <td>{formatDate(item.endTime, 'YYYY-MM-DD HH:mm:ss')}</td>
                                <td>{item.status}</td>
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