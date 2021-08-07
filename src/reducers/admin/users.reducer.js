import { FETCH_ALL_USERS } from '../../assets/constants'

const initialState = {}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return action.payload
    default:
      return state
  }
}
