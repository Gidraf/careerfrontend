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
  CForm,
  CSpinner,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { loginUser } from '../../../actions/admin/auth.action'
import { useCookies } from 'react-cookie'

const Login = () => {
  const [errors, setErrors] = useState({})
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                      <CFormControl
                        className={errors.email && 'is-invalid'}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormControl
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        {isLoading ? (
                          <CSpinner color="primary" />
                        ) : (
                          <CButton
                            onClick={() =>
                              dispatch(
                                loginUser(
                                  {
                                    email: email,
                                    password: password,
                                  },
                                  handleErrors,
                                  handleSuccess,
                                  setIsLoading,
                                ),
                              )
                            }
                            color="primary"
                            className="px-4"
                          >
                            Login
                          </CButton>
                        )}
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center"></CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
