import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './RecordItem.scss'

export default class RecordItem extends Component {
  static propTypes = {
    profit: PropTypes.string.isRequired,
    pasture: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }

  render() {
    const { profit, pasture, date } = this.props
    return (
      <div className='record-item'>
        <p className='profit'>{profit}</p>
        <p className='pasture-number'>{pasture}</p>
        <p className='data-time'>{date}</p>
      </div>
    )
  }
}