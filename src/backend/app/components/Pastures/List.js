import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Panel, Pagination, Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
import { formatDate } from '../../utils/tools'
import './List.scss'

export default class List extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: false,
    pasturesData: [],
    totalPage: 1,
    activePage: 1,
    pageSize: 10
  }

  refleshData = (page, size) => {
    this.setState({ loading: true })
    Client.getPastures(page, size, auth.getToken(), result => {
      if (!result.errored && this.refs.pasturesList) {
        this.setState({
          loading: false,
          pasturesData: result.object.list,
          totalPage: Math.ceil(result.object.total / this.state.pageSize)
        })
      }
    })
  }

  handleSelect = (eventKey) => {
    this.setState({
      activePage: eventKey
    })
    this.refleshData(eventKey, this.state.pageSize)
  }

  componentDidMount() {
    this.refleshData(this.state.activePage, this.state.pageSize)
  }

  render() {
    const { loading, pasturesData, totalPage, activePage } = this.state

    return (
      <div className='pastures-list' ref='pasturesList'>
        <Form inline className='search-bar'>
          <FormGroup>
            <FormControl type='text' placeholder='搜索牧场' />
          </FormGroup>
          <Button bsStyle='info'>搜索</Button>
        </Form>
        <Panel collapsible defaultExpanded header='所有牧场' bsStyle='info'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='2x' /></div>
              : (
                pasturesData.length === 0
                  ? <div className='no-result'>暂无数据</div>
                  : (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>用户</th>
                          <th>牧场</th>
                          <th>价格</th>
                          <th>数量</th>
                          <th>创建时间</th>
                          <th>查看</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          pasturesData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <Link
                                    className='user-pastures-btn'
                                    to={`${this.props.match.url}/user?userName=${item.userName}&id=${item.customerId}`}
                                  >
                                    {item.userName}
                                  </Link>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{formatDate(item.created, 'YYYY-MM-DD hh:mm:ss')}</td>
                                <td>
                                  <Link className='pastures-incomes-btn' to={`${this.props.match.url}/incomes?userName=${item.userName}&id=${item.customerId}`}>收获记录</Link>
                                  <Link className='pastures-raises-btn' to={`${this.props.match.url}/raises?userName=${item.userName}&id=${item.customerId}`}>增养记录</Link>
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
