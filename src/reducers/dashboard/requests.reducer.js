import { CLEAR_ALL_REQUEST, FETCH_ALL_REQUEST, FETCH_USER_WORKGROUPS } from '../../assets/constants'

const initialState = {
  result: [],
}

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_REQUEST:
      return {
        has_next: action.has_next,
        next_num: action.next_num,
        result: [...state.result, ...action.payload],
      }
    case CLEAR_ALL_REQUEST:
      return {
        has_next: state.has_next,
        next_num: state.next_num,
        result: [],
      }
    default:
      return state
  }
}
