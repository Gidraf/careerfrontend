import axios from 'axios'
import moment from 'moment'
import {
  BASE_URL,
  FETCH_ALL_REQUEST,
  FETCH_USER_ROLES,
  FETCH_USER_WORKGROUPS,
  CLEAR_ALL_REQUEST,
  FETCH_ALL_REQUEST_MORE,
} from '../../assets/constants'

export const fetchAllRequests =
  (query, page, page_size, startDate, endDate, setIsFetchingRequest) => (dispatch) => {
    setIsFetchingRequest(true)
    let url = `${BASE_URL}api/v1/requests?page=${page}&page_size=${page_size}&query=${query}&start_date=${moment(
      startDate,
    ).format('MM-DD-YYYY h:mm:ss')}&end_date=${moment(endDate).format('MM-DD-YYYY h:mm:ss')}`
    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: FETCH_ALL_REQUEST,
          payload: response.data.result,
          next_num: response.data.next_num,
          has_next: response.data.has_next,
        })
        setIsFetchingRequest(false)
      })
      .catch((error) => {
        console.log(error)
        if (error.response !== undefined) {
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
        }
        setIsFetchingRequest(false)
      })
  }

export const fetchAllRequestsMore =
  (query, page, page_size, startDate, endDate, setIsLoadingMore) => (dispatch) => {
    setIsLoadingMore(true)

    let url = `${BASE_URL}api/v1/requests?page=${page}&page_size=${page_size}&query=${query}&start_date=${moment(
      startDate,
    ).format('MM-DD-YYYY h:mm:ss')}&end_date=${moment(endDate).format('MM-DD-YYYY h:mm:ss')}`
    axios
      .get(url)
      .then((response) => {
        if (setIsLoadingMore) {
          dispatch({
            type: FETCH_ALL_REQUEST_MORE,
            payload: response.data.result,
            next_num: response.data.next_num,
            has_next: response.data.has_next,
          })
          setIsLoadingMore(false)
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response !== undefined) {
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
        }
        setIsLoadingMore(false)
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
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
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
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
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
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
          handleErrors()
        }
      })
  }
