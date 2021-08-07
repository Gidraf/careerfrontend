import { FETCH_ALL_ORDERS, FETCH_MORE_ORDERS } from '../assets/constants'

const initialState = {}

// export const ordersReportsReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case FETCH_ALL_ORDERS:
//         return action.payload;
//       default:
//         return state;
//     }
//   }

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ORDERS:
      return action.payload
    default:
      return state
  }
}
