import axios from 'axios'
import {
  BASE_URL,
  FETCH_ALL_BOOKINGS,
  FETCH_USER_ROLES,
  FETCH_USER_WORKGROUPS,
} from '../../assets/constants'

export const fetchAllBookings = () => (dispatch) => {
  axios
    .get(`${BASE_URL}api/v1/bookings`)
    .then((response) => {
      dispatch({
        type: FETCH_ALL_BOOKINGS,
        payload: response.data,
      })
    })
    .catch((error) => {
      console.log(error)
      if (error.response !== undefined) {
      }
    })
}

export const affirmBooking =
  (id, data, handleSuccess, handleErrors, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .put(`${BASE_URL}api/v1/bookings/confirm/${id}`, data)
      .then((response) => {
        setIsLoading(false)
        handleSuccess(response.data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
        if (error.response !== undefined) {
          handleErrors(error.response.data)
        }
      })
  }
