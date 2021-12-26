import axios from 'axios'
import moment from 'moment'
import {
  BASE_URL,
  FETCH_ALL_JOBS,
  FETCH_USER_ROLES,
  FETCH_USER_WORKGROUPS,
  FETCH_ALL_JOBS_MORE,
} from '../../assets/constants'

export const fetchAllJobs =
  (query, page, page_size, startDate, endDate, group_id, setIsFetchingRequest) => (dispatch) => {
    setIsFetchingRequest(true)
    let url = `${BASE_URL}api/v1/jobs?page=${page}&page_size=${page_size}&query=${query}&start_date=${moment(
      startDate,
    ).format('MM-DD-YYYY h:mm:ss')}&end_date=${moment(endDate).format(
      'MM-DD-YYYY h:mm:ss',
    )}&group_id=${group_id ? group_id : null}`
    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: FETCH_ALL_JOBS,
          payload: response.data.result,
          next_num: response.data.next_num,
          has_next: response.data.has_next,
        })
        setIsFetchingRequest(false)
      })
      .catch((error) => {
        setIsFetchingRequest(false)
        console.log(error)
        if (error.response !== undefined) {
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
        }
      })
  }

export const fetchAllJobsMore =
  (query, page, page_size, startDate, endDate, group_id, setIsLoadingMore) => (dispatch) => {
    setIsLoadingMore(true)
    let url = `${BASE_URL}api/v1/jobs?page=${page}&page_size=${page_size}&query=${query}&start_date=${moment(
      startDate,
    ).format('MM-DD-YYYY h:mm:ss')}&end_date=${moment(endDate).format(
      'MM-DD-YYYY h:mm:ss',
    )}&group_id=${group_id ? group_id : null}`
    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: FETCH_ALL_JOBS_MORE,
          payload: response.data.result,
          next_num: response.data.next_num,
          has_next: response.data.has_next,
        })
        setIsLoadingMore(false)
      })
      .catch((error) => {
        setIsLoadingMore(false)
        console.log(error)
        if (error.response !== undefined) {
          if (error.response.status === 401 || error.response.status === 403) {
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
          if (error.response.status === 401 || error.response.status === 403) {
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
          if (error.response.status === 401 || error.response.status === 403) {
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
          if (error.response.status === 401 || error.response.status === 403) {
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
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
          handleErrors()
        }
      })
  }
