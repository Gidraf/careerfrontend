import axios from 'axios'
import { BASE_URL, FETCH_ALL_WORKGROUPS, provideToken } from '../../assets/constants'

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

export const viewWorkgroupUsers =
  (id, handleErrors, handleSuccess, setIsUsersLoading) => (dispatch) => {
    setIsUsersLoading(true)
    axios
      .get(`${BASE_URL}api/v1/workgroup/${id}/users`)
      .then((response) => {
        setIsUsersLoading(false)
        handleSuccess(response.data)
      })
      .catch((error) => {
        setIsUsersLoading(false)
        if (error.response !== undefined) {
          handleErrors(error.response.data)
        }
      })
  }

export const connectGroupToGmail =
  (data, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .post(`${BASE_URL}api/v1/teams/gmail`, data)
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

export const disconnectGroupToGmail =
  (id, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .delete(`${BASE_URL}api/v1/teams/gmail/${id}`)
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
