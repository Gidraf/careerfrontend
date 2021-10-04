import {
  DASHBOARD_SELECTED,
  ADMIN_SELECTED,
  REPORTS_SELECTED,
  FETCH_MORE_ORDERS,
} from '../assets/constants'

let initialState = [
  { title: 'Analytics', to: '/analytics' },
  { title: 'Requests', to: '/requests' },
  { title: 'Jobs', to: '/jobs' },
  { title: 'Bookings', to: '/bookings' },
]
const url = window.location.href.split('/')

if (
  url[url.length - 1] === 'users' ||
  url[url.length - 1] === 'admin' ||
  url[url.length - 1] === 'workgroups' ||
  url[url.length - 1] === 'roles' ||
  url[url.length - 1] === 'services'
) {
  initialState = [
    { title: 'Users', to: '/users' },
    { title: 'Workgroups', to: '/workgroups' },
    { title: 'Roles', to: '/roles' },
    { title: 'Services', to: '/services' },
  ]
} else if (url[url.length - 1] === 'reports') {
  initialState = [
    { title: 'Users', to: '/users' },
    { title: 'Workgroups', to: '/workgroups' },
    { title: 'Roles', to: '/roles' },
    { title: 'Services', to: '/services' },
  ]
}

export const sidebarToggleReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_SELECTED:
      return [
        { title: 'Analytics', to: '/analytics' },
        { title: 'Requests', to: '/requests' },
        { title: 'Jobs', to: '/jobs' },
        { title: 'Bookings', to: '/bookings' },
      ]
    case ADMIN_SELECTED:
      return [
        { title: 'Users', to: '/users' },
        { title: 'Workgroups', to: '/workgroups' },
        { title: 'Roles', to: '/roles' },
        { title: 'Services', to: '/services' },
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
