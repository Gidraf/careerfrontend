import { FETCH_ALL_WORKGROUPS, FETCH_USER_WORKGROUPS } from '../../assets/constants'

const initialState = {}

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_WORKGROUPS:
      return action.payload
    default:
      return state
  }
}

export const userGroup = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_WORKGROUPS:
      return action.payload.result
    default:
      return state
  }
}
