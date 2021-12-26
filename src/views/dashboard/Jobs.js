import React, { lazy, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardTitle,
  CForm,
  CFormCheck,
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
  sendDraftEmail,
  fetchAllJobsMore,
} from '../../actions/dashboard/jobs.action'
import { INITIAL_DRAFT_MESSAGE, FINAL_DRAFT_MESSAGE } from './../../assets/constants'
import { fetchAllUsers } from '../../actions/admin/user.action'
// import { fetchRequestsData } from '../../actions/dashboard/requests.action'
import { fetchAllgroups } from '../../actions/admin/group.action'
import { viewWorkgroupUsers } from '../../actions/admin/group.action'
import '../../scss/jobs.scss'
import PropTypes from 'prop-types'
import moment from 'moment'

const Jobs = ({ startDate, endDate, pageSize, query, group_id }) => {
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
  const [draftMessage, setDraftMessage] = useState(INITIAL_DRAFT_MESSAGE)
  const [draftType, setDraftType] = useState('')
  const [currentService, setCurrentService] = useState('')
  const [isSendingDraft, setIsSendingDraf] = useState(false)
  const [isStartingJob, setisStartingJob] = useState(false)
  const [additionalComments, setadditionalComments] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [assignedUsers, setAssignedUsers] = useState({})
  const [groupUsers, setWorkgroupUsers] = useState({})
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [file, setFile] = useState(null)
  const [requireFile, setRequireFiles] = useState(true)
  const [messageType, setMessageType] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendindErrors, setSendingErrors] = useState({})
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isFetchingJobs, setisFetchingJobs] = useState(false)

  let currentUser = null
  const user = localStorage.getItem('AUTH')

  if (user) {
    currentUser = JSON.parse(user)
  }

  useEffect(() => {
    dispatch(fetchAllJobs(query, 1, pageSize, startDate, endDate, group_id, setisFetchingJobs))
    // dispatch(fetchAllServices())
    dispatch(fetchAllgroups())
  }, [startDate, endDate, pageSize, query, group_id]) // eslint-disable-line react-hooks/exhaustive-deps

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
    // setDraftMessage(INITIAL_DRAFT_MESSAGE.replace('[name]', data.order.customer_name))

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
    if (isSendingDraft) {
      setIsSendingDraf(false)
      setFile(null)
      setDraftType('')
      setCurrentService('')
      addToast(emailSendToast)
    }
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
      setIsSendingDraf(false)
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
    setDraftMessage(INITIAL_DRAFT_MESSAGE.replace('[name]', item.customer_name))
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

  const getBase64 = (file) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      console.log(reader.result)
    }
    reader.onerror = function (error) {
      console.log('Error: ', error)
    }
  }

  const resetModal = () => {
    setId(null)
    setVisible(false)
    // setpackage('Select Client Package')
    setAction('')

    setisSucess(false)
  }

  const handleSelectFile = (e) => {
    let file = e.target.files[0]
    setSendingErrors({})
    setFile(file)
    const fileBase64 = getBase64(file)
    setUploadedFile(fileBase64)
    // console.log(uploadedFile)
  }

  const selectUserErrorToast = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Add User</strong>
      </CToastHeader>
      <CToastBody>Please assign tasks to all the users</CToastBody>
    </CToast>
  )

  const emailSendToast = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Email has been sent</strong>
      </CToastHeader>
      <CToastBody>An Email has been sent to </CToastBody>
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
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Client Name</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Client Email</CTableHeaderCell>
            <CTableHeaderCell>Package</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Group Assigned</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
            {/* <CTableHeaderCell className="text-center">Request Type</CTableHeaderCell> */}
            <CTableHeaderCell>Date Created</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isFetchingJobs && <CSpinner size="sm" />}
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
        <div style={{ position: 'absolute', width: '70%', marginLeft: '5rem' }}>
          <CRow>
            <CCol xl="4"></CCol>
            <CCol>
              {jobs.has_next &&
                !collapsibleVisible &&
                (!isLoadingMore ? (
                  <CButton
                    onClick={() => {
                      dispatch(
                        fetchAllJobsMore(
                          query,
                          jobs.next_num,
                          pageSize,
                          startDate,
                          endDate,
                          group_id,
                          setIsLoadingMore,
                        ),
                      )
                    }}
                    size="sm"
                  >
                    Load More
                  </CButton>
                ) : (
                  <CSpinner size="sm" style={{ marginTop: '.5rem' }} />
                ))}
            </CCol>
          </CRow>
        </div>
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
                      <CListGroupItem>
                        {currentJob.order && currentJob.order.rate && (
                          <>
                            <strong>Ratings: </strong> <strong>{currentJob.order.rate}</strong>
                            <p className="text-muted">{currentJob.order.comments}</p>
                          </>
                        )}
                      </CListGroupItem>
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
                    {actionState !== 'user' && currentJob.order && currentJob.order.status && (
                      <CButton
                        onClick={() => {
                          setIsSendingDraf(true)
                        }}
                        color="info"
                        size="lg"
                      >
                        Send a Draft
                      </CButton>
                    )}
                  </CCardBody>
                </CCard>
              </CCallout>
            </CCol>
          </CRow>
        </CContainer>
      </CCollapse>
      {isSendingDraft && (
        <div className="compose-mail">
          <div className="compose-header">
            <h3>Send Draft</h3>
            <CAvatar
              style={{ position: 'absolute', top: '.5rem', right: '.5rem', cursor: 'pointer' }}
              onClick={() => setIsSendingDraf(false)}
              src="https://res.cloudinary.com/g-draf-inc/image/upload/v1557589368/delete_bl2bo8.png"
              //   size="sm"
            />
          </div>
          <div>
            <CRow>
              <CCol>
                <CFormLabel style={{ marginLeft: '.5rem' }}>Select Service</CFormLabel>
                <CFormSelect
                  className={sendindErrors.service && 'is-invalid'}
                  onChange={(e) => {
                    setCurrentService(servicesSelcted.filter((s) => s.task_id == e.target.value)[0])
                  }}
                  style={{ padding: '.5rem', marginLeft: '.5rem' }}
                >
                  <option value="">Select Service</option>
                  {servicesSelcted.map((item, i) => (
                    <option
                      disabled={
                        !item.assigned_to ||
                        !currentUser ||
                        item.assigned_to.id !== currentUser.user_id
                      }
                      key={i}
                      value={item.task_id}
                    >
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol>
                <CFormLabel style={{ marginLeft: '.5rem' }}>Select Draft Type</CFormLabel>
                <CFormSelect
                  onChange={(e) => {
                    if (e.target.value === 'final') {
                      setDraftMessage(FINAL_DRAFT_MESSAGE)
                      setDraftType('final')
                    } else {
                      setDraftMessage(INITIAL_DRAFT_MESSAGE)
                      setDraftType('draft')
                    }
                  }}
                  className={sendindErrors.draftType && 'is-invalid'}
                  style={{ padding: '.5rem' }}
                >
                  <option value="">Select Draft Type</option>
                  <option value="draft">Draft</option>
                  <option value="final">Final Draft</option>
                </CFormSelect>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel style={{ marginLeft: '.5rem' }}>Select Service</CFormLabel>
                <CFormControl
                  accept="application/pdf"
                  placeholder="Select file"
                  type="file"
                  className={sendindErrors.uploadedFile && 'is-invalid'}
                  onChange={(e) => handleSelectFile(e)}
                  style={{ padding: '.5rem', marginLeft: '.5rem' }}
                ></CFormControl>
                <CFormCheck
                  onChange={(e) => (requireFile ? setRequireFiles(false) : setRequireFiles(true))}
                  id="flexCheckChecked"
                  label="Require Upload Upload"
                  defaultChecked={requireFile}
                />
              </CCol>
              <CCol>
                {isSending && <CSpinner size="sm" color="primary"></CSpinner>}
                {!isSending && (
                  <CButton
                    color="success"
                    onClick={() => {
                      if (!currentService) {
                        setSendingErrors({ service: true })
                        return
                      }
                      if (!draftType) {
                        setSendingErrors({ draftType: true })
                        return
                      }
                      if (!file && requireFile) {
                        setSendingErrors({ uploadedFile: true })
                        return
                      }
                      let formData = new FormData()

                      formData.append('file', file)
                      formData.append(
                        'data',
                        JSON.stringify({
                          task_id: currentService.task_id,
                          draft_type: draftType,
                          message: draftMessage,
                          require_file: requireFile,
                        }),
                      )
                      dispatch(
                        sendDraftEmail(
                          currentService.task_id,
                          formData,
                          handleStartJobSuccess,
                          handleErrors,
                          isSending,
                          setIsSending,
                        ),
                      )
                    }}
                    style={{ margin: '2rem', color: 'white' }}
                  >
                    Send Draft
                  </CButton>
                )}
              </CCol>
            </CRow>
            <div style={{ width: '100%', height: '100%' }}>
              <CFormControl
                value={
                  currentService
                    ? draftMessage
                        .replace('[service_name]', currentService.name)
                        .replace('[service_name]', currentService.name)
                    : draftMessage
                }
                onChange={(e) => setDraftMessage(e.target.value)}
                component="textarea"
                rows="13"
              ></CFormControl>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
Jobs.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  setquery: PropTypes.func.isRequired,
  group_id: PropTypes.string.isRequired,
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
        <strong>{item.id}</strong>
        {/* <small className="small text-medium-emphasis">{item.created_at}</small> */}
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
        <strong>{item.order_package}</strong>
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
        <br />
        <small>Last Update: {moment(item.updated_at).fromNow()}</small>
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
        {moment(item.due_date) < moment(new Date()) && !item.status && (
          <CBadge color="warning">{'Start this Job!'}</CBadge>
        )}
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
        {item.status === 'Final Draft Sent' && <CBadge color="success">{'Completed'}</CBadge>}
        <div>{moment(item.created_at).format('MMM Do YYYY, h:mm:ss a')}</div>
        <strong>Due Date:</strong> <small>{moment(item.due_date).fromNow()}</small>
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
    {!item.status && (
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
