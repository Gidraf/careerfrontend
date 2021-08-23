import axios from 'axios'

export const FETCH_ALL_ORDERS = `FETCH_ALL_ORDERS`
export const FETCH_ALL_CUSTOMERS = `FETCH_ALL_CUSTOMERS`
export const FETCH_ALL_PERMISSIONS = `FETCH_ALL_PERMISSIONS`
export const FETCH_MORE_CUSTOMERS = `FETCH_ALL_CUSTOMERS`
export const FETCH_MORE_ORDERS = `FETCH_MORE_ORDERS`
export const ADMIN_SELECTED = `ADMIN_SELECTED`
export const DASHBOARD_SELECTED = `DASHBOARD_SELECTED`
export const REPORTS_SELECTED = `REPORTS_SELECTED`
export const BASE_URL = `https://cvpap.herokuapp.com//`
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS'
export const FETCH_ALL_WORKGROUPS = 'FETCH_ALL_WORKGROUPS'
export const FETCH_ALL_ROLES = 'FETCH_ALL_ROLES'
export const FETCH_USER_ROLES = 'FETCH_USER_ROLES'
export const FETCH_USER_WORKGROUPS = 'FETCH_USER_WORKGROUP'
export const FETCH_ROLE_PERMISSIONS = 'FETCH_ROLE_PERMISSIONS'
export const FETCH_ALL_REQUEST = 'FETCH_ALL_REQUEST'

export const provideToken = () => {
  const user = localStorage.getItem('AUTH')

  if (user) {
    // const { access_token } = user;
    const token = JSON.parse(user).access_token
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}
