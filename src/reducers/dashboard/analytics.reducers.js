import { FETCH_GOLD_ANALYTICS } from 'src/assets/constants'

const initialState = {
  result: [],
}

export const goldReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GOLD_ANALYTICS:
      return {
        result: action.payload,
      }
    default:
      return state
  }
}
