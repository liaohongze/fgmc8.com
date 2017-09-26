import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table, Panel, Pagination, Form, FormGroup, FormControl } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth } from '../../common/Auth'
import ListItem from './ListItem'
import './User.scss'

let ID = auth.getCurrentUser().id

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
    Client.getCustomers(page, size, result => {
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

  deleteUser = (id) => {
    Client.deleteCustomer(id, result => {
      if (!result.errored) {
        this.setState(prevState => {
          return { data: prevState.data.filter(item => item.id !== id) }
        })
      }
    })
  }

  lockCustomer = (id, location) => {
    let newArr = this.state.data.slice()
    newArr[location].lockoutEnabled = !newArr[location].lockoutEnabled
    Client.lockout(ID, { 'customerId': id }, result => {
      if (!result.errored) {
        this.setState({ data: newArr })
      }
    })
  }

  handleSelect = (eventKey) => {
    this.setState({
      activePage: eventKey
    })
    this.refleshData(eventKey, this.state.pageSize)
  }

  renderUser = (item, index) => {
    return <ListItem key={index} location={index} user={item} delete={this.deleteUser} lock={this.lockCustomer} itemMatch={this.props.match} />
  }

  render() {
    const { loading, data, activePage, totalPage } = this.state

    return (
      <div className='user'>
        <Form inline className='search-bar'>
          <FormGroup>
            <FormControl type='text' placeholder='搜索用户' />
          </FormGroup>
          <Button bsStyle='info'>搜索</Button>
        </Form>
        <Panel collapsible defaultExpanded header='用户列表' bsStyle='info'>
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
                          <th>姓名</th>
                          <th>昵称</th>
                          <th>手机号</th>
                          <th>推荐人</th>
                          <th>微信</th>
                          <th>支付宝</th>
                          <th>创建时间</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.map(this.renderUser)
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