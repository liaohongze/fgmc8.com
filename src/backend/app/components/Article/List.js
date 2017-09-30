import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Panel, Pagination } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Client from '../../common/Client'
import {auth} from '../../common/Auth'
import ListItem from './ListItem'
import './Article.scss'

export default class Article extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    loading: false,
    articles: [],
    totalPage: 1,
    activePage: 1,
    pageSize: 10
  }

  componentDidMount () {
    this.refleshData(this.state.activePage, this.state.pageSize)
  }

  refleshData = (page, size) => {
    this.setState({ loading: true })
    Client.getArticles(page, size, auth.getToken(), result => {
      if (!result.errored && this.refs.articleBox) {
        this.setState({
          loading: false,
          articles: result.object.list,
          totalPage: Math.ceil(result.object.total / this.state.pageSize)
        })
      }
    })
  }

  deleteArticle = (id) => {
    Client.deleteArticle(id, auth.getToken(), result => {
      if (!result.errored && this.refs.articleBox) {
        this.setState(prevState => {
          return {
            articles: prevState.articles.filter(item => item.id !== id)
          }
        })
      }
    })
  }

  handleSelect = (eventKey) => {
    this.setState({
      activePage: eventKey
    })
    this.refleshData(eventKey, this.state.pageSize)
  }

  renderArticle = (item, index) => {
    return <ListItem key={index} article={item} delete={this.deleteArticle} itemMatch={this.props.match} />
  }

  render() {
    const { loading, articles, activePage, totalPage } = this.state
    return (
      <div className='article' ref='articleBox'>
        <Panel collapsible defaultExpanded header='通知列表' bsStyle='info'>
          {
            loading
              ? <div className='loading'><FontAwesome className='super-crazy-colors' name='refresh' spin size='2x' /></div>
              : (
                articles.length === 0
                  ? <div className='no-result'>暂无数据</div>
                  : (
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>标题</th>
                          <th>创建时间</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          articles.map(this.renderArticle)
                        }
                      </tbody>
                    </Table>
                  )
              )
          }
          <div className='pagination-wrapper'>
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              items={totalPage}
              maxButtons={4}
              activePage={activePage}
              onSelect={this.handleSelect} />
          </div>
        </Panel>
      </div>
    )
  }
}