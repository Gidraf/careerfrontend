import {
  CLEAR_ALL_REQUEST,
  FETCH_ALL_REQUEST,
  FETCH_ALL_REQUEST_MORE,
  FETCH_USER_WORKGROUPS,
} from '../../assets/constants'

const initialState = {
  result: [],
}

export const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_REQUEST:
      return {
        has_next: action.has_next,
        next_num: action.next_num,
        result: action.payload,
      }
    case FETCH_ALL_REQUEST_MORE:
      return {
        ...action,
        result: [...state.result, ...action.payload],
      }
    default:
      return state
  }
}
