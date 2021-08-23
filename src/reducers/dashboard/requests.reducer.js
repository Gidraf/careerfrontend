import { FETCH_ALL_REQUEST, FETCH_USER_WORKGROUPS } from '../../assets/constants'

const initialState = {}

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_REQUEST:
      return action.payload
    default:
      return state
  }
}
