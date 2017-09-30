import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import { formatDate } from '../../utils/tools'
import RecordItem from './RecordItem'
import './GrowupRecord.scss'

let ID

export default class Harvest extends Component {
  state = {
    loading: false,
    record: []
  }

  componentWillMount() {
    ID = currentUser().id
  }

  componentDidMount() {
    this.setState({ loading: true })
    Client.getIncomes(ID, auth.getToken(), result => {
      if (!result.errored && this.refs.harvestBox) {
        this.setState({
          loading: false,
          record: result.object
        })
      }
    })
  }

  render() {
    const { loading, record } = this.state
    return (
      <div className='harvest growup-record toolbar-page' ref='harvestBox'>
        <Toolbar link='/growup' title='收获记录' />
        <div className='record-list toolbar-page-content'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='lg' /></div>
              : (
                record.length === 0
                  ? <NoMore />
                  : (
                    record.map((item, index) => {
                      return <RecordItem key={index} profit={'+' + item.amount.toString()} pasture={item.name} date={formatDate(item.created, 'YYYY-MM-DD HH:mm:ss')} />
                    })
                  )
              )
          }
        </div>
      </div>
    )
  }
}