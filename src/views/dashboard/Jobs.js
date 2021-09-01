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
  CFormSelect,
  CTableHeaderCell,
  CTableRow,
  CPopover,
  CCallout,
  CFormLabel,
} from '@coreui/react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { CContainer, CSpinner } from '@coreui/react'
import {
  fetchAllJobs,
  startAJob,
  assignJobToUser,
  fetchJobsData,
} from '../../actions/dashboard/jobs.action'
import { fetchAllUsers } from '../../actions/admin/user.action'
// import { fetchRequestsData } from '../../actions/dashboard/requests.action'

import { viewWorkgroupUsers } from '../../actions/admin/group.action'

const Jobs = () => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(null)
  const [isSuccess, setisSucess] = useState(false)
  const [actionState, setAction] = useState(null)
  const [activateMessage, setMessage] = useState('')
  const [collapsibleVisible, setCollapsible] = useState(false)
  const jobs = useSelector((state) => state.jobReducer)
  const users = useSelector((state) => state.userReducer)

  const reduceGroups = useSelector((state) => state.userGroup)
  const [isWorkgroupLoading, setIsWorkgroupLoading] = useState(false)
  const [isRoleLoading, setIsRoleLoading] = useState(false)
  const [jobWorkgroup, setUserJobWorkgroup] = useState(null)
  const [userRoles, setUserRoles] = useState([])
  const [isEditRole, setisEditRole] = useState(false)
  const [isEditGroup, setIsEditGroup] = useState(false)
  const [toast, addToast] = useState(0)
  const [wtoast, addWToast] = useState(0)
  const toaster = useRef()
  const [currentJob, setCurrentJob] = useState({})
  const [servicesSelcted, setServciesSelected] = useState([])
  const wToaster = useRef()
  const [isAddingRoleLoading, setIsAddingRoleLoading] = useState(false)
  const [isAddingGroupLoading, setIsAddingGroupLoading] = useState(false)

  const [isStartingJob, setisStartingJob] = useState(false)
  const [additionalComments, setadditionalComments] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [assignedUsers, setAssignedUsers] = useState({})
  const [groupUsers, setWorkgroupUsers] = useState({})
  const [isUsersLoading, setIsUsersLoading] = useState(false)

  useEffect(() => {
    dispatch(fetchAllJobs())
    // dispatch(fetchAllServices())
    // dispatch(fetchAllgroups())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleErrors = (errors) => {
    if (errors && errors.errors) {
      setErrors(errors.errors)
    }
  }

  const handleSuccess = (data) => {
    setisSucess(true)
    if (actionState !== `edit`) {
      setVisible(false)
    }
    setCurrentJob(data)
    setId(data.order.id)
    setServciesSelected(data.services)
    // setpackage(data.order.order_package)
    // setTransactionId(data.order.transaction_Id)
    // setOffer(data.order.amount)
    // setUserJobWorkgroup(data.order.group)
    // setDueDate(data.order.due_date)
    // dispatch(fetchAllJobs())
  }

  const handleStartJobSuccess = (data) => {
    resetModal()
    // setCurrentJob(data)
    setAssignedUsers({})
    dispatch(fetchJobsData(id, handleSuccess, handleErrors, isLoading, setIsLoading))
  }

  const handleUserSuccess = (data) => {
    setWorkgroupUsers(data)
  }

  const setCollapsibleVisible = (item) => {
    if (collapsibleVisible) {
      setCollapsible(false)
      setId(null)
      setCurrentJob({})
      setAssignedUsers({})
      //   setUserJobWorkgroup(null)
      //   setTransactionId('')
      //   setOffer(0)
      //   setAction('')
      //   setpackage('Select Client Package')
      //   setDueDate('')
      //   setServciesSelected([])
      //   setUserRoles([])
      return
    }
    setId(item.id)
    setCollapsible(true)
    dispatch(fetchJobsData(item.id, handleSuccess, handleErrors, isLoading, setIsLoading))
    dispatch(viewWorkgroupUsers(item.group.id, handleErrors, handleUserSuccess, setIsUsersLoading))
  }

  const selectJob = (item, actionState) => {
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
    // console.log(reduceRoles)
    // setUserRoles(reduceRoles)
    // setisEditRole(false)
  }

  const startJob = () => {
    dispatch(startAJob(id, handleStartJobSuccess, handleErrors, isStartingJob, setisStartingJob))
  }

  const assignTaskToUser = () => {
    dispatch(
      assignJobToUser(
        id,
        { assignedUsers: assignedUsers },
        handleStartJobSuccess,
        handleErrors,
        isStartingJob,
        setisStartingJob,
      ),
    )
  }

  const resetModal = () => {
    setId(null)
    setVisible(false)
    // setpackage('Select Client Package')
    setAction('')

    setisSucess(false)
  }

  const selectUserErrorToast = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Add User</strong>
      </CToastHeader>
      <CToastBody>Please assign tasks to all the users</CToastBody>
    </CToast>
  )

  const jobGroupErrorToast = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Select Group</strong>
      </CToastHeader>
      <CToastBody>Please Select a Workgroup</CToastBody>
    </CToast>
  )

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CModal visible={visible} onDismiss={() => resetModal}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>
            {actionState === 'user' && 'Assign Job to a User'}
            {actionState === 'draft' && 'Sending Draft to User'}
            {actionState === 'start' && 'Start Job'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span>
            {actionState === 'user' && 'Are you Sure you want to assign the job this User'}
            {actionState === 'draft' && 'Are you sure you want to send the draft to this client?'}
            {actionState === 'start' && 'Are you sure you want to start this job?'}
          </span>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false)
            }}
          >
            No
          </CButton>
          {!isStartingJob && (
            <CButton
              onClick={() => {
                switch (actionState) {
                  case 'user':
                    assignTaskToUser()
                    break
                  case 'start':
                    startJob()
                    break
                  default:
                    return
                }
                // actionState === 'user' ? assignTaskToWorkgroup() : generateReceipt()
              }}
              color="primary"
            >
              Yes
            </CButton>
          )}
          {isStartingJob && <CSpinner size="sm" color="primary"></CSpinner>}
        </CModalFooter>
      </CModal>
      <CTable striped hover responsive align="middle" className="mb-0 border">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Client Name</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Client Email</CTableHeaderCell>
            <CTableHeaderCell>Package</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Group Assigned</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
            {/* <CTableHeaderCell className="text-center">Request Type</CTableHeaderCell> */}
            <CTableHeaderCell>Progress Status</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {jobs.result &&
            renderJobs(
              jobs.result,
              selectJob,
              setCollapsibleVisible,
              id,
              collapsibleVisible,
              isLoading,
              currentJob,
              setAction,
              setVisible,
              setId,
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
                        <CCardTitle>Services Requested</CCardTitle>
                      </CCol>
                      <CCol className="col-3"></CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CListGroup>
                      {servicesSelcted &&
                        servicesSelcted.map((item, i) => (
                          <CListGroupItem key={i}>
                            <strong>{item.name}</strong>
                            {item.assigned_to && (
                              <>
                                <br /> <small>{item.assigned_to.name}</small>
                              </>
                            )}
                            <small className="small text-medium-emphasis">{item.status}</small>
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
                        <CCardTitle>
                          {actionState === 'user' ? 'Assign Users Tasks' : 'Other Details'}
                        </CCardTitle>
                      </CCol>
                      <CCol className="col-3"></CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CListGroup>
                      {actionState === 'user' &&
                        servicesSelcted.map((item, i) => (
                          <CListGroupItem key={i}>
                            <strong>{item.name}</strong>
                            <br />
                            <CFormLabel>Select User</CFormLabel>
                            <CFormSelect
                              onChange={(e) =>
                                e.target.value &&
                                setAssignedUsers({
                                  ...assignedUsers,
                                  [item.task_id]: e.target.value,
                                })
                              }
                              aria-label="packages"
                            >
                              {item.assigned_to ? (
                                <option value={item.assigned_to.id}>{item.assigned_to.name}</option>
                              ) : (
                                <option value={''}>Select User</option>
                              )}
                              {groupUsers.result &&
                                groupUsers.result.map((val, i) => (
                                  <option key={i} value={val.id}>
                                    {val.username}
                                  </option>
                                ))}
                            </CFormSelect>
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
                    <CCardTitle>
                      Activities
                      {/* {actionState === 'user' || actionState === 'receipt'
                        ? 'Activities'
                        : 'Group Assigned'} */}
                    </CCardTitle>
                  </CCardHeader>
                  <CCardBody>
                    {actionState === 'user' && (
                      <CButton
                        onClick={() => {
                          console.log(assignedUsers)
                          if (Object.entries(assignedUsers).length !== servicesSelcted.length) {
                            addToast(selectUserErrorToast)
                            return
                          }
                          setVisible(true)
                        }}
                        color="info"
                        size="lg"
                      >
                        Assign Users
                      </CButton>
                    )}
                  </CCardBody>
                </CCard>
              </CCallout>
            </CCol>
          </CRow>
        </CContainer>
      </CCollapse>
    </>
  )
}

const renderJobs = (
  jobs,
  selectJob,
  setCollapsibleVisible,
  id,
  collapsibleVisible,
  isLoading,
  job,
  setAction,
  setVisible,
  setId,
) => {
  const currentJob = jobs.filter((j) => j.id === id)
  let filteredRJobs = jobs
  if (currentJob.length > 0 && collapsibleVisible) {
    filteredRJobs = currentJob
  }
  const allJobs = filteredRJobs.map((item, i) => (
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
          content={renderPopOverContent(
            item,
            selectJob,
            job,
            isLoading,
            setAction,
            setVisible,
            setCollapsibleVisible,
            setId,
          )}
          placement="bottom"
        >
          <CIcon name="cil-settings" size="lg" />
        </CPopover>
      </CTableDataCell>
    </CTableRow>
  ))

  return allJobs
}

const renderPopOverContent = (
  item,
  selectUser,
  request,
  isLoading,
  setAction,
  setVisible,
  setCollapsibleVisible,
  setId,
) => (
  <CListGroup>
    {item.status !== 'started' && (
      <CListGroupItem
        onClick={() => {
          setAction('start')
          setVisible(true)
          setId(item.id)
          // setCollapsibleVisible(item)
        }}
        component="button"
      >
        Start this Job
      </CListGroupItem>
    )}
    <CListGroupItem
      onClick={() => {
        setAction('user')
        // setCollapsibleVisible(item)
      }}
      component="button"
    >
      Assign Tasks to Users
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

export default Jobs
