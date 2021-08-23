import {
  FETCH_ALL_ROLES,
  FETCH_ROLE_PERMISSIONS,
  FETCH_USER_ROLES,
  FETCH_ALL_PERMISSIONS,
} from '../../assets/constants'

const initialState = {}

export const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ROLES:
      return action.payload
    default:
      return state
  }
}

export const userRole = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_ROLES:
      return action.payload.result
    default:
      return state
  }
}

export const rolesPermissions = (state = [], action) => {
  switch (action.type) {
    case FETCH_ROLE_PERMISSIONS:
      return action.payload.result
    default:
      return state
  }
}

export const permissions = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PERMISSIONS:
      return action.payload.result
    default:
      return state
  }
}
