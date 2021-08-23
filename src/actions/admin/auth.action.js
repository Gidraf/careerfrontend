import axios from 'axios'
import { BASE_URL } from '../../assets/constants'

export const loginUser = (data, handleErrors, handleSuccess, setIsLoading) => (dispatch) => {
  setIsLoading(true)
  axios
    .post(`${BASE_URL}api/v1/login`, data)
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
