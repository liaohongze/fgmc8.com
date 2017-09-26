import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './RecordItem.scss'

export default class RecordItem extends Component {
  static propTypes = {
    profit: PropTypes.string.isRequired,
    openName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }

  render() {
    const { profit, openName, date } = this.props
    return (
      <div className='record-item'>
        <p className='profit'>{profit}</p>
        <p className='pasture-number'>{openName}</p>
        <p className='data-time'>{date}</p>
      </div>
    )
  }
}