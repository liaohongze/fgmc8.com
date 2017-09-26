import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/tools'

export default class ListItem extends React.PureComponent {
  static propTypes = {
    itemMatch: PropTypes.object,
    about: PropTypes.object.isRequired,
    delete: PropTypes.func.isRequired
  }

  deleteAbout = () => {
    this.props.delete(this.props.about.id)
  }

  render() {
    const { about, itemMatch } = this.props
    return (
      <tr>
        <td>{about.sign}</td>
        <td>{about.title}</td>
        <td>{formatDate(about.created, 'YYYY-MM-DD hh:mm:ss')}</td>
        <td>
          <Link to={`${itemMatch.url}/edit/` + about.id}><span className='editToggle-btn'>编辑</span></Link>
          <span className='delete' onClick={this.deleteAbout}>删除</span>
        </td>
      </tr>
    )
  }
}