import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {Popover, OverlayTrigger, Button} from 'react-bootstrap'

export default class ListItem extends React.PureComponent {
  static propTypes = {
    itemMatch: PropTypes.object.isRequired,
    prize: PropTypes.object.isRequired,
    delete: PropTypes.func.isRequired
  }

  deletePrize = () => {
    this.refs.delete.click()
    this.props.delete(this.props.prize.id)
  }

  render() {
    const { prize, itemMatch } = this.props
    const popoverClickRootClose = (
      <Popover id='popover-trigger-click-root-close' title='确认删除？'>
        <Button bsStyle='danger' onClick={this.deletePrize}>删除</Button>
      </Popover>
    )
    return (
      <tr>
        <td>{prize.title}</td>
        <td>{prize.name}</td>
        <td>{prize.grade}</td>
        <td>{prize.probability}</td>
        <td>{prize.reward}</td>
        <td>
          <Link to={`${itemMatch.url}/edit/` + prize.id}><span className='editToggle-btn'>编辑</span></Link>
          <OverlayTrigger trigger='click' rootClose placement='left' overlay={popoverClickRootClose}>
            <span className='delete' ref='delete'>删除</span>
          </OverlayTrigger>
        </td>
      </tr>
    )
  }
}