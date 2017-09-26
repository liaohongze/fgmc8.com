import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Panel, Table, Pagination } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { formatDate } from '../../utils/tools'

export default class Record extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    totalPage: 1,
    activePage: 1,
    pageSize: 10,
    loading: false,
    recordData: []
  }

  refreshData = (page, size) => {
    this.setState({ loading: true })
    Client.getWillageWithIdles(page, size, result => {
      if (!result.errored) {
        this.setState({
          loading: false,
          totalPage: Math.ceil(result.object.total / size),
          recordData: result.object.list
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
    this.refreshData(eventKey, this.state.pageSize)
  }

  render() {
    const { loading, recordData, totalPage, activePage } = this.state
    return (
      <div className='withdrawal-record'>
        <Panel collapsible defaultExpanded header='庄和闲记录' bsStyle='info'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='2x' /></div>
              : (
                recordData.length === 0
                  ? <div className='no-result'>暂无数据</div>
                  : (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>下注</th>
                          <th>赔率</th>
                          <th>积分变动</th>
                          <th>日期</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          recordData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.odds}</td>
                                <td>{item.amount}</td>
                                <td>{formatDate(item.created, 'YYYY-MM-DD HH:mm:ss')}</td>
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