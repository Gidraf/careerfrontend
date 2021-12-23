import axios from 'axios'
import {
  BASE_URL,
  FETCH_ALL_USERS,
  FETCH_USER_ROLES,
  FETCH_USER_WORKGROUPS,
} from '../../assets/constants'

export const fetchAllUsers = () => (dispatch) => {
  axios
    .get(`${BASE_URL}api/v1/user`)
    .then((response) => {
      dispatch({
        type: FETCH_ALL_USERS,
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

export const saveUser = (data, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .post(`${BASE_URL}api/v1/user`, data)
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

export const editUser = (id, data, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .put(`${BASE_URL}api/v1/user/${id}`, data)
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

export const deleteUser = (id, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .delete(`${BASE_URL}api/v1/user/${id}`)
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

export const enableDisableUser =
  (id, action, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
    setIsLoading(true)
    axios
      .patch(`${BASE_URL}api/v1/user/${id}/${action}`)
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

export const viewUserRoles = (id, handleErrors, handleSuccess, setIsRoleLoading) => (dispatch) => {
  setIsRoleLoading(true)
  axios
    .get(`${BASE_URL}api/v1/user/${id}/role`)
    .then((response) => {
      setIsRoleLoading(false)
      dispatch({
        type: FETCH_USER_ROLES,
        payload: response.data,
      })
      handleSuccess(response.data)
    })
    .catch((error) => {
      setIsRoleLoading(false)
      if (error.response !== undefined) {
        if (error.response.status === 401 || error.response.status === 403) {
          window.localStorage.removeItem('AUTH')
          window.location.reload()
        }
        handleErrors(error.response.data)
      }
    })
}

export const addUserRoles =
  (id, data, handleErrors, handleUserROleAddedSuccess, setIsAddingRoleLoading) => (dispatch) => {
    setIsAddingRoleLoading(true)
    axios
      .post(`${BASE_URL}api/v1/user/${id}/role`, data)
      .then((response) => {
        setIsAddingRoleLoading(false)
        handleUserROleAddedSuccess(response.data)
      })
      .catch((error) => {
        setIsAddingRoleLoading(false)
        if (error.response !== undefined) {
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
          handleErrors(error.response.data)
        }
      })
  }

export const viewUserWorkGroups =
  (id, handleErrors, handleSuccess, setIsWorkgroupLoading) => (dispatch) => {
    setIsWorkgroupLoading(true)
    axios
      .get(`${BASE_URL}api/v1/user/${id}/workgroup`)
      .then((response) => {
        setIsWorkgroupLoading(false)
        dispatch({
          type: FETCH_USER_WORKGROUPS,
          payload: response.data,
        })
        handleSuccess(response.data)
      })
      .catch((error) => {
        setIsWorkgroupLoading(false)
        if (error.response !== undefined) {
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
          handleErrors(error.response.data)
        }
      })
  }

export const addUserGroups =
  (id, data, handleErrors, handleUserGroupAddedSuccess, setIsAddingGroupLoading) => (dispatch) => {
    setIsAddingGroupLoading(true)
    axios
      .post(`${BASE_URL}api/v1/user/${id}/workgroup`, data)
      .then((response) => {
        setIsAddingGroupLoading(false)
        handleUserGroupAddedSuccess(response.data)
      })
      .catch((error) => {
        setIsAddingGroupLoading(false)
        if (error.response !== undefined) {
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
          handleErrors(error.response.data)
        }
      })
  }
