import Home from '../Home'

import Article from '../Article'
import CreateArticle from '../Article/Create'

import About from '../About'
import Create from '../About/Create'

import Customer from '../Customer'
import Recharge from '../Recharge'
import Pastures from '../Pastures'
import Transactions from '../Transactions'
import Withdraw from '../Withdraw/List'
import Turntable from '../Turntable'
import creatReward from '../Turntable/Create'
import TurntableRecord from '../Turntable/Record'

import BetRecord from '../BetGame/Record'

export default [
  {
    icon: 'home',
    title: '控制面板',
    sidebarMenuKey: 1,
    sidebarItem: [
      {
        SidebarItemKey: 1,
        value: '控制面板',
        url: 'home',
        component: Home
      }
    ]
  },
  {
    icon: 'bullhorn',
    title: '通知管理',
    sidebarMenuKey: 2,
    sidebarItem: [
      {
        SidebarItemKey: 2,
        value: '通知列表',
        url: 'article',
        component: Article
      },
      {
        SidebarItemKey: 3,
        value: '创建通知',
        url: 'createArticle',
        component: CreateArticle
      }
    ]
  },
  {
    icon: 'comment',
    title: '信息管理',
    sidebarMenuKey: 3,
    sidebarItem: [
      {
        SidebarItemKey: 4,
        value: '信息列表',
        url: 'abouts',
        component: About
      },
      {
        SidebarItemKey: 5,
        value: '创建信息',
        url: 'createAbouts',
        component: Create
      }
    ]
  },
  {
    icon: 'user',
    title: '用户管理',
    sidebarMenuKey: 4,
    sidebarItem: [
      {
        SidebarItemKey: 6,
        value: '用户列表',
        url: 'customer',
        component: Customer
      }
    ]
  },
  {
    icon: 'piggy-bank',
    title: '充值管理',
    sidebarMenuKey: 5,
    sidebarItem: [
      {
        SidebarItemKey: 7,
        value: '充值记录',
        url: 'recharge',
        component: Recharge
      }
    ]
  },
  {
    icon: 'tree-deciduous',
    title: '牧场管理',
    sidebarMenuKey: 6,
    sidebarItem: [
      {
        SidebarItemKey: 8,
        value: '所有牧场',
        url: 'pastures',
        component: Pastures
      }
    ]
  },
  {
    icon: 'bitcoin',
    title: '交易信息',
    sidebarMenuKey: 7,
    sidebarItem: [
      {
        SidebarItemKey: 9,
        value: '所有交易',
        url: 'transactions',
        component: Transactions
      }
    ]
  },
  {
    icon: 'yen',
    title: '提现申请',
    sidebarMenuKey: 8,
    sidebarItem: [
      {
        SidebarItemKey: 10,
        value: '提现记录',
        url: 'withdraw',
        component: Withdraw
      }
    ]
  },
  {
    icon: 'tower',
    title: '游戏奖项',
    sidebarMenuKey: 9,
    sidebarItem: [
      {
        SidebarItemKey: 11,
        value: '转盘奖项',
        url: 'turntable',
        component: Turntable
      },
      {
        SidebarItemKey: 12,
        value: '创建奖项',
        url: 'createreward',
        component: creatReward
      }
    ]
  },
  {
    icon: 'stats',
    title: '游戏记录',
    sidebarMenuKey: 10,
    sidebarItem: [
      {
        SidebarItemKey: 13,
        value: '转盘记录',
        url: 'turntablerecord',
        component: TurntableRecord
      },
      {
        SidebarItemKey: 14,
        value: '庄和闲记录',
        url: 'betrecord',
        component: BetRecord
      }
    ]
  }
]