import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { formatDate } from '../../utils/tools'

export default class ListItem extends React.PureComponent {
  static propTypes = {
    withdraw: PropTypes.object.isRequired,
    confirm: PropTypes.func.isRequired,
    location: PropTypes.number.isRequired
  }

  state = {
    status: this.props.withdraw.status,
    reviewTime: this.props.withdraw.reviewTime
  }

  confirmWithdraw = () => {
    this.props.confirm(this.props.withdraw.id, this.props.withdraw.customerId, this.props.location)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      status: nextProps.withdraw.status,
      reviewTime: nextProps.withdraw.reviewTime
    })
  }

  render() {
    const { withdraw } = this.props
    const { status, reviewTime } = this.state
    return (
      <tr>
        <td>{formatDate(withdraw.created, 'YYYY-MM-DD HH:mm:ss')}</td>
        <td>{withdraw.amount}</td>
        <td>{withdraw.userName}</td>
        <td>{withdraw.balance}</td>
        <td>{withdraw.phoneNumber}</td>
        <td>{withdraw.type}</td>
        <td>{status}</td>
        <td>{formatDate(reviewTime, 'YYYY-MM-DD HH:mm:ss')}</td>
        <td>
          {status === '申请中' ? <Button bsStyle='primary' onClick={this.confirmWithdraw}>通过</Button> : '已完成'}
        </td>
      </tr>
    )
  }
}