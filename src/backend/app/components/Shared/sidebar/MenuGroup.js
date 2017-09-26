import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Glyphicon } from 'react-bootstrap'
import './MenuGroup.scss'

export default class MenuGroup extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    SidebarMenuKey: PropTypes.number,
    menuActiveKey: PropTypes.number,
    handleMenuActive: PropTypes.func,
    itemActiveKey: PropTypes.number,
    menuBgColorKey: PropTypes.number,
    handleItemActive: PropTypes.func,
    handleMenuBgColor: PropTypes.func,
    itemCloseMobileSidebar: PropTypes.func,
    icon: PropTypes.string,
    isOpen: PropTypes.bool,
    subMenuNum: PropTypes.number
  }

  handleMenuClick = () => {
    this.props.SidebarMenuKey === this.props.menuActiveKey
      ? this.props.handleMenuActive(0)
      : this.props.handleMenuActive(this.props.SidebarMenuKey)
  }

  isShowMenuPointer = () => {
    if (this.props.isOpen) {
      if (this.props.SidebarMenuKey === this.props.menuActiveKey) {
        return <Glyphicon className='menu-pointer' glyph='menu-down' />
      } else {
        return <Glyphicon className='menu-pointer' glyph='menu-left' />
      }
    }
  }

  // isShowDownUl = () => {
  //   if (this.props.isOpen) {
  //     if (this.props.SidebarMenuKey === this.props.menuActiveKey) {
  //       return 'wrapper-ul'
  //     } else {
  //       return 'wrapper-ul hidden-ul'
  //     }
  //   } else {
  //     return 'wrapper-ul hidden-ul'
  //   }
  // }

  renderChildren = (props) => {
    return React.Children.map(props.children, child => {
      return React.cloneElement(child, {
        itemActiveKey: this.props.itemActiveKey,
        handleItemActive: this.props.handleItemActive,
        handleMenuBgColor: this.props.handleMenuBgColor,
        SidebarMenuKey: this.props.SidebarMenuKey,
        itemCloseMobileSidebar: this.props.itemCloseMobileSidebar,
        isOpen: this.props.isOpen
      })
    })
  }

  render() {
    const { title, subMenuNum } = this.props
    return (
      <div className={this.props.isOpen ? 'menu-group' : 'menu-group close-menu-group'}>
        <div
          className={
            this.props.SidebarMenuKey === this.props.menuBgColorKey
              ? 'menu-title onActive'
              : 'menu-title'
          }
          onClick={this.handleMenuClick}
        >
          {
            this.props.isOpen
              ? <span className='title'><Glyphicon glyph={this.props.icon} />{title}</span>
              : <Glyphicon glyph={this.props.icon} />
          }
          {this.isShowMenuPointer()}
        </div>
        <ul className='wrapper-ul' style={{height: this.props.isOpen ? (this.props.SidebarMenuKey === this.props.menuActiveKey ? subMenuNum * 30 : '0') : subMenuNum * 30}}>
          {this.renderChildren(this.props)}
        </ul>
      </div>
    )
  }
}