import React, { Component } from 'react'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
import FontAwesome from 'react-fontawesome'
import { formatDate } from '../../utils/tools'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import './Rule.scss'

export default class Rule extends Component {
  state = {
    loading: false,
    ruleInfo: null
  }

  componentDidMount () {
    this.setState({loading: true})
    Client.getAbout('guid', auth.getToken(), result => {
      if (!result.errored && this.refs.ruleBox) {
        this.setState({
          loading: false,
          ruleInfo: result.object
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  render() {
    const {loading, ruleInfo} = this.state
    return (
      <div className='news-detail toolbar-page' ref='ruleBox'>
        <Toolbar link='/' title='游戏玩法' />
        <div className='news-content toolbar-page-content'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='lg' /></div>
              : (
                !ruleInfo
                  ? <NoMore />
                  : (
                    <div>
                      <h2>{ruleInfo.title}</h2>
                      <p className='rule-ruleInfo'>{formatDate(ruleInfo.created, 'YYYY-MM-DD hh:mm:ss')}</p>
                      <div dangerouslySetInnerHTML={{__html: ruleInfo.content}} />
                    </div>
                  )
              )
          }
        </div>
      </div>
    )
  }
}