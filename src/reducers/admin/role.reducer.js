import { FETCH_ALL_ROLES } from '../../assets/constants'

const initialState = {}

export const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ROLES:
      return action.payload
    default:
      return state
  }
}
