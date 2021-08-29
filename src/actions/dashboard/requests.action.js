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

export const fetchRequestsData =
  (id, handleSuccess, handleErrors, isLoading, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .get(`${BASE_URL}api/v1/${id}/order-services`)
      .then((response) => {
        setIsLoading(false)
        handleSuccess(response.data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
        if (error.response !== undefined) {
          handleErrors()
        }
      })
  }

export const generateClientReceipt =
  (id, data, handleSuccess, handleErrors, isLoading, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .post(`${BASE_URL}api/v1/${id}/receipt`, (data = data))
      .then((response) => {
        setIsLoading(false)
        handleSuccess(response.data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
        if (error.response !== undefined) {
          handleErrors()
        }
      })
  }

export const assignJobToWorkgroup =
  (id, data, handleSuccess, handleErrors, isLoading, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .patch(`${BASE_URL}api/v1/${id}/assign/group`, (data = data))
      .then((response) => {
        setIsLoading(false)
        handleSuccess(response.data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
        if (error.response !== undefined) {
          handleErrors()
        }
      })
  }
