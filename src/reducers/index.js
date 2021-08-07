import { combineReducers } from 'redux'
import { ordersReducer } from './orders.reducer'
import { sidebarToggleReducer } from './sidebar.reducer'
import { userReducer } from './admin/users.reducer'
import { groupReducer } from './admin/group.reduce'
import { roleReducer } from './admin/role.reducer'

const allReducers = combineReducers({
  ordersReducer,
  sidebarShow: false,
  sidebarToggleReducer,
  userReducer,
  groupReducer,
  roleReducer,
})

export default allReducers
