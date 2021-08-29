import { FETCH_ALL_SERVICES } from '../../assets/constants'

const initialState = {}

export const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_SERVICES:
      return action.payload
    default:
      return state
  }
}
