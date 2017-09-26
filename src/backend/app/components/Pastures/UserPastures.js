import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Panel } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { formatDate, getQueryString } from '../../utils/tools'
import './UserPastures.scss'

export default class UserPastures extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: false,
    pasturesData: []
  }

  componentDidMount() {
    this.setState({ loading: true })
    Client.getUserPastures(getQueryString('id'), result => {
      if (!result.errored && this.refs.userPasturesList) {
        this.setState({
          loading: false,
          pasturesData: result.object
        })
      }
    })
  }

  handleSelect = (eventKey) => {
    this.setState({
      activePage: eventKey
    })
  }

  render() {
    const { loading, pasturesData } = this.state

    return (
      <div className='user-pastures-list' ref='userPasturesList'>
        <Panel collapsible defaultExpanded header={getQueryString('userName') + '的牧场'} bsStyle='info'>
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
                          <th>牧场</th>
                          <th>价格</th>
                          <th>数量</th>
                          <th>创建时间</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          pasturesData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{formatDate(item.created, 'YYYY-MM-DD hh:mm:ss')}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                  )
              )
          }
        </Panel>
      </div>
    )
  }
}