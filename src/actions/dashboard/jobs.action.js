import axios from 'axios'
import {
  BASE_URL,
  FETCH_ALL_JOBS,
  FETCH_USER_ROLES,
  FETCH_USER_WORKGROUPS,
} from '../../assets/constants'

export const fetchAllJobs = () => (dispatch) => {
  axios
    .get(`${BASE_URL}api/v1/jobs`)
    .then((response) => {
      dispatch({
        type: FETCH_ALL_JOBS,
        payload: response.data,
      })
    })
    .catch((error) => {
      console.log(error)
      if (error.response !== undefined) {
        if (error.response.status > 400) {
          window.localStorage.removeItem('AUTH')
          window.location.reload()
        }
      }
    })
}

export const fetchJobsData =
  (id, handleSuccess, handleErrors, isLoading, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .get(`${BASE_URL}api/v1/${id}/job-details`)
      .then((response) => {
        setIsLoading(false)
        handleSuccess(response.data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
        if (error.response !== undefined) {
          if (error.response.status > 400) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
          handleErrors()
        }
      })
  }

export const startAJob =
  (id, handleSuccess, handleErrors, isLoading, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .patch(`${BASE_URL}api/v1/${id}/start`)
      .then((response) => {
        setIsLoading(false)
        handleSuccess(response.data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
        if (error.response !== undefined) {
          if (error.response.status > 400) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
          handleErrors()
        }
      })
  }

export const assignJobToUser =
  (id, data, handleSuccess, handleErrors, isLoading, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .patch(`${BASE_URL}api/v1/assign/task`, (data = data))
      .then((response) => {
        setIsLoading(false)
        handleSuccess(response.data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
        if (error.response !== undefined) {
          if (error.response.status > 400) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
          handleErrors()
        }
      })
  }

export const sendDraftEmail =
  (id, data, handleSuccess, handleErrors, isLoading, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .post(`${BASE_URL}api/v1/${id}/send/draft`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setIsLoading(false)
        handleSuccess(response.data)
      })
      .catch((error) => {
        setIsLoading(false)
        console.log(error)
        if (error.response !== undefined) {
          if (error.response.status > 400) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
          handleErrors()
        }
      })
  }
