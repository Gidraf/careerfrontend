import axios from 'axios'
import {
  BASE_URL,
  FETCH_ALL_SERVICES,
  FETCH_ROLE_PERMISSIONS,
  FETCH_ALL_PERMISSIONS,
} from '../../assets/constants'

export const fetchAllServices = () => (dispatch) => {
  axios
    .get(`${BASE_URL}api/v1/service`)
    .then((response) => {
      dispatch({
        type: FETCH_ALL_SERVICES,
        payload: response.data,
      })
    })
    .catch((error) => {
      console.log(error)
      if (error.response !== undefined) {
        if (error.response.status === 401 || error.response.status === 403) {
          window.localStorage.removeItem('AUTH')
          window.location.reload()
        }
      }
    })
}

export const saveService = (data, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .post(`${BASE_URL}api/v1/service`, data)
    .then((response) => {
      setIsLoading(false)
      handleSuccess(response.data)
    })
    .catch((error) => {
      setIsLoading(false)
      if (error.response !== undefined) {
        if (error.response.status === 401 || error.response.status === 403) {
          window.localStorage.removeItem('AUTH')
          window.location.reload()
        }
        handleErrors(error.response.data)
      }
    })
}

export const editService = (id, data, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .put(`${BASE_URL}api/v1/service/${id}`, data)
    .then((response) => {
      setIsLoading(false)
      handleSuccess(response.data)
    })
    .catch((error) => {
      setIsLoading(false)
      if (error.response !== undefined) {
        if (error.response.status === 401 || error.response.status === 403) {
          window.localStorage.removeItem('AUTH')
          window.location.reload()
        }
        handleErrors(error.response.data)
      }
    })
}

export const deleteService = (id, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .delete(`${BASE_URL}api/v1/service/${id}`)
    .then((response) => {
      setIsLoading(false)
      handleSuccess(response.data)
    })
    .catch((error) => {
      setIsLoading(false)
      if (error.response !== undefined) {
        if (error.response.status === 401 || error.response.status === 403) {
          window.localStorage.removeItem('AUTH')
          window.location.reload()
        }
        handleErrors(error.response.data)
      }
    })
}
