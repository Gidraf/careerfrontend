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
  CListGroupItem,
  CListGroup,
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
  const [actionState, setActionState] = useState('date')
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
              <CCard className="" style={{ width: '80%', margin: 'auto', marginTop: '-11rem' }}>
                <CCardHeader>
                  <CCardTitle style={{ color: 'black', textAlign: 'center' }}>
                    JoanWinningCV 40 Minutes Consultation
                  </CCardTitle>
                </CCardHeader>
                <CCardBody className="text-center">
                  {actionState === 'date' && (
                    <Calendar
                      style={{ width: '100px' }}
                      onChange={(event) => {
                        setActionState('time')
                      }}
                      value={value}
                    />
                  )}
                  {actionState === 'time' && (
                    <CListGroup>
                      {' '}
                      <CListGroupItem component="button">Assign/Remove Permission</CListGroupItem>
                      <CListGroupItem component="button" onClick={() => {}}>
                        {' '}
                        Edit{' '}
                      </CListGroupItem>{' '}
                      <CListGroupItem component="button" onClick={() => {}}>
                        {' '}
                        Delete{' '}
                      </CListGroupItem>{' '}
                      <CListGroupItem component="button">View Permissions</CListGroupItem>{' '}
                    </CListGroup>
                  )}
                </CCardBody>
              </CCard>
              <CCard className="p-4" style={{ width: '100%' }}>
                <CCardBody></CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CButton
              size="lg"
              onClick={() => {
                if (actionState === 'time') {
                  setActionState('date')
                }
              }}
              color="secondary"
            >
              Back
            </CButton>
          </CCol>
          <CCol>
            {' '}
            <CButton size="lg" color="secondary">
              Next
            </CButton>{' '}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default BookSlot
