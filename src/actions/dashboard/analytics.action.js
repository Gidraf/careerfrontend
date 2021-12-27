import axios from 'axios'
import moment from 'moment'
import { BASE_URL, FETCH_GOLD_ANALYTICS } from '../../assets/constants'

export const fetchGoldAnalytics = (startDate, endDate, setIsFetchingRequest) => (dispatch) => {
  setIsFetchingRequest(true)
  let url = `${BASE_URL}api/v1/dashboard_cv_analytics?&start_date=${moment(startDate).format(
    'YYYY-MM-DD h:mm:ss',
  )}&end_date=${moment(endDate).format('YYYY-MM-DD h:mm:ss')}`
  axios
    .get(url)
    .then((response) => {
      dispatch({
        type: FETCH_GOLD_ANALYTICS,
        payload: response.data.result,
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
