import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Panel, Pagination } from 'react-bootstrap'
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
    data: []
  }

  refreshData = (page, size) => {
    this.setState({ loading: true })
    Client.getAbouts(page, size, result => {
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
    this.refreshData(this.state.activePage, this.state.pageSize)
  }

  deleteAbout = (id) => {
    Client.deleteAbout(id, result => {
      if (!result.errored) {
        this.setState(prevState => {
          return {
            data: prevState.data.filter(item => item.id !== id)
          }
        })
      }
    })
  }

  handleSelect = (eventKey) => {
    this.setState({
      activePage: eventKey
    })
    this.refreshData(eventKey, this.state.pageSize)
  }

  renderAbout = (item, index) => {
    return <ListItem key={index} about={item} delete={this.deleteAbout} itemMatch={this.props.match} />
  }

  render() {
    const { loading, data, activePage, totalPage } = this.state
    return (
      <div className='about-list'>
        <Panel collapsible defaultExpanded header='信息列表' bsStyle='info'>
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
                          <th>标识</th>
                          <th>标题</th>
                          <th>创建日期</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.map(this.renderAbout)
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