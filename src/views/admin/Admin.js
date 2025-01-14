import React, { lazy, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardTitle,
  CForm,
  CToast,
  CToaster,
  CToastBody,
  CToastHeader,
  CCollapse,
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
  CCallout,
} from '@coreui/react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { CContainer, CSpinner } from '@coreui/react'
import {
  fetchAllUsers,
  editUser,
  deleteUser,
  enableDisableUser,
  viewUserRoles,
  viewUserWorkGroups,
  addUserRoles,
  addUserGroups,
} from '../../actions/admin/user.action'
import { fetchAllRoles } from '../../actions/admin/role.action'

import { fetchAllgroups } from '../../actions/admin/group.action'

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
  const [activateMessage, setMessage] = useState('')
  const [collapsibleVisible, setCollapsible] = useState(false)
  const users = useSelector((state) => state.userReducer)
  const roles = useSelector((state) => state.roleReducer)
  const workgroups = useSelector((state) => state.groupReducer)
  const reduceRoles = useSelector((state) => state.userRole)

  const reduceGroups = useSelector((state) => state.userGroup)
  const [isWorkgroupLoading, setIsWorkgroupLoading] = useState(false)
  const [isRoleLoading, setIsRoleLoading] = useState(false)
  const [userWorkgroupps, setUserWorkgroups] = useState([])
  const [userRoles, setUserRoles] = useState([])
  const [isEditRole, setisEditRole] = useState(false)
  const [isEditGroup, setIsEditGroup] = useState(false)
  const [toast, addToast] = useState(0)
  const [wtoast, addWToast] = useState(0)
  const toaster = useRef()
  const wToaster = useRef()
  const [isAddingRoleLoading, setIsAddingRoleLoading] = useState(false)
  const [isAddingGroupLoading, setIsAddingGroupLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(fetchAllRoles())
    dispatch(fetchAllgroups())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleErrors = (errors) => {
    if (errors.errors) {
      setErrors(errors.errors)
    }
  }

  const handleSuccess = (data) => {
    setisSucess(true)
    if (actionState !== `edit`) {
      setVisible(false)
    }
    dispatch(fetchAllUsers())
  }

  const handleUserROleAddedSuccess = (data) => {
    dispatch(viewUserRoles(id, handleErrors, handleRolesSuccess, setIsRoleLoading))
    setisEditRole(false)
  }

  const handleUserGroupAddedSuccess = (data) => {
    dispatch(viewUserWorkGroups(id, handleErrors, handleWorkgroupSuccess, setIsWorkgroupLoading))
    setIsEditGroup(false)
  }

  const saveUserRoles = () => {
    const data = []
    if (isEditRole) {
      for (let i = 0; i < userRoles.length; i++) {
        data.push(userRoles[i].id)
      }
    }
    dispatch(
      addUserRoles(
        id,
        { roles: data },
        handleErrors,
        handleUserROleAddedSuccess,
        setIsAddingRoleLoading,
      ),
    )
  }

  const saveUserGroups = () => {
    const data = []
    if (isEditGroup) {
      for (let i = 0; i < userWorkgroupps.length; i++) {
        data.push(userWorkgroupps[i].id)
      }
    }
    dispatch(
      addUserGroups(
        id,
        { groups: data },
        handleErrors,
        handleUserGroupAddedSuccess,
        setIsAddingGroupLoading,
      ),
    )
  }

  const handleRolesSuccess = (data) => {
    setUserRoles(data.result)
  }

  const handleWorkgroupSuccess = (data) => {
    setUserWorkgroups(data.result)
  }

  const setCollapsibleVisible = (item) => {
    if (collapsibleVisible) {
      setCollapsible(false)
      setId(null)
      setUserRoles([])
      setUserWorkgroups([])
      return
    }
    setId(item.id)
    setCollapsible(true)
    dispatch(viewUserRoles(item.id, handleErrors, handleRolesSuccess, setIsRoleLoading))
    dispatch(
      viewUserWorkGroups(item.id, handleErrors, handleWorkgroupSuccess, setIsWorkgroupLoading),
    )
  }

  const selectUser = (item, actionState) => {
    if (item.status) {
      setMessage(`Are Sure you want to Deactivate ${item.sir_name}`)
    }
    if (!item.status) {
      setMessage(`Are Sure you want to Activate ${item.sir_name}`)
    }
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
    setCollapsible(false)
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

  const discardRolesChanges = () => {
    console.log(reduceRoles)
    setUserRoles(reduceRoles)
    setisEditRole(false)
  }

  const discardGroupssChanges = () => {
    setUserWorkgroups(reduceGroups)
    setIsEditGroup(false)
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

  const roleErrorToast = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Some Changes will be Lost</strong>
      </CToastHeader>
      <CToastBody>Please Discard or save the Changes made on User Roles</CToastBody>
    </CToast>
  )

  const GroupErrorToast = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Some Changes will be Lost</strong>
      </CToastHeader>
      <CToastBody>Please Discard or save the Changes made on User Workgroups</CToastBody>
    </CToast>
  )

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CToaster ref={wToaster} push={wtoast} placement="top-end" />
      <CModal visible={visible} onDismiss={() => resetModal}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>
            {isSuccess && <CAlert color="success">User Successfully Edited!</CAlert>}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {actionState === 'edit' && (
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
          )}
          {actionState === 'delete' && <span>Are you sure you want to delete {sirName}</span>}
          {(actionState === 'activate' || actionState === 'deactivate') && (
            <span>{activateMessage}</span>
          )}
        </CModalBody>
        {actionState !== 'edit' && (
          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                resetModal()
              }}
            >
              No
            </CButton>
            <CButton
              onClick={() => {
                if (id !== null && actionState === 'delete') {
                  dispatch(deleteUser(id, handleErrors, handleSuccess, setIsLoading))
                }
                if (id !== null && (actionState === 'activate' || actionState === 'deactivate')) {
                  dispatch(
                    enableDisableUser(
                      id,
                      actionState === 'activate' ? 'enable' : 'disable',
                      handleErrors,
                      handleSuccess,
                      setIsLoading,
                    ),
                  )
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
        <CTableBody>
          {users.result &&
            renderUsers(
              users.result,
              selectUser,
              setCollapsibleVisible,
              id,
              collapsibleVisible,
              isRoleLoading,
              isWorkgroupLoading,
              isEditRole,
              addToast,
              roleErrorToast,
              isEditGroup,
              addWToast,
              GroupErrorToast,
            )}
        </CTableBody>
      </CTable>
      <CCollapse visible={collapsibleVisible}>
        <CContainer className="overflow-auto">
          <CRow xs={{ gutterX: 0.5 }}>
            <CCol>
              <CCallout color="primary" style={{ padding: 0 }}>
                <CCard className="mt-1">
                  <CCardHeader>
                    <CRow>
                      <CCol className="col-9">
                        <CCardTitle>Roles</CCardTitle>
                      </CCol>
                      <CCol className="col-3">
                        <CPopover
                          title="Assign Roles"
                          trigger="click"
                          content={renderRoles(
                            roles,
                            isEditRole,
                            setisEditRole,
                            userRoles,
                            setUserRoles,
                            collapsibleVisible,
                            discardRolesChanges,
                            isAddingRoleLoading,
                            saveUserRoles,
                          )}
                          placement="bottom"
                        >
                          <CButton size="sm">Add ➕</CButton>
                        </CPopover>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CListGroup>
                      {isRoleLoading && <CSpinner component="span" aria-hidden="true" />}
                      {userRoles.map((item, i) => (
                        <CListGroupItem key={i}>
                          <strong>{item.name}</strong>
                          <br />
                          <small className="small text-medium-emphasis">{item.description}</small>
                        </CListGroupItem>
                      ))}
                    </CListGroup>
                  </CCardBody>
                </CCard>
              </CCallout>
            </CCol>
            <CCol>
              <CCallout color="primary" style={{ padding: 0 }}>
                <CCard className="mt-1" style={{ marginTop: 0 }}>
                  <CCardHeader>
                    <CRow>
                      <CCol className="col-9">
                        <CCardTitle>Workgroups</CCardTitle>
                      </CCol>
                      <CCol className="col-3">
                        <CPopover
                          title="Assign Roles"
                          trigger="click"
                          content={renderGroups(
                            workgroups,
                            isEditGroup,
                            setIsEditGroup,
                            userWorkgroupps,
                            setUserWorkgroups,
                            collapsibleVisible,
                            discardGroupssChanges,
                            isAddingGroupLoading,
                            saveUserGroups,
                          )}
                          placement="bottom"
                        >
                          <CButton size="sm">Add ➕</CButton>
                        </CPopover>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CListGroup>
                      {isWorkgroupLoading && <CSpinner component="span" aria-hidden="true" />}
                      {userWorkgroupps &&
                        userWorkgroupps.map((item, i) => (
                          <CListGroupItem key={i}>
                            <strong>{item.name}</strong>
                            <br />
                            <small className="small text-medium-emphasis">{item.description}</small>
                          </CListGroupItem>
                        ))}
                    </CListGroup>
                  </CCardBody>
                </CCard>
              </CCallout>
            </CCol>
            <CCol>
              <CCallout color="primary" style={{ padding: 0 }}>
                <CCard className="mt-1" style={{ marginTop: 0 }}>
                  <CCardHeader>
                    <CCardTitle>Tasks </CCardTitle>
                  </CCardHeader>
                  <CCardBody></CCardBody>
                </CCard>
              </CCallout>
            </CCol>
          </CRow>
        </CContainer>
      </CCollapse>
    </>
  )
}

const renderUsers = (
  users,
  selectUser,
  setCollapsibleVisible,
  id,
  collapsibleVisible,
  isRoleLoading,
  isWorkgroupLoading,
  isEditRole,
  addToast,
  roleErrorToast,
  isEditGroup,
  addWToast,
  GroupErrorToast,
) => {
  const currentUser = users.filter((user) => user.id === id)
  let filteredUsers = users
  if (currentUser.length > 0 && collapsibleVisible) {
    filteredUsers = currentUser
  }
  const allUsers = filteredUsers.map((item, i) => (
    <CTableRow key={i} style={{ cursor: 'pointer' }}>
      <CTableDataCell
        onClick={() => {
          if (!isRoleLoading && !isWorkgroupLoading)
            if (isEditRole) {
              addToast(roleErrorToast)
              return
            }
          if (isEditGroup) {
            addWToast(GroupErrorToast)
            return
          }
          setCollapsibleVisible(item)
        }}
      >
        <strong>{item.sir_name}</strong>
        {/* <small className="small text-medium-emphasis">{item.created_at}</small> */}
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => {
          if (!isRoleLoading && !isWorkgroupLoading)
            if (isEditRole) {
              addToast(roleErrorToast)

              return
            }
          if (isEditGroup) {
            addWToast(GroupErrorToast)
            return
          }
          setCollapsibleVisible(item)
        }}
      >
        {/* <CIcon size="xl" name="cif-us" title="us" id="us" /> */}
        <strong>{item.last_name}</strong>
      </CTableDataCell>
      <CTableDataCell
        onClick={() => {
          if (!isRoleLoading && !isWorkgroupLoading)
            if (isEditRole) {
              addToast(roleErrorToast)

              return
            }
          if (isEditGroup) {
            addWToast(GroupErrorToast)
            return
          }
          setCollapsibleVisible(item)
        }}
      >
        <strong>{item.other_name}</strong>
        {/* <div className="small text-medium-emphasis">{item.customer_ordered.registered_on}</div> */}
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => {
          if (!isRoleLoading && !isWorkgroupLoading)
            if (isEditRole) {
              addToast(roleErrorToast)

              return
            }
          if (isEditGroup) {
            addWToast(GroupErrorToast)
            return
          }
          setCollapsibleVisible(item)
        }}
      >
        <strong>{item.username}</strong>
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => {
          if (!isRoleLoading && !isWorkgroupLoading)
            if (isEditRole) {
              addToast(roleErrorToast)

              return
            }
          if (isEditGroup) {
            addWToast(GroupErrorToast)
            return
          }
          setCollapsibleVisible(item)
        }}
      >
        <div>{item.email}</div>
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => {
          if (!isRoleLoading && !isWorkgroupLoading)
            if (isEditRole) {
              addToast(roleErrorToast)

              return
            }
          if (isEditGroup) {
            addWToast(GroupErrorToast)
            return
          }
          setCollapsibleVisible(item)
        }}
      >
        <strong>{item.phonenumber}</strong>
      </CTableDataCell>
      <CTableDataCell
        onClick={() => {
          if (!isRoleLoading && !isWorkgroupLoading)
            if (isEditRole) {
              addToast(roleErrorToast)

              return
            }
          if (isEditGroup) {
            addWToast(GroupErrorToast)
            return
          }
          setCollapsibleVisible(item)
        }}
      >
        {item.status ? (
          <CBadge color="success">{'Active'}</CBadge>
        ) : (
          <CBadge color="danger">{'Deactivated'}</CBadge>
        )}
        {/* <strong>10 sec ago</strong> */}
      </CTableDataCell>

      <CTableDataCell className="text-center">
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
    <CListGroupItem component="button">See current Tasks</CListGroupItem>
    <CListGroupItem component="button">Sent a Message</CListGroupItem>
    <CListGroupItem component="button">See User Report</CListGroupItem>
    <CListGroupItem
      component="button"
      style={{
        color: item.status ? `black` : 'white',
      }}
      color={item.status ? `warning` : 'success'}
      onClick={() => {
        selectUser(item, item.status ? 'deactivate' : 'activate')
      }}
    >
      {item.status ? 'Deactivate User' : 'Activate User'}
    </CListGroupItem>
    <CListGroupItem
      component="button"
      color="info"
      style={{
        color: 'white',
      }}
      onClick={() => {
        selectUser(item, 'edit')
      }}
    >
      Edit User
    </CListGroupItem>
    <CListGroupItem
      component="button"
      color="danger"
      style={{
        color: 'white',
      }}
      onClick={() => {
        selectUser(item, 'delete')
      }}
    >
      Delete User
    </CListGroupItem>
  </CListGroup>
)

