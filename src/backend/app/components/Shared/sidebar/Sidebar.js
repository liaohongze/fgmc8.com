import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Sidebar.scss'

export default class Sidebar extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    isShowMoblieSidebar: PropTypes.bool,
    itemCloseMobileSidebar: PropTypes.func,
    menuBgColorKey: PropTypes.number,
    menuActiveKey: PropTypes.number,
    handleMenuBgColor: PropTypes.func,
    handleItemActive: PropTypes.func,
    handleMenuActive: PropTypes.func,
    itemActiveKey: PropTypes.number
  }

  sidebarClassName = () => {
    if (this.props.isOpen) {
      if (this.props.isShowMoblieSidebar) {
        return 'sidebar moblie-sidebar'
      } else {
        return 'sidebar'
      }
    } else {
      return 'sidebar small-sidebar'
    }
  }

  renderChildren = (props) => {
    return React.Children.map(props.children, child => {
      return React.cloneElement(child, {
        menuActiveKey: this.props.menuActiveKey,
        handleMenuActive: this.props.handleMenuActive,
        menuBgColorKey: this.props.menuBgColorKey,
        handleMenuBgColor: this.props.handleMenuBgColor,
        itemActiveKey: this.props.itemActiveKey,
        handleItemActive: this.props.handleItemActive,
        itemCloseMobileSidebar: this.props.itemCloseMobileSidebar,
        isOpen: this.props.isOpen
      })
    })
  }
  render() {
    const divClass = classNames({
      'sidebar': true,
      'small-sidebar': !this.props.isOpen,
      'moblie-sidebar': this.props.isShowMoblieSidebar
    })
    return (
      <div className={divClass}>
        {this.renderChildren(this.props)}
      </div>
    )
  }
}