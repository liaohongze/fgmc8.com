import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {Popover, OverlayTrigger, Button} from 'react-bootstrap'
import { formatDate } from '../../utils/tools'

export default class ListItem extends React.PureComponent {
  static propTypes = {
    itemMatch: PropTypes.object,
    location: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    delete: PropTypes.func.isRequired,
    lock: PropTypes.func.isRequired
  }

  state = {
    lockoutEnabled: this.props.user.lockoutEnabled
  }

  deleteUser = () => {
    this.refs.delete.click()
    this.props.delete(this.props.user.id)
  }

  lockCustomer = () => {
    this.props.lock(this.props.user.id, this.props.location)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ lockoutEnabled: nextProps.user.lockoutEnabled })
  }

  render() {
    const { lockoutEnabled } = this.state
    const { user, itemMatch } = this.props
    const popoverClickRootClose = (
      <Popover id='popover-trigger-click-root-close' title='确认删除？'>
        <Button bsStyle='danger' onClick={this.deleteUser}>删除</Button>
      </Popover>
    )
    return (
      <tr>
        <td><Link className='user-name-btn' to={`${itemMatch.url}/detail/` + user.id}>{user.userName}</Link></td>
        <td>{user.nickName}</td>
        <td>{user.mobile}</td>
        <td>{user.recomName}</td>
        <td>{user.wechat}</td>
        <td>{user.alipay}</td>
        <td>{formatDate(user.created, 'YYYY-MM-DD HH:mm:ss')}</td>
        <td>
          <span className={lockoutEnabled ? 'unlock-btn' : 'lock-btn'} onClick={this.lockCustomer}>{lockoutEnabled ? '解锁账号' : '锁定账号'}</span>
          <Link to={`${itemMatch.url}/changepwd/${user.id}`}><span className='changepwd-btn'>修改密码</span></Link>
          <Link to={`${itemMatch.url}/edit/` + user.id}><span className='editToggle-btn'>编辑</span></Link>
          <OverlayTrigger trigger='click' rootClose placement='left' overlay={popoverClickRootClose}>
            <span className='delete' ref='delete'>删除</span>
          </OverlayTrigger>
        </td>
      </tr>
    )
  }
}