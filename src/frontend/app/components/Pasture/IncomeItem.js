import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './IncomeItem.scss'

export default class IncomeItem extends Component {
  static propTypes = {
    recomName: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  }

  render() {
    const { recomName, amount } = this.props
    return (
      <div className='buy-item'>
        <div className='buy-item-content'>
          <div className='info-row'>
            <div className='info-box'>
              <strong>{recomName}</strong>
              <p>用户名</p>
            </div>
            <div className='info-box'>
              <strong>{amount}</strong>
              <p>金额</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}