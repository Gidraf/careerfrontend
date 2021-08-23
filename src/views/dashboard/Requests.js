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
import { fetchAllRequests } from '../../actions/dashboard/requests.action'
// import { fetchAllRoles } from '../../actions/admin/role.action'

// import { fetchAllgroups } from '../../actions/admin/group.action'

const Requests = () => {
  const dispatch = useDispatch()
  //   const [sirName, setSirName] = useState('')
  //   const [otherName, setOtherName] = useState('')
  //   const [lastName, setLastName] = useState('')
  //   const [email, setEmail] = useState('')
  //   const [username, setuserName] = useState('')
  //   const [phonenumber, setPhonenumber] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(null)
  const [isSuccess, setisSucess] = useState(false)
  const [actionState, setAction] = useState(null)
  const [activateMessage, setMessage] = useState('')
  const [collapsibleVisible, setCollapsible] = useState(false)
  const requests = useSelector((state) => state.requestReducer)
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
    dispatch(fetchAllRequests())
    // dispatch(fetchAllRoles())
    // dispatch(fetchAllgroups())
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
    dispatch(fetchAllRequests())
  }

  const setCollapsibleVisible = (item) => {
    if (collapsibleVisible) {
      setCollapsible(false)
      setId(null)
      //   setUserRoles([])
      //   setUserWorkgroups([])
      return
    }
    setId(item.id)
    setCollapsible(true)
  }

  const selectRequest = (item, actionState) => {
    if (item.status) {
      setMessage(`Are Sure you want to Deactivate ${item.sir_name}`)
    }
    if (!item.status) {
      setMessage(`Are Sure you want to Activate ${item.sir_name}`)
    }
    setAction(actionState)
    setId(item.id)

    setVisible(true)
    setisSucess(false)
    setCollapsible(false)
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
      <CTable striped hover responsive align="middle" className="mb-0 border">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Client Name</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Client Email</CTableHeaderCell>
            <CTableHeaderCell>Email Subject</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Group Assigned</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
            {/* <CTableHeaderCell className="text-center">Request Type</CTableHeaderCell> */}
            <CTableHeaderCell>Progress Status</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {requests.result &&
            renderequests(
              requests.result,
              selectRequest,
              setCollapsibleVisible,
              id,
              collapsibleVisible,
              //   isRoleLoading,
              //   isWorkgroupLoading,
              //   isEditRole,
              //   addToast,
              //   roleErrorToast,
              //   isEditGroup,
              //   addWToast,
              //   GroupErrorToast,
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
                        <CCardTitle>Mail Thread</CCardTitle>
                      </CCol>
                      <CCol className="col-3">
                        {/* <CPopover
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
                        </CPopover> */}
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    {/* <CListGroup>
                      {isRoleLoading && <CSpinner component="span" aria-hidden="true" />}
                      {userRoles.map((item, i) => (
                        <CListGroupItem key={i}>
                          <strong>{item.name}</strong>
                          <br />
                          <small className="small text-medium-emphasis">{item.description}</small>
                        </CListGroupItem>
                      ))}
                    </CListGroup> */}
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
                        <CCardTitle>Services Requested</CCardTitle>
                      </CCol>
                      <CCol className="col-3">
                        {/* <CPopover
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
                        </CPopover> */}
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    {/* <CListGroup>
                      {isWorkgroupLoading && <CSpinner component="span" aria-hidden="true" />}
                      {userWorkgroupps &&
                        userWorkgroupps.map((item, i) => (
                          <CListGroupItem key={i}>
                            <strong>{item.name}</strong>
                            <br />
                            <small className="small text-medium-emphasis">{item.description}</small>
                          </CListGroupItem>
                        ))}
                    </CListGroup> */}
                  </CCardBody>
                </CCard>
              </CCallout>
            </CCol>
            <CCol>
              <CCallout color="primary" style={{ padding: 0 }}>
                <CCard className="mt-1" style={{ marginTop: 0 }}>
                  <CCardHeader>
                    <CCardTitle>Activities</CCardTitle>
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

const renderequests = (requests, selectRequest, setCollapsibleVisible, id, collapsibleVisible) => {
  const currentRequest = requests.filter((user) => user.id === id)
  let filteredRequest = requests
  if (currentRequest.length > 0 && collapsibleVisible) {
    filteredRequest = currentRequest
  }
  const allRequest = filteredRequest.map((item, i) => (
    <CTableRow key={i} style={{ cursor: 'pointer' }}>
      <CTableDataCell
        onClick={() => {
          //   if (!isRoleLoading && !isWorkgroupLoading)
          //     if (isEditRole) {
          //       addToast(roleErrorToast)
          //       return
          //     }
          //   if (isEditGroup) {
          //     addWToast(GroupErrorToast)
          //     return
          //   }
          setCollapsibleVisible(item)
        }}
      >
        <strong>{item.customer_name}</strong>
        {/* <small className="small text-medium-emphasis">{item.created_at}</small> */}
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => {
          //   if (!isRoleLoading && !isWorkgroupLoading)
          //     if (isEditRole) {
          //       addToast(roleErrorToast)

          //       return
          //     }
          //   if (isEditGroup) {
          //     addWToast(GroupErrorToast)
          //     return
          //   }
          setCollapsibleVisible(item)
        }}
      >
        {/* <CIcon size="xl" name="cif-us" title="us" id="us" /> */}
        <strong>{item.client_email}</strong>
      </CTableDataCell>
      <CTableDataCell
        onClick={() => {
          //   if (!isRoleLoading && !isWorkgroupLoading)
          //     if (isEditRole) {
          //       addToast(roleErrorToast)

          //       return
          //     }
          //   if (isEditGroup) {
          //     addWToast(GroupErrorToast)
          //     return
          //   }
          setCollapsibleVisible(item)
        }}
      >
        <strong>{item.email_subject}</strong>
        {/* <div className="small text-medium-emphasis">{item.customer_ordered.registered_on}</div> */}
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => {
          // if (!isRoleLoading && !isWorkgroupLoading)
          //     if (isEditRole) {
          //       addToast(roleErrorToast)

          //       return
          //     }
          //   if (isEditGroup) {
          //     addWToast(GroupErrorToast)
          //     return
          //   }
          setCollapsibleVisible(item)
        }}
      >
        <strong>{item.group ? item.group.name : 'Not Yet'}</strong>
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => {
          //   if (!isRoleLoading && !isWorkgroupLoading)
          //     if (isEditRole) {
          //       addToast(roleErrorToast)

          //       return
          //     }
          //   if (isEditGroup) {
          //     addWToast(GroupErrorToast)
          //     return
          //   }
          setCollapsibleVisible(item)
        }}
      >
        <div>{item.status}</div>
      </CTableDataCell>
      {/* <CTableDataCell
        className="text-center"
        onClick={() => {
        //   if (!isRoleLoading && !isWorkgroupLoading)
        //     if (isEditRole) {
        //       addToast(roleErrorToast)

        //       return
        //     }
        //   if (isEditGroup) {
        //     addWToast(GroupErrorToast)
        //     return
        //   }
          setCollapsibleVisible(item)
        }}
      >
        <strong>{item.phonenumber}</strong>
      </CTableDataCell> */}
      <CTableDataCell
        onClick={() => {
          //   if (!isRoleLoading && !isWorkgroupLoading)
          //     if (isEditRole) {
          //       addToast(roleErrorToast)

          //       return
          //     }
          //   if (isEditGroup) {
          //     addWToast(GroupErrorToast)
          //     return
          //   }
          setCollapsibleVisible(item)
        }}
      >
        {/* {item.status ? (
          <CBadge color="success">{'Active'}</CBadge>
        ) : (
          <CBadge color="danger">{'Deactivated'}</CBadge>
        )} */}
        <CProgress thin className="mt-2" precision={1} color="info" value={40} />
        {/* <strong>10 sec ago</strong> */}
      </CTableDataCell>

      <CTableDataCell className="text-center">
        <CPopover
          title="More Actions"
          content={renderPopOverContent(item, selectRequest)}
          placement="bottom"
        >
          <CIcon name="cil-settings" size="lg" />
        </CPopover>
      </CTableDataCell>
    </CTableRow>
  ))

  return allRequest
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

export default Requests
