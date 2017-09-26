import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table, Panel } from 'react-bootstrap'
import Client from '../../common/Client'
import { auth } from '../../common/Auth'
import { getQueryString } from '../../utils/tools'
import './Reacharge.scss'

let ID

export default class Reacharge extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  state = {
    rechargeInfo: null
  }

  handleSubmit = () => {
    const { rechargeInfo } = this.state
    let values = {
      'rechargeId': rechargeInfo.id,
      'customerId': rechargeInfo.customerId,
      'amount': rechargeInfo.amount
    }
    Client.Recharge(ID, values, result => {
      if (!result.errored) {
        this.props.history.push('/recharge')
      }
    })
  }

  componentWillMount() {
    ID = auth.getCurrentUser().id
  }

  componentDidMount() {
    Client.getRecharge(getQueryString('id'), result => {
      if (!result.errored) {
        this.setState({ rechargeInfo: result.object })
      }
    })
  }

  render() {
    const { rechargeInfo } = this.state
    return (
      <div className='user-recharge'>
        <Panel collapsible defaultExpanded header='充值详情' bsStyle='info'>
          <Table striped bordered condensed hover>
            <tbody>
              <tr>
                <th>充值昵称：</th>
                <td>{rechargeInfo ? rechargeInfo.name : '加载中...'}</td>
              </tr>
              <tr>
                <th>充值金额：</th>
                <td>{rechargeInfo ? rechargeInfo.amount : '加载中...'}</td>
              </tr>
            </tbody>
          </Table>

          <Button bsStyle='primary' onClick={this.handleSubmit}>提交</Button>
        </Panel>
      </div>
    )
  }
}