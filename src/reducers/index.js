import { combineReducers } from 'redux'
import { ordersReducer } from './orders.reducer'
import { sidebarToggleReducer } from './sidebar.reducer'
import { userReducer } from './admin/users.reducer'
import { groupReducer, userGroup } from './admin/group.reduce'
import { roleReducer, userRole, rolesPermissions, permissions } from './admin/role.reducer'
import { serviceReducer } from './admin/service.reducer'
import { requestReducer } from './dashboard/requests.reducer'
import { jobReducer } from './dashboard/jobs.reducer'
import { bookingReducer } from './dashboard/bookings.reducer'

const allReducers = combineReducers({
  ordersReducer,
  sidebarShow: false,
  sidebarToggleReducer,
  userReducer,
  groupReducer,
  roleReducer,
  userRole,
  userGroup,
  rolesPermissions,
  permissions,
  requestReducer,
  serviceReducer,
  jobReducer,
  bookingReducer,
})

export default allReducers
