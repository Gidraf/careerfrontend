import { FETCH_ALL_BOOKINGS } from '../../assets/constants'

const initialState = {}

export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_BOOKINGS:
      return action.payload
    default:
      return state
  }
}
