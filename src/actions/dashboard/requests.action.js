import axios from 'axios'
import {
  BASE_URL,
  FETCH_ALL_REQUEST,
  FETCH_USER_ROLES,
  FETCH_USER_WORKGROUPS,
  CLEAR_ALL_REQUEST,
} from '../../assets/constants'

export const clearRequests = () => (dispatch) => {
  dispatch({
    type: CLEAR_ALL_REQUEST,
    payload: [],
    next_num: 1,
    has_next: false,
  })
}

export const fetchAllRequests =
  (query, quey_type, page, page_size, setIsLoadingMore) => (dispatch) => {
    if (setIsLoadingMore) {
      setIsLoadingMore(true)
    }
    let url = `${BASE_URL}api/v1/requests?page=${page}&page_size=20`
    if (query && quey_type) {
      url = `${url}&query=${query}&query_type=${quey_type}`
    }
    axios
      .get(url)
      .then((response) => {
        dispatch({
          type: FETCH_ALL_REQUEST,
          payload: response.data.result,
          next_num: response.data.next_num,
          has_next: response.data.has_next,
        })
        if (setIsLoadingMore) {
          setIsLoadingMore(false)
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response !== undefined) {
        }
        if (setIsLoadingMore) {
          setIsLoadingMore(false)
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
