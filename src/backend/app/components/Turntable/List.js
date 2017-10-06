import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Panel } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
import ListItem from './ListItem'
import './List.scss'

export default class List extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: false,
    data: []
  }

  refreshData = () => {
    this.setState({ loading: true })
    Client.getPrizes(auth.getToken(), result => {
      if (!result.errored) {
        this.setState({
          loading: false,
          data: result.object
        })
      }
    })
  }

  deletePrize = (id) => {
    Client.deletePrize(id, auth.getToken(), result => {
      if (!result.errored) {
        this.setState(prevState => {
          return { data: prevState.data.filter(item => item.id !== id) }
        })
      }
    })
  }

  renderPrize = (item, index) => {
    return <ListItem key={index} prize={item} delete={this.deletePrize} itemMatch={this.props.match} />
  }

  componentDidMount() {
    this.refreshData()
  }

  render() {
    const { loading, data } = this.state
    return (
      <div className='turntable-list'>
        <Panel collapsible defaultExpanded header='转盘奖品' bsStyle='info'>
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
                          <th>奖品标题</th>
                          <th>奖品名称</th>
                          <th>奖品等级</th>
                          <th>抽奖概率</th>
                          <th>奖品积分</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.map(this.renderPrize)
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