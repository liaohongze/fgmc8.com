import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
import FontAwesome from 'react-fontawesome'
import { formatDate } from '../../utils/tools'
import Toolbar from '../shared/Toolbar'
import NoMore from '../shared/NoMore'
import './Detail.scss'

export default class Detail extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: false,
    article: {}
  }

  componentDidMount() {
    this.setState({ loading: true })
    const { match: { params: { id } } } = this.props
    Client.getArticle(id, auth.getToken(), result => {
      if (!result.errored) {
        this.setState({
          loading: false,
          article: result.object
        })
      }
    })
  }

  render() {
    const { loading, article } = this.state
    const { match: { params: { id } } } = this.props
    return (
      <div className='news-detail toolbar-page'>
        <Toolbar link={id === 'rule' ? '/' : '/news'} title='公告详情' />
        <div className='news-content toolbar-page-content'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='spinner' spin size='lg' /></div>
              : (
                Object.getOwnPropertyNames(article).length === 0
                  ? <NoMore />
                  : (
                    <div className='contetnt-wrapper'>
                      <h2 className='news-title'>{article.title}</h2>
                      <p className='create-time'>{formatDate(article.created, 'YYYY-MM-DD')}</p>
                      <div className='detail' dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>
                  )
              )
          }
        </div>
      </div>
    )
  }
}