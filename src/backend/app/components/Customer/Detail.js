import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Panel } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import './Detail.scss'

export default class Detail extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: false,
    data: []
  }

  componentDidMount() {
    this.setState({ loading: true })
    const { match: { params: { id } } } = this.props
    Client.getCustomer(id, result => {
      if (!result.errored) {
        this.setState({
          loading: false,
          data: result.object
        })
      }
    })
  }

  render() {
    const { loading, data } = this.state

    if (loading) {
      return <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='2x' /></div>
    } else {
      if (data.length === 0) {
        return <div className='no-result'>暂无数据</div>
      } else {
        return (
          <div className='user-Detail'>
            <Panel collapsible defaultExpanded header='用户详情' bsStyle='info'>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <th>用户名</th>
                    <td>{data.userName}</td>
                  </tr>
                  <tr>
                    <th>用户昵称</th>
                    <td>{data.nickName}</td>
                  </tr>
                  <tr>
                    <th>推荐人</th>
                    <td>{data.recomName}</td>
                  </tr>
                  <tr>
                    <th>等级</th>
                    <td>{data.grade}</td>
                  </tr>
                  <tr>
                    <th>仓库</th>
                    <td>{data.stock}</td>
                  </tr>
                  <tr>
                    <th>牧场</th>
                    <td>{data.invest}</td>
                  </tr>
                  <tr>
                    <th>总收益</th>
                    <td>{data.income}</td>
                  </tr>
                  <tr>
                    <th>电话</th>
                    <td>{data.mobile}</td>
                  </tr>
                  <tr>
                    <th>微信</th>
                    <td>{data.wechat}</td>
                  </tr>
                  <tr>
                    <th>支付宝</th>
                    <td>{data.alipay}</td>
                  </tr>
                </tbody>
              </Table>
            </Panel>
          </div>
        )
      }
    }
  }
}