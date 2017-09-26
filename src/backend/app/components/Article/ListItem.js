import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/tools'

export default class ListItem extends React.PureComponent {
  static propTypes = {
    itemMatch: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    delete: PropTypes.func.isRequired
  }

  deleteArticle = () => {
    this.props.delete(this.props.article.id)
  }

  render() {
    const { article, itemMatch } = this.props
    return (
      <tr>
        <td>{article.title}</td>
        <td>{formatDate(article.created, 'YYYY-MM-DD hh:mm:ss')}</td>
        <td>
          <Link to={`${itemMatch.url}/edit/` + article.id}><span className='editToggle'>编辑</span></Link>
          <span className='delete' onClick={this.deleteArticle}>删除</span>
        </td>
      </tr>
    )
  }
}