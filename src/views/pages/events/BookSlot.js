import React, { lazy, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CHeaderText,
  CForm,
  CSpinner,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCardHeader,
  CCardTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { loginUser } from '../../../actions/admin/auth.action'
import { useCookies } from 'react-cookie'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const BookSlot = () => {
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const [additonalComments, setAdditonalComments] = useState('')
  const [value, onChange] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const { cookies, setCookie } = useCookies(['AUTH'])

  const handleErrors = (errors) => {
    if (errors.errors) {
      setErrors(errors.errors)
    }
  }

  const handleSuccess = (data) => {
    // // console.log(data)
    // setCookie('AUTH', JSON.stringify(data.success))
    // console.log(cookies)
    localStorage.setItem('AUTH', JSON.stringify(data.success))
    window.location.reload()
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="" style={{ width: '100%' }}>
                <CCardHeader>
                  <CCardTitle style={{ color: 'black', textAlign: 'center' }}>
                    JoanWinningCV 40 Minutes Consultation
                  </CCardTitle>
                </CCardHeader>
                <CCardBody className="text-center">
                  <Calendar style={{ width: '100px' }} onChange={onChange} value={value} />
                </CCardBody>
              </CCard>
              <CCard className="p-4" style={{ width: '100%' }}>
                <CCardBody></CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default BookSlot
