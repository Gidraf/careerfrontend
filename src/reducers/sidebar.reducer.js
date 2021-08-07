import {
  DASHBOARD_SELECTED,
  ADMIN_SELECTED,
  REPORTS_SELECTED,
  FETCH_MORE_ORDERS,
} from '../assets/constants'

let initialState = [
  { title: 'Dashboard', to: '/dashboard' },
  { title: 'Requests', to: '/requests' },
  { title: 'Customers', to: '/customers' },
]
const url = window.location.href.split('/')

if (
  url[url.length - 1] === 'users' ||
  url[url.length - 1] === 'admin' ||
  url[url.length - 1] === 'workgroups' ||
  url[url.length - 1] === 'roles' ||
  url[url.length - 1] === 'settings'
) {
  initialState = [
    { title: 'Users', to: '/users' },
    { title: 'Workgroups', to: '/workgroups' },
    { title: 'Roles', to: '/roles' },
    { title: 'Settings', to: '/settings' },
  ]
} else if (url[url.length - 1] === 'reports') {
  initialState = [
    { title: 'Users', to: '/users' },
    { title: 'Workgroups', to: '/workgroups' },
    { title: 'Roles', to: '/roles' },
    { title: 'Settings', to: '/settings' },
  ]
}

export const sidebarToggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_SELECTED:
      return [
        { title: 'Dashboard', to: '/dashboard' },
        { title: 'Requests', to: '/requests' },
        { title: 'Customers', to: '/customers' },
      ]
    case ADMIN_SELECTED:
      return [
        { title: 'Users', to: '/users' },
        { title: 'Workgroups', to: '/workgroups' },
        { title: 'Roles', to: '/roles' },
        { title: 'Settings', to: '/settings' },
      ]
    case REPORTS_SELECTED:
      return [
        { title: 'Requests', to: '/reports/requests' },
        { title: 'Sales', to: '/reports/sales' },
        { title: 'Customers', to: '/reports/customers' },
      ]
    default:
      return state
  }
}
