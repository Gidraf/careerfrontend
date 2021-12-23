import axios from 'axios'
import {
  BASE_URL,
  FETCH_ALL_ROLES,
  FETCH_ROLE_PERMISSIONS,
  FETCH_ALL_PERMISSIONS,
} from '../../assets/constants'

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
        if (error.response.status === 401 || error.response.status === 403) {
          window.localStorage.removeItem('AUTH')
          window.location.reload()
        }
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
        if (error.response.status === 401 || error.response.status === 403) {
          window.localStorage.removeItem('AUTH')
          window.location.reload()
        }
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
        if (error.response.status === 401 || error.response.status === 403) {
          window.localStorage.removeItem('AUTH')
          window.location.reload()
        }
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
        if (error.response.status === 401 || error.response.status === 403) {
          window.localStorage.removeItem('AUTH')
          window.location.reload()
        }
        handleErrors(error.response.data)
      }
    })
}

export const viewRolePermissions =
  (id, handleErrors, handleSuccess, setIsPermissionLoading) => (dispatch) => {
    setIsPermissionLoading(true)
    axios
      .get(`${BASE_URL}api/v1/role/${id}/permissions`)
      .then((response) => {
        setIsPermissionLoading(false)
        dispatch({
          type: FETCH_ROLE_PERMISSIONS,
          payload: response.data,
        })
        handleSuccess(response.data)
      })
      .catch((error) => {
        setIsPermissionLoading(false)
        if (error.response !== undefined) {
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
          handleErrors(error.response.data)
        }
      })
  }

export const viewRoleUsers = (id, handleErrors, handleSuccess, setIsUsersLoading) => (dispatch) => {
  setIsUsersLoading(true)
  axios
    .get(`${BASE_URL}api/v1/role/${id}/users`)
    .then((response) => {
      setIsUsersLoading(false)
      handleSuccess(response.data)
    })
    .catch((error) => {
      setIsUsersLoading(false)
      if (error.response !== undefined) {
        if (error.response.status === 401 || error.response.status === 403) {
          window.localStorage.removeItem('AUTH')
          window.location.reload()
        }
        handleErrors(error.response.data)
      }
    })
}

export const viewAllPermissions =
  (id, handleErrors, handleSuccess, setIsUsersLoading) => (dispatch) => {
    // setIsUsersLoading(true)
    axios
      .get(`${BASE_URL}api/v1/permissions`)
      .then((response) => {
        // setIsUsersLoading(false)
        dispatch({
          type: FETCH_ALL_PERMISSIONS,
          payload: response.data,
        })
        // handleSuccess(response.data)
      })
      .catch((error) => {
        // setIsUsersLoading(false)
        if (error.response !== undefined) {
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
        }
      })
  }

export const addRolePermissions =
  (id, data, handleErrors, handleUserPermissionAddedSuccess, setIsAddingPermissionLoading) =>
  (dispatch) => {
    setIsAddingPermissionLoading(true)
    axios
      .post(`${BASE_URL}api/v1/role/${id}/permissions`, data)
      .then((response) => {
        setIsAddingPermissionLoading(false)
        handleUserPermissionAddedSuccess(response.data)
      })
      .catch((error) => {
        setIsAddingPermissionLoading(false)
        if (error.response !== undefined) {
          if (error.response.status === 401 || error.response.status === 403) {
            window.localStorage.removeItem('AUTH')
            window.location.reload()
          }
          handleErrors(error.response.data)
        }
      })
  }
