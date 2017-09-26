import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './SidebarItem.scss'

export default class SidebarItem extends Component {
  static propTypes = {
    value: PropTypes.string,
    SidebarItemKey: PropTypes.number,
    handleItemActive: PropTypes.func,
    itemActiveKey: PropTypes.number,
    SidebarMenuKey: PropTypes.number,
    handleMenuBgColor: PropTypes.func,
    itemCloseMobileSidebar: PropTypes.func,
    url: PropTypes.string
  }

  handleOnClick = () => {
    this.props.handleItemActive(this.props.SidebarItemKey)
    this.props.handleMenuBgColor(this.props.SidebarMenuKey)
    this.props.itemCloseMobileSidebar()
  }

  render() {
    return (
      <Link className='sidebar-item-a' to={`/` + this.props.url}>
        <li
          className={this.props.itemActiveKey === this.props.SidebarItemKey ? 'menu-item item-active' : 'menu-item'}
          onClick={this.handleOnClick}
        >
          {this.props.value}
        </li>
      </Link>
    )
  }
}