import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Panel } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
import { formatDate, getQueryString } from '../../utils/tools'
import './Raises.scss'

export default class Raises extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: false,
    raisesData: []
  }

  componentDidMount() {
    this.setState({ loading: true })
    Client.getRaises(getQueryString('id'), auth.getToken(), result => {
      if (!result.errored) {
        this.setState({
          loading: false,
          raisesData: result.object
        })
      }
    })
  }

  render() {
    const { loading, raisesData } = this.state

    return (
      <div className='user-raises-list'>
        <Panel collapsible defaultExpanded header={getQueryString('userName') + '的增养记录'} bsStyle='info'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='2x' /></div>
              : (
                raisesData.length === 0
                  ? <div className='no-result'>暂无数据</div>
                  : (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>牧场</th>
                          <th>收益金额</th>
                          <th>收益时间</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          raisesData.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
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