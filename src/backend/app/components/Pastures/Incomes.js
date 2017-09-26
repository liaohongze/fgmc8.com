import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Panel } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { formatDate, getQueryString } from '../../utils/tools'
import './Incomes.scss'

export default class Incomes extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: false,
    incomesData: []
  }

  componentDidMount() {
    this.setState({ loading: true })
    Client.getIncomes(getQueryString('id'), result => {
      if (!result.errored && this.refs.userIncomesList) {
        this.setState({
          loading: false,
          incomesData: result.object
        })
      }
    })
  }

  render() {
    const { loading, incomesData } = this.state

    return (
      <div className='user-incomes-list' ref='userIncomesList'>
        <Panel collapsible defaultExpanded header={getQueryString('userName') + '的收获记录'} bsStyle='info'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='2x' /></div>
              : (
                incomesData.length === 0
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
                          incomesData.map((item, index) => {
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