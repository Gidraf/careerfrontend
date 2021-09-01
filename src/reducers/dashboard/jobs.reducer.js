import { FETCH_ALL_JOBS, FETCH_USER_WORKGROUPS } from '../../assets/constants'

const initialState = {}

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_JOBS:
      return action.payload
    default:
      return state
  }
}
