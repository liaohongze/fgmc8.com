import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
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
    Client.getAbout('bet', auth.getToken(), result => {
      if (!result.errored && this.refs.betruleBox) {
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
      <div className='betrule-detail toolbar-page' ref='betruleBox'>
        <Toolbar link='/luckygame/zhx' title='游戏说明' />
        <div className='betrule-content toolbar-page-content'>
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