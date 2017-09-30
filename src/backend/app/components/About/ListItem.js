import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/tools'
import {Popover, OverlayTrigger, Button} from 'react-bootstrap'

export default class ListItem extends React.PureComponent {
  static propTypes = {
    itemMatch: PropTypes.object,
    about: PropTypes.object.isRequired,
    delete: PropTypes.func.isRequired
  }

  deleteAbout = () => {
    this.refs.delete.click()
    this.props.delete(this.props.about.id)
  }

  render() {
    const { about, itemMatch } = this.props
    const popoverClickRootClose = (
      <Popover id='popover-trigger-click-root-close' title='确认删除？'>
        <Button bsStyle='danger' onClick={this.deleteAbout}>删除</Button>
      </Popover>
    )
    return (
      <tr>
        <td>{about.sign}</td>
        <td>{about.title}</td>
        <td>{formatDate(about.created, 'YYYY-MM-DD hh:mm:ss')}</td>
        <td>
          <Link to={`${itemMatch.url}/edit/` + about.id}><span className='editToggle-btn'>编辑</span></Link>
          <OverlayTrigger trigger='click' rootClose placement='left' overlay={popoverClickRootClose}>
            <span className='delete' ref='delete'>删除</span>
          </OverlayTrigger>
        </td>
      </tr>
    )
  }
}