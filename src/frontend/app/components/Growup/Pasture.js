import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import { auth, currentUser } from '../../common/Auth'
import { formatDate } from '../../utils/tools'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import RecordItem from './RecordItem'
import './GrowupRecord.scss'

let ID

export default class Pasture extends Component {
  state = {
    loading: false,
    data: []
  }

  componentWillMount() {
    ID = currentUser().id
  }

  componentDidMount() {
    this.setState({ loading: true })
    Client.getPastures(ID, auth.getToken(), result => {
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
    return (
      <div className='growup-pasture growup-record toolbar-page'>
        <Toolbar link='/growup' title='开牧场记录' />
        <div className='record-list toolbar-page-content'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='spinner' spin size='lg' /></div>
              : (
                data.length === 0
                  ? <NoMore />
                  : (
                    data.map((item, index) => {
                      return <RecordItem key={index} profit={'-' + item.price.toString()} pasture={item.name} date={formatDate(item.created, 'YYYY-MM-DD HH:mm:ss')} />
                    })
                  )
              )
          }
        </div>
      </div>
    )
  }
}