import { FETCH_ALL_WORKGROUPS } from '../../assets/constants'

const initialState = {}

export const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_WORKGROUPS:
      return action.payload
    default:
      return state
  }
}
