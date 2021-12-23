import axios from 'axios'
import { FETCH_ALL_ORDERS } from '../assets/constants'

const baseUrl = `http://localhost:7000/`

export const fetchAllOrders = (start_date, end_date, status) => (dispatch) => {
  axios
    .get(`${baseUrl}reports/orders?start_date=${start_date}&end_date=${end_date}&status=${status}`)
    .then((response) => {
      console.log(response.data)

      dispatch({
        type: FETCH_ALL_ORDERS,
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
