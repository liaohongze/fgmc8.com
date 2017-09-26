import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class ListItem extends React.PureComponent {
  static propTypes = {
    itemMatch: PropTypes.object.isRequired,
    prize: PropTypes.object.isRequired,
    delete: PropTypes.func.isRequired
  }

  deletePrize = () => {
    this.props.delete(this.props.prize.id)
  }

  render() {
    const { prize, itemMatch } = this.props
    return (
      <tr>
        <td>{prize.title}</td>
        <td>{prize.name}</td>
        <td>{prize.grade}</td>
        <td>{prize.probability}</td>
        <td>{prize.reward}</td>
        <td>
          <Link to={`${itemMatch.url}/edit/` + prize.id}><span className='editToggle-btn'>编辑</span></Link>
          <span className='delete' onClick={this.deletePrize}>删除</span>
        </td>
      </tr>
    )
  }
}