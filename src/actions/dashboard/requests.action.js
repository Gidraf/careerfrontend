import axios from 'axios'
import {
  BASE_URL,
  FETCH_ALL_REQUEST,
  FETCH_USER_ROLES,
  FETCH_USER_WORKGROUPS,
} from '../../assets/constants'

export const fetchAllRequests = () => (dispatch) => {
  axios
    .get(`${BASE_URL}api/v1/requests`)
    .then((response) => {
      dispatch({
        type: FETCH_ALL_REQUEST,
        payload: response.data,
      })
    })
    .catch((error) => {
      console.log(error)
      if (error.response !== undefined) {
      }
    })
}
