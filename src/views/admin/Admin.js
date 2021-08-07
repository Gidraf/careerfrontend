import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CBadge,
  CAlert,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CListGroupItem,
  CListGroup,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPopover,
} from '@coreui/react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { CContainer, CSpinner } from '@coreui/react'
import { fetchAllUsers, editUser, deleteUser } from '../../actions/admin/user.action'

const Users = () => {
  const dispatch = useDispatch()
  const [sirName, setSirName] = useState('')
  const [otherName, setOtherName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setuserName] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(null)
  const [isSuccess, setisSucess] = useState(false)
  const [actionState, setAction] = useState(null)

  const users = useSelector((state) => state.userReducer)
  useEffect(() => dispatch(fetchAllUsers()), []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleErrors = (errors) => {
    setErrors(errors.errors)
  }

  const handleSuccess = (data) => {
    setisSucess(true)
    dispatch(fetchAllUsers())
  }

  const selectUser = (item, actionState) => {
    setAction(actionState)
    setId(item.id)
    setSirName(item.sir_name)
    setOtherName(item.other_name)
    setLastName(item.last_name)
    setEmail(item.email)
    setuserName(item.username)
    setPhonenumber(item.phonenumber)
    setVisible(true)
    setisSucess(false)
  }

  const SubmitUser = () => {
    if (id !== null) {
      dispatch(
        editUser(
          id,
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
  }

  const resetModal = () => {
    setId(null)
    setVisible(false)
    setSirName('')
    setOtherName('')
    setLastName('')
    setEmail('')
    setuserName('')
    setPhonenumber('')
  }

  return (
    <>
      <CModal visible={visible} onDismiss={() => resetModal}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>
            {isSuccess && <CAlert color="success">User Successfully Edited!</CAlert>}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {actionState === 'edit' ? (
            <CForm className="row g-3">
              <h3>Edit User</h3>
              <p className="text-medium-emphasis">Edit {sirName}</p>
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
                  onClick={resetModal}
                  className="btn btn-primary"
                  type="button"
                  size="lg"
                  value="Close"
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
                    value="Edit User"
                  />
                )}
              </CCol>
            </CForm>
          ) : (
            <span>Are you sure you want to delete {sirName}</span>
          )}
        </CModalBody>
        {actionState === 'delete' && (
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                setVisible(false)
              }}
            >
              No
            </CButton>
            <CButton
              onClick={() => {
                if (id !== null) {
                  dispatch(deleteUser(id, handleErrors, handleSuccess, setIsLoading))
                }
              }}
              color="primary"
            >
              Yes
            </CButton>
          </CModalFooter>
        )}
      </CModal>
      <CTable striped hover responsive align="middle" className="mb-0 border">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Sir Name</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Last Name</CTableHeaderCell>
            <CTableHeaderCell>Other Name</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Username</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Phonenumber</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>{users.result && renderUsers(users.result, selectUser)}</CTableBody>
      </CTable>
    </>
  )
}

const renderUsers = (users, selectUser) => {
  const allUsers = users.map((item, i) => (
    <CTableRow key={i}>
      <CTableDataCell>
        <div>{item.sir_name}</div>
        <div className="small text-medium-emphasis">{item.created_at}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center">
        {/* <CIcon size="xl" name="cif-us" title="us" id="us" /> */}
        <span>{item.last_name}</span>
      </CTableDataCell>
      <CTableDataCell>
        <div>{item.other_name}</div>
        {/* <div className="small text-medium-emphasis">{item.customer_ordered.registered_on}</div> */}
      </CTableDataCell>
      <CTableDataCell className="text-center">
        <div>{item.username}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center">
        <div>{item.email}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center">
        <div>{item.phonenumber}</div>
      </CTableDataCell>
      <CTableDataCell>
        {item.status ? (
          <CBadge color="success">{'Active'}</CBadge>
        ) : (
          <CBadge color="danger">{'Deactivated'}</CBadge>
        )}
        {/* <strong>10 sec ago</strong> */}
      </CTableDataCell>
      {/* <CTableDataCell>
        <div className="clearfix">
          <div className="float-start">
            <strong>50%</strong>
          </div>
          <div className="float-end">
            <small className="text-medium-emphasis">Jun 11, 2015 - Jul 10, 2015</small> 1st Draft
          </div>
        </div>
        <CProgress thin color="success" value={50} />
      </CTableDataCell> */}
      <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
        <CPopover
          title="More Actions"
          content={renderPopOverContent(item, selectUser)}
          placement="bottom"
        >
          <CIcon name="cil-settings" size="lg" />
        </CPopover>
      </CTableDataCell>
    </CTableRow>
  ))

  return allUsers
}

const renderPopOverContent = (item, selectUser) => (
  <CListGroup>
    <CListGroupItem component="button">Assign/Remove Role</CListGroupItem>
    <CListGroupItem component="button">Assign/Remove Workgroup</CListGroupItem>
    <CListGroupItem component="button">Assign/Remove Task</CListGroupItem>
    <CListGroupItem
      component="button"
      onClick={() => {
        selectUser(item, 'edit')
      }}
    >
      Edit User
    </CListGroupItem>
    <CListGroupItem
      component="button"
      onClick={() => {
        selectUser(item, 'delete')
      }}
    >
      Delete User
    </CListGroupItem>
    <CListGroupItem component="button">See current Tasks</CListGroupItem>
    <CListGroupItem component="button">Sent a Message</CListGroupItem>
    <CListGroupItem component="button">See User Report</CListGroupItem>
    <CListGroupItem component="button">
      {item.status ? 'Deactivate User' : 'Activate User'}
    </CListGroupItem>
  </CListGroup>
)

export default Users
