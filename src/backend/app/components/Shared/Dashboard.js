import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom'
import { Nav, Navbar, NavItem, MenuItem, NavDropdown, Glyphicon, Button } from 'react-bootstrap'

import { auth } from '../../common/Auth'
import Sildebar from './sidebar/Sidebar'
import MenuGroup from './sidebar/MenuGroup'
import SidebarItem from './sidebar/SidebarItem'
import AdminImg from './img/admin.jpg'
import MenuData from './data'
import './Layout.scss'

export default class Dashboard extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    slideWidth: 0,
    isOpen: true,
    isShowMoblieSidebar: false,
    menuActiveKey: 1,
    menuBgColorKey: 1,
    itemActiveKey: 1,
    contentNavbarMenuKey: 0,
    menuGroup: MenuData
  }

  handleMenuActive = (SidebarMenuKey) => {
    this.setState({
      menuActiveKey: SidebarMenuKey
    })
  }

  handleMenuBgColor = (menuKey) => {
    this.setState({
      menuBgColorKey: menuKey,
      contentNavbarMenuKey: menuKey - 1
    })
  }

  handleItemActive = (SidebarItemKey) => {
    this.setState({
      itemActiveKey: SidebarItemKey
    })
  }

  SidebarToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  MoblieSidebarToggle = () => {
    this.setState({
      isShowMoblieSidebar: !this.state.isShowMoblieSidebar
    })
  }

  itemCloseMobileSidebar = () => {
    this.setState({
      isShowMoblieSidebar: false
    })
  }

  handleSlideLeft = () => {
    let viewWidth = 0
    if (window.innerWidth > 500) {
      viewWidth = this.state.isOpen ? window.innerWidth - 310 : window.innerWidth - 160
    } else {
      viewWidth = window.innerWidth - 60
    }
    let viewCount = parseInt(viewWidth / 90)
    if (this.state.slideWidth < 0) {
      this.setState({
        slideWidth: (this.state.slideWidth + (viewCount - 1) * 90) < 0 ? this.state.slideWidth + (viewCount - 1) * 90 : 0
      })
    }
  }

  handleSlideRight = () => {
    let viewWidth = 0
    if (window.innerWidth > 500) {
      viewWidth = this.state.isOpen ? window.innerWidth - 310 : window.innerWidth - 160
    } else {
      viewWidth = window.innerWidth - 60
    }
    let viewCount = parseInt(viewWidth / 90)
    let listWidth = this.state.menuGroup[this.state.contentNavbarMenuKey].sidebarItem.length * 90
    if ((listWidth + this.state.slideWidth) >= viewWidth) {
      this.setState({
        slideWidth: this.state.slideWidth + (viewCount - 1) * (-90)
      })
    }
  }

  logOut = () => {
    auth.signout()
  }

  componentDidMount() {
    // 获取地址栏的url，字符串切割出最后的各个子菜单标识的url，
    // 循环和各个子菜单的url相比较，如果相等就设置itemActiveKey为匹配的值
    // 以此控制页面跳转后和侧边栏被选中项的相匹配
    window.addEventListener('resize', this.onWindowResize)
    let viewWidth = 0
    if (window.innerWidth > 500) {
      viewWidth = this.state.isOpen ? window.innerWidth - 310 : window.innerWidth - 160
    } else {
      viewWidth = window.innerWidth - 60
    }
    let viewCount = parseInt(viewWidth / 90)
    let pathname = window.location.pathname.substr(1, window.location.pathname.length - 1).split('/')[0]
    for (var i = 0; i < this.state.menuGroup.length; i++) {
      for (var j = 0; j < this.state.menuGroup[i].sidebarItem.length; j++) {
        var url = this.state.menuGroup[i].sidebarItem[j].url
        if (url === pathname) {
          var number = j + 1
          if (number > viewCount) {
            if ((number % viewCount) !== 0) {
              var page = parseInt(number / viewCount)
              this.setState({
                slideWidth: page * viewCount * (-90)
              })
            } else {
              page = parseInt(number / viewCount)
              this.setState({
                slideWidth: (page - 1) * viewCount * (-90)
              })
            }
          }
          this.setState({
            itemActiveKey: this.state.menuGroup[i].sidebarItem[j].SidebarItemKey,
            menuBgColorKey: this.state.menuGroup[i].sidebarMenuKey,
            menuActiveKey: this.state.menuGroup[i].sidebarMenuKey,
            contentNavbarMenuKey: this.state.menuGroup[i].sidebarMenuKey - 1
          })
        }
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }

  render() {
    const { itemActiveKey, contentNavbarMenuKey, menuGroup, slideWidth } = this.state
    return (
      <div className='admin-layout'>
        <Navbar>
          <Navbar.Header>
            <Button className='moblie-sidebar-toggle' onClick={this.MoblieSidebarToggle}>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </Button>
            <Navbar.Brand>
              <Link to={'#'}>后台管理</Link>
              <span className='sidebar-toggle' onClick={this.SidebarToggle}>
                <Glyphicon glyph='transfer' />
              </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Button className='logout' onClick={this.logOut}>
              <Link to='/login'><Glyphicon glyph='off' /></Link>
            </Button>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href='#'><img className='user-avatar' src={AdminImg} alt='' /></NavItem>
              <NavDropdown eventKey={2} title={auth.getCurrentUser().userName} id='basic-nav-dropdown'>
                <MenuItem eventKey={2.1} href='/home/changepwd'>修改密码</MenuItem>
                <MenuItem divider />
                <MenuItem eventKey={2.2} href='/login' onClick={this.logOut}>退出系统</MenuItem>
              </NavDropdown>
              <NavItem eventKey={3} href='/' className='back-frontend'>返回首页</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className='sidebar-and-content-wrapper'>
          <Sildebar
            isOpen={this.state.isOpen}
            isShowMoblieSidebar={this.state.isShowMoblieSidebar}
            itemCloseMobileSidebar={this.itemCloseMobileSidebar}
            menuActiveKey={this.state.menuActiveKey}
            handleMenuActive={this.handleMenuActive}
            menuBgColorKey={this.state.menuBgColorKey}
            handleMenuBgColor={this.handleMenuBgColor}
            handleItemActive={this.handleItemActive}
            itemActiveKey={this.state.itemActiveKey}
          >
            {
              menuGroup.map((menu) => {
                return (
                  <MenuGroup title={menu.title} SidebarMenuKey={menu.sidebarMenuKey} key={menu.sidebarMenuKey} icon={menu.icon} subMenuNum={menu.sidebarItem.length}>
                    {
                      menu.sidebarItem.map((item) => {
                        return (<SidebarItem key={item.SidebarItemKey} value={item.value} SidebarItemKey={item.SidebarItemKey} url={item.url} />)
                      })
                    }
                  </MenuGroup>
                )
              })
            }
          </Sildebar>
          <div className='content-and-footer'>
            <div className='content-wrapper'>
              <div className='item-navbar'>
                <div className='nav-to-left' onClick={this.handleSlideLeft}><Glyphicon glyph='menu-left' /></div>
                <div className='navbar-list'>
                  <div className='item-wrapper' style={{ marginLeft: slideWidth }}>
                    {
                      this.state.menuGroup[contentNavbarMenuKey].sidebarItem.map((item) => {
                        return (
                          <Link
                            to={`/${item.url}`}
                            key={item.SidebarItemKey}
                            onClick={(SidebarItemKey) => { this.handleItemActive(item.SidebarItemKey) }}
                            className={itemActiveKey === item.SidebarItemKey ? 'onActive' : null}
                          >
                            {item.value}
                          </Link>
                        )
                      })
                    }
                  </div>
                </div>
                <div className='nav-to-right' onClick={this.handleSlideRight}><Glyphicon glyph='menu-right' /></div>
              </div>
              <div className='content'>
                {
                  this.state.menuGroup[contentNavbarMenuKey].sidebarItem.map((item) => {
                    return (
                      <Route location={location} path={`${this.props.match.url}` + `${item.url}`} component={item.component} key={item.SidebarItemKey} />
                    )
                  })
                }
              </div>
            </div>
            <div className='footer'>管理系统</div>
          </div>
        </div>
      </div>
    )
  }
}