import { FETCH_ALL_JOBS, FETCH_ALL_JOBS_MORE, FETCH_USER_WORKGROUPS } from '../../assets/constants'

const initialState = {}

export const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_JOBS:
      return {
        ...action,
        result: action.payload,
      }
    case FETCH_ALL_JOBS_MORE:
      return {
        ...action,
        result: [...state.result, ...action.payload],
      }
    default:
      return state
  }
}