const renderRoles = (
  roles,
  isEditRole,
  setisEditRole,
  userRoles,
  setUserRoles,
  collapsibleVisible,
  discardRolesChanges,
  isAddingRoleLoading,
  saveUserRoles,
) => (
  <div style={{ width: '130px' }}>
    {roles.result &&
      roles.result.map((item, i) => (
        <div key={i} className="mb-1">
          <strong style={{ float: 'left' }}>{item.name}</strong>
          {!isAddingRoleLoading && (
            <CAvatar
              onClick={() => {
                if (userRoles.filter((role) => role.id === item.id).length == 0) {
                  setUserRoles([...userRoles, item])
                } else {
                  setUserRoles(userRoles.filter((role) => role.id !== item.id))
                }
                setisEditRole(true)
              }}
              style={{
                float: 'right',
                cursor: 'pointer',
              }}
              src={
                collapsibleVisible && userRoles.filter((role) => role.id === item.id).length == 0
                  ? 'https://res.cloudinary.com/g-draf-inc/image/upload/v1621414081/plus_a06iqt.svg'
                  : 'https://res.cloudinary.com/g-draf-inc/image/upload/v1629126423/delete_mq5y4c.svg'
              }
              size="sm"
            />
          )}
          <br />
          <small className="text-muted">{item.description}</small>
        </div>
      ))}
    {isEditRole &&
      (!isAddingRoleLoading ? (
        <div
          style={{
            display: 'block',
            padding: '5px',
          }}
        >
          <CButton
            onClick={discardRolesChanges}
            color="danger"
            size="sm"
            style={{ float: 'left', color: 'white' }}
          >
            Discard
          </CButton>
          <CButton
            onClick={saveUserRoles}
            color="success"
            size="sm"
            style={{ float: 'right', color: 'white' }}
          >
            Save
          </CButton>
        </div>
      ) : (
        <CSpinner component="span" size="lg" aria-hidden="true" />
      ))}
  </div>
)

