import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './EquipmentItem.scss'

export default class EquipmentItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    effict: PropTypes.string.isRequired
  }

  render() {
    const { name, price, effict } = this.props
    return (
      <div className='equipment-item'>
        <div className='header'><button>购买</button></div>
        <div className='body'>
          <div className='name'>
            <strong>{name}</strong>
            <p>名称</p>
          </div>
          <div className='price'>
            <strong>{price}</strong>
            <p>价格</p>
          </div>
          <div className='effict'>
            <strong>{effict}</strong>
            <p>作用效果</p>
          </div>
          <div className='count'>
            <strong>不限</strong>
            <p>数量</p>
          </div>
        </div>
      </div>
    )
  }
}