import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CContainer,
  CForm,
  CSpinner,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { saveUser } from '../../actions/admin/user.action'

const UserForm = () => {
  const [sirName, setSirName] = useState('')
  const [otherName, setOtherName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setuserName] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleErrors = (errors) => {
    setErrors(errors.errors)
  }

  const handleSuccess = (data) => {
    setVisible(true)
  }

  const SubmitUser = () => {
    dispatch(
      saveUser(
        {
          sir_name: sirName,
          phonenumber: phonenumber,
          email: email,
          username: username,
          last_name: lastName,
          other_name: otherName,
        },
        handleErrors,
        handleSuccess,
        setIsLoading,
      ),
    )
  }

  return (
    // <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CModal visible={visible} onDismiss={() => setVisible(false)}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>User Added Successfully!</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to add another User?</CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false)
              history.push('/admin')
            }}
          >
            No
          </CButton>
          <CButton
            onClick={() => {
              setSirName('')
              setOtherName('')
              setLastName('')
              setEmail('')
              setuserName('')
              setPhonenumber('')
              setVisible(false)
            }}
            color="primary"
          >
            Yes
          </CButton>
        </CModalFooter>
      </CModal>
      <CRow className="justify-content-center">
        <CCol md="9" lg="7" xl="6">
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm className="row g-3">
                <h3>New User</h3>
                <p className="text-medium-emphasis">Add a new User</p>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon name="cil-user" />
                  </CInputGroupText>
                  <CFormControl
                    value={sirName}
                    className={errors.sir_name && 'is-invalid'}
                    onChange={(e) => {
                      setErrors({})
                      setSirName(e.target.value)
                    }}
                    size="lg"
                    placeholder={!errors.sir_name ? 'Sir Name' : errors.sir_name[0]}
                    autoComplete="Sir Name"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon name="cil-user" />
                  </CInputGroupText>
                  <CFormControl
                    value={lastName}
                    className={errors.last_name && 'is-invalid'}
                    onChange={(e) => {
                      setErrors({})
                      setLastName(e.target.value)
                    }}
                    size="lg"
                    placeholder={!errors.last_name ? 'Last Name' : errors.last_name[0]}
                    autoComplete="Last Name"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon name="cil-user" />
                  </CInputGroupText>
                  <CFormControl
                    value={otherName}
                    className={errors.other_name && 'is-invalid'}
                    onChange={(e) => {
                      setErrors({})
                      setOtherName(e.target.value)
                    }}
                    size="lg"
                    placeholder={!errors.other_name ? 'Other Name' : errors.other_name[0]}
                    autoComplete="Other Name"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon name="cil-user" />
                  </CInputGroupText>
                  <CFormControl
                    value={username}
                    className={errors.username && 'is-invalid'}
                    onChange={(e) => {
                      setErrors({})
                      setuserName(e.target.value)
                    }}
                    size="lg"
                    placeholder={!errors.username ? 'Username' : errors.username[0]}
                    autoComplete="Username"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormControl
                    value={email}
                    className={errors.email && 'is-invalid'}
                    onChange={(e) => {
                      setErrors({})
                      setEmail(e.target.value)
                    }}
                    size="lg"
                    placeholder={!errors.email ? 'Email' : errors.email[0]}
                    autoComplete="email"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon name="cil-phone" />
                  </CInputGroupText>
                  <CFormControl
                    value={phonenumber}
                    className={errors.phonenumber && 'is-invalid'}
                    onChange={(e) => {
                      setErrors({})
                      setPhonenumber(e.target.value)
                    }}
                    size="lg"
                    type="tel"
                    placeholder={!errors.phonenumber ? 'Phonenumber' : errors.phonenumber[0]}
                  />
                </CInputGroup>

                <CCol xs="6">
                  <CFormControl
                    onClick={() => {
                      setVisible(false)
                      history.push('/admin')
                    }}
                    className="btn btn-primary"
                    type="button"
                    size="lg"
                    value="Back"
                  />
                </CCol>
                <CCol xs="6">
                  {isLoading ? (
                    <CSpinner component="span" size="lg" aria-hidden="true" />
                  ) : (
                    <CFormControl
                      onClick={SubmitUser}
                      className="btn btn-success"
                      type="button"
                      size="lg"
                      value="Add User"
                    />
                  )}
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
    // </div>
  )
}

export default UserForm