const renderGroups = (
  workgroups,
  isEditGroup,
  setIsEditGroup,
  userWorkgroupps,
  setUserWorkgroups,
  collapsibleVisible,
  discardGroupssChanges,
  isAddingGroupLoading,
  saveUserGroups,
) => (
  <div style={{ width: '130px' }}>
    {workgroups.result &&
      workgroups.result.map((item, i) => (
        <div key={i} className="mb-1">
          <strong style={{ float: 'left' }}>{item.name}</strong>
          {!isAddingGroupLoading && (
            <CAvatar
              onClick={() => {
                if (userWorkgroupps.filter((group) => group.id === item.id).length == 0) {
                  setUserWorkgroups([...userWorkgroupps, item])
                  console.log(userWorkgroupps)
                } else {
                  setUserWorkgroups(userWorkgroupps.filter((group) => group.id !== item.id))
                }
                setIsEditGroup(true)
              }}
              style={{
                float: 'right',
                cursor: 'pointer',
              }}
              src={
                collapsibleVisible &&
                userWorkgroupps.filter((group) => group.id === item.id).length == 0
                  ? 'https://res.cloudinary.com/g-draf-inc/image/upload/v1621414081/plus_a06iqt.svg'
                  : 'https://res.cloudinary.com/g-draf-inc/image/upload/v1629126423/delete_mq5y4c.svg'
              }
              size="sm"
            />
          )}
          <br />
          <small className="text-muted">{item.description}</small>
        </div>
      ))}
    {isEditGroup &&
      (!isAddingGroupLoading ? (
        <div
          style={{
            display: 'block',
            padding: '5px',
          }}
        >
          <CButton
            onClick={discardGroupssChanges}
            color="danger"
            size="sm"
            style={{ float: 'left', color: 'white' }}
          >
            Discard
          </CButton>
          <CButton
            onClick={saveUserGroups}
            color="success"
            size="sm"
            style={{ float: 'right', color: 'white' }}
          >
            Save
          </CButton>
        </div>
      ) : (
        <CSpinner component="span" size="lg" aria-hidden="true" />
      ))}
  </div>
)

export default Users
