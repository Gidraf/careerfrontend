import axios from 'axios'
import { BASE_URL, FETCH_ALL_WORKGROUPS } from '../../assets/constants'

export const fetchAllgroups = () => (dispatch) => {
  axios
    .get(`${BASE_URL}api/v1/workgroup`)
    .then((response) => {
      dispatch({
        type: FETCH_ALL_WORKGROUPS,
        payload: response.data,
      })
    })
    .catch((error) => {
      console.log(error)
      if (error.response !== undefined) {
      }
    })
}

export const saveWorkgroup = (data, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .post(`${BASE_URL}api/v1/workgroup`, data)
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

export const editWorkgroup =
  (id, data, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .put(`${BASE_URL}api/v1/workgroup/${id}`, data)
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

export const deleteWorkgroup = (id, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .delete(`${BASE_URL}api/v1/workgroup/${id}`)
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
