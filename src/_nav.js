import React from 'react'
import CIcon from '@coreui/icons-react'
import { NavLink } from 'react-router-dom'

const _nav = [
  {
    _component: 'CNavTitle',
    anchor: 'DashBoard',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Analytics',
    to: '/analytics',
    icon: <CIcon name="cil-speedometer" customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Reports',
    to: '/reports',
    icon: <CIcon name="cil-file" customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavTitle',
    anchor: 'Adminstrations',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Admin',
    to: '/admin',
    icon: <CIcon name="cil-settings" customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
]

export default _nav
