import axios from 'axios'
import { BASE_URL, FETCH_ALL_ROLES } from '../../assets/constants'

export const fetchAllRoles = () => (dispatch) => {
  axios
    .get(`${BASE_URL}api/v1/role`)
    .then((response) => {
      dispatch({
        type: FETCH_ALL_ROLES,
        payload: response.data,
      })
    })
    .catch((error) => {
      console.log(error)
      if (error.response !== undefined) {
      }
    })
}

export const saveRole = (data, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .post(`${BASE_URL}api/v1/role`, data)
    .then((response) => {
      setIsLoading(false)
      handleSuccess(response.data)
    })
    .catch((error) => {
      setIsLoading(false)
      if (error.response !== undefined) {
        handleErrors(error.response.data)
      }
    })
}

export const editRole = (id, data, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .put(`${BASE_URL}api/v1/role/${id}`, data)
    .then((response) => {
      setIsLoading(false)
      handleSuccess(response.data)
    })
    .catch((error) => {
      setIsLoading(false)
      if (error.response !== undefined) {
        handleErrors(error.response.data)
      }
    })
}

export const deleteRole = (id, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .delete(`${BASE_URL}api/v1/role/${id}`)
    .then((response) => {
      setIsLoading(false)
      handleSuccess(response.data)
    })
    .catch((error) => {
      setIsLoading(false)
      if (error.response !== undefined) {
        handleErrors(error.response.data)
      }
    })
}
