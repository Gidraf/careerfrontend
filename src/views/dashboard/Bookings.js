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
import { fetchAllBookings, affirmBooking } from '../../actions/dashboard/bookings.action'
import { INITIAL_DRAFT_MESSAGE, FINAL_DRAFT_MESSAGE } from './../../assets/constants'
import { fetchAllUsers } from '../../actions/admin/user.action'
// import { fetchRequestsData } from '../../actions/dashboard/requests.action'

import { viewWorkgroupUsers } from '../../actions/admin/group.action'
import '../../scss/jobs.scss'

const Bookings = () => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(null)
  const [isSuccess, setisSucess] = useState(false)
  const [actionState, setAction] = useState(null)
  const [activateMessage, setMessage] = useState('')
  const [collapsibleVisible, setCollapsible] = useState(false)
  const boookings = useSelector((state) => state.bookingReducer)
  const users = useSelector((state) => state.userReducer)

  const reduceGroups = useSelector((state) => state.userGroup)

  const [toast, addToast] = useState(0)
  const [wtoast, addWToast] = useState(0)
  const toaster = useRef()
  const [currentBook, setCurrentBook] = useState({})
  const [servicesSelcted, setServciesSelected] = useState([])
  const wToaster = useRef()
  const [isAddingRoleLoading, setIsAddingRoleLoading] = useState(false)
  const [isAddingGroupLoading, setIsAddingGroupLoading] = useState(false)
  const [feedBackMessage, setFeedBackMessage] = useState(INITIAL_DRAFT_MESSAGE)
  const [draftType, setDraftType] = useState('')
  const [currentService, setCurrentService] = useState('')
  const [isSendingFeedback, setIsSendingFeedBack] = useState(false)
  const [isConfirmingBook, setisConfirmingBook] = useState(false)
  const [additionalComments, setadditionalComments] = useState('')
  const [reScheduleDate, setRescheduleDate] = useState('')
  const [assignedUsers, setAssignedUsers] = useState({})
  const [groupUsers, setWorkgroupUsers] = useState({})
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [file, setFile] = useState(null)
  const [requireFile, setRequireFiles] = useState(true)
  const [messageType, setMessageType] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [sendindErrors, setSendingErrors] = useState({})
  const [meeting_link, setMeetingLink] = useState('')
  const [transactionId, setTransactionId] = useState('')

  let currentUser = null
  const user = localStorage.getItem('AUTH')

  if (user) {
    currentUser = JSON.parse(user)
  }

  useEffect(() => {
    dispatch(fetchAllBookings())
    // dispatch(fetchAllServices())
    // dispatch(fetchAllgroups())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleErrors = (errors) => {
    console.log(errors)
    if (errors && errors.errors) {
      setErrors(errors.errors)
      setVisible(false)
    }
  }

  const handleSuccess = (data) => {
    setisSucess(true)
    if (actionState !== `edit`) {
      setVisible(false)
    }
    setCurrentBook(data)
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

  const handleConfirmBookingSuccess = (data) => {
    resetModal()
    // setCurrentJob(data)
    setAssignedUsers({})
    // dispatch(fetchJobsData(id, handleSuccess, handleErrors, isLoading, setIsLoading))
    if (isSendingFeedback) {
      setIsSendingFeedBack(false)
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
      setCurrentBook({})
      setAssignedUsers({})
      setIsSendingFeedBack(false)
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
    setFeedBackMessage(INITIAL_DRAFT_MESSAGE.replace('[name]', item.customer_name))
    setCollapsible(true)
    // dispatch(fetchJobsData(item.id, handleSuccess, handleErrors, isLoading, setIsLoading))
    // dispatch(viewWorkgroupUsers(item.group.id, handleErrors, handleUserSuccess, setIsUsersLoading))
  }

  const selectBooking = (item, actionState) => {
    if (item.is_confirmed) {
      setMessage(``)
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

  const confirmBooking = () => {
    dispatch(
      affirmBooking(
        id,
        { meeting_link: meeting_link, transaction_id: transactionId },
        handleConfirmBookingSuccess,
        handleErrors,
        setisConfirmingBook,
      ),
    )
  }

  //   const assignTaskToUser = () => {
  //     dispatch(
  //       assignBookToUser(
  //         id,
  //         { assignedUsers: assignedUsers },
  //         handleStartJobSuccess,
  //         handleErrors,
  //         isConfirmingBook,
  //         setisConfirmingBook,
  //       ),
  //     )
  //   }

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

  //   const selectUserErrorToast = (
  //     <CToast placement="top-end" title="" autohide={true}>
  //       <CToastHeader close>
  //         <strong className="me-auto">Add User</strong>
  //       </CToastHeader>
  //       <CToastBody>Please assign tasks to all the users</CToastBody>
  //     </CToast>
  //   )

  const emailSendToast = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Email has been sent</strong>
      </CToastHeader>
      <CToastBody>An Email has been sent </CToastBody>
    </CToast>
  )

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CModal visible={visible} onDismiss={() => resetModal}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>
            {actionState === 'user' && 'Assign Book to a User'}
            {actionState === 'draft' && 'Sending FeedBack to User'}
            {actionState === 'confirm' && 'Confirm Booking'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span>
            {actionState === 'user' && 'Are you Sure you want to assign the slot this User'}
            {actionState === 'draft' &&
              'Are you sure you want to send the Feedback meesage to this client?'}
            {actionState === 'confirm' && 'Are you sure you want to Confirm this slot?'}
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
          {!isConfirmingBook && (
            <CButton
              onClick={() => {
                switch (actionState) {
                  //   case 'user':
                  //     assignTaskToUser()
                  //     break
                  case 'confirm':
                    confirmBooking()
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
          {isConfirmingBook && <CSpinner size="sm" color="primary"></CSpinner>}
        </CModalFooter>
      </CModal>
      <CTable striped hover responsive align="middle" className="mb-0 border">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Client Name</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Client Email</CTableHeaderCell>
            <CTableHeaderCell>Start Date</CTableHeaderCell>
            <CTableHeaderCell className="text-center">End Date</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
            {/* <CTableHeaderCell className="text-center">Request Type</CTableHeaderCell> */}
            <CTableHeaderCell>Service</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {boookings.result &&
            renderBookigs(
              boookings.result,
              selectBooking,
              setCollapsibleVisible,
              id,
              collapsibleVisible,
              isLoading,
              currentBook,
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
                        <CCardTitle>Event Details</CCardTitle>
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
                        {/* {currentBook.order && currentJob.order.rate && (
                          <>
                            <strong>Ratings: </strong> <strong>{currentJob.order.rate}</strong>
                            <p className="text-muted">{currentJob.order.comments}</p>
                          </>
                        )} */}
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
                    {!currentBook.is_confirmed && (
                      <>
                        <CListGroupItem></CListGroupItem>
                        <CListGroupItem>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon name="cil-note" />
                            </CInputGroupText>
                            <CFormControl
                              value={meeting_link}
                              className={errors.meeting_link && 'is-invalid'}
                              onChange={(e) => {
                                setErrors({})
                                setMeetingLink(e.target.value)
                              }}
                              size="lg"
                              placeholder={
                                !errors.meeting_link ? 'Meeting Link' : errors.meeting_link[0]
                              }
                            />
                          </CInputGroup>
                        </CListGroupItem>
                        <CListGroupItem>
                          <CInputGroup className="mb-3">
                            <CInputGroupText>
                              <CIcon name="cil-note" />
                            </CInputGroupText>
                            <CFormControl
                              value={transactionId}
                              className={errors.transaction_id && 'is-invalid'}
                              onChange={(e) => {
                                setErrors({})
                                setTransactionId(e.target.value)
                              }}
                              size="lg"
                              placeholder={
                                !errors.transaction_id ? 'Transaction ID' : errors.transaction_id[0]
                              }
                            />
                          </CInputGroup>
                        </CListGroupItem>
                        <CListGroupItem>
                          <CButton
                            onClick={() => {
                              setVisible(true)
                              setAction('confirm')
                            }}
                            color="info"
                            size="lg"
                          >
                            Confirm Slot & Send Receipt
                          </CButton>
                        </CListGroupItem>
                      </>
                    )}
                    {actionState !== 'feedback' &&
                      currentBook.booking &&
                      currentBook.booking.status && (
                        <CButton
                          onClick={() => {
                            setIsSendingFeedBack(true)
                          }}
                          color="info"
                          size="lg"
                        >
                          Send Recommendations/Feedback
                        </CButton>
                      )}
                  </CCardBody>
                </CCard>
              </CCallout>
            </CCol>
          </CRow>
        </CContainer>
      </CCollapse>
      {isSendingFeedback && (
        <div className="compose-mail">
          <div className="compose-header">
            <h3>Send Recommendations/Feedback</h3>
            <CAvatar
              style={{ position: 'absolute', top: '.5rem', right: '.5rem', cursor: 'pointer' }}
              onClick={() => setIsSendingFeedBack(false)}
              src="https://res.cloudinary.com/g-draf-inc/image/upload/v1557589368/delete_bl2bo8.png"
              //   size="sm"
            />
          </div>
          <div>
            <CRow>
              {/* <CCol>
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
              </CCol> */}
              {/* <CCol>
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
              </CCol> */}
            </CRow>
            <CRow>
              <CCol>
                <CFormLabel style={{ marginLeft: '.5rem' }}>Upload File</CFormLabel>
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
                          draft_type: 'feedback',
                          message: feedBackMessage,
                          require_file: requireFile,
                        }),
                      )
                      //   dispatch(
                      //     sendDraftEmail(
                      //       currentService.task_id,
                      //       formData,
                      //       handleConfirmBookingSuccess,
                      //       handleErrors,
                      //       isSending,
                      //       setIsSending,
                      //     ),
                      //   )
                    }}
                    style={{ margin: '2rem', color: 'white' }}
                  >
                    Send Feedback
                  </CButton>
                )}
              </CCol>
            </CRow>
            <div style={{ width: '100%', height: '100%' }}>
              <CFormControl
                value={
                  currentService
                    ? feedBackMessage
                        .replace('[service_name]', currentService.name)
                        .replace('[service_name]', currentService.name)
                    : feedBackMessage
                }
                onChange={(e) => setFeedBackMessage(e.target.value)}
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

const renderBookigs = (
  bookings,
  selectBooking,
  setCollapsibleVisible,
  id,
  collapsibleVisible,
  isLoading,
  booking,
  setAction,
  setVisible,
  setId,
) => {
  const currentBook = bookings.filter((j) => j.id === id)
  let filteredBookings = bookings
  if (currentBook.length > 0 && collapsibleVisible) {
    filteredBookings = currentBook
  }
  const allBookings = filteredBookings.map((item, i) => (
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
        <strong>{item.start_time}</strong>
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
        <strong>{item.end_time}</strong>
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
        {item.is_confirmed ? (
          <CBadge color="success">{'Confirmed'}</CBadge>
        ) : (
          <CBadge color="warning">{'Pending'}</CBadge>
        )}
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
        <strong>{item.service}</strong>
      </CTableDataCell>

      <CTableDataCell className="text-center">
        <CPopover
          title="More Actions"
          content={renderPopOverContent(
            item,
            selectBooking,
            booking,
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

  return allBookings
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
        Confirm Slot
      </CListGroupItem>
    )}
    <CListGroupItem
      onClick={() => {
        setAction('reschedule')
        // setCollapsibleVisible(item)
      }}
      component="button"
    >
      Reschedule
    </CListGroupItem>
  </CListGroup>
)

export default Bookings
