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
} from '@coreui/react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { CContainer, CSpinner } from '@coreui/react'
import {
  fetchAllRequests,
  fetchRequestsData,
  generateClientReceipt,
  assignJobToWorkgroup,
} from '../../actions/dashboard/requests.action'
import { fetchAllServices } from '../../actions/admin/service.action'
import { fetchAllgroups } from '../../actions/admin/group.action'
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
  const services = useSelector((state) => state.serviceReducer)
  const workgroups = useSelector((state) => state.groupReducer)
  const reduceRoles = useSelector((state) => state.userRole)

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
  const [currentRequest, setCurrentRequest] = useState({})
  const wToaster = useRef()
  const [isAddingRoleLoading, setIsAddingRoleLoading] = useState(false)
  const [isAddingGroupLoading, setIsAddingGroupLoading] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [orderPackage, setpackage] = useState('Select Client Package')
  const [servicesSelcted, setServciesSelected] = useState([])
  const [offer, setOffer] = useState(0)
  const [isGeneratingRecipt, setisGeneratingRecipt] = useState(false)
  const [additionalComments, setadditionalComments] = useState('')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    dispatch(fetchAllRequests())
    dispatch(fetchAllServices())
    dispatch(fetchAllgroups())
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
    setCurrentRequest(data)
    setId(data.order.request_id)
    setServciesSelected(data.services)
    setpackage(data.order.order_package)
    setTransactionId(data.order.transaction_Id)
    setOffer(data.order.amount)
    setUserJobWorkgroup(data.order.group)
    // dispatch(fetchAllRequests())
  }

  const handleReceiptGenerationSuccess = (data) => {
    resetModal()
    setCurrentRequest(data)
    dispatch(fetchRequestsData(id, handleSuccess, handleErrors, isLoading, setIsLoading))
  }

  const setCollapsibleVisible = (item) => {
    if (collapsibleVisible) {
      setCollapsible(false)
      setId(null)
      setCurrentRequest({})
      setUserJobWorkgroup(null)
      setAction('')
      //   setUserRoles([])
      return
    }
    setId(item.id)
    setCollapsible(true)
    dispatch(fetchRequestsData(item.id, handleSuccess, handleErrors, isLoading, setIsLoading))
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

  const generateReceipt = () => {
    const servId = []
    const data = {
      offer: offer,
      package: orderPackage,
      request_id: id,
      transaction_id: transactionId,
    }
    for (let i = 0; i < servicesSelcted.length; i++) {
      servId.push(servicesSelcted[i].id)
    }
    data['services'] = servId
    dispatch(
      generateClientReceipt(
        id,
        data,
        handleReceiptGenerationSuccess,
        handleErrors,
        isGeneratingRecipt,
        setisGeneratingRecipt,
      ),
    )
  }

  const assignTaskToWorkgroup = () => {
    const data = {
      group_id: jobWorkgroup.id,
      due_date: dueDate,
    }
    dispatch(
      assignJobToWorkgroup(
        id,
        data,
        handleReceiptGenerationSuccess,
        handleErrors,
        isGeneratingRecipt,
        setisGeneratingRecipt,
      ),
    )
  }

  const resetModal = () => {
    setId(null)
    setVisible(false)
    setOffer(0)
    setpackage('Select Client Package')
    setAction('')
    setTransactionId('')
    setisSucess(false)
  }

  const roleErrorToast = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Add Services</strong>
      </CToastHeader>
      <CToastBody>Please add atleast one Service</CToastBody>
    </CToast>
  )

  const GroupErrorToast = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Add Transaction Id</strong>
      </CToastHeader>
      <CToastBody>Please add transactio id</CToastBody>
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

  const dueDateToastError = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Due Date</strong>
      </CToastHeader>
      <CToastBody>Please Select Due Date</CToastBody>
    </CToast>
  )

  const selectClientPackageError = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Select Customer Package</strong>
      </CToastHeader>
      <CToastBody>Please Select Customer Service</CToastBody>
    </CToast>
  )

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CModal visible={visible} onDismiss={() => resetModal}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>
            {actionState === 'group'
              ? 'Assign Job to a Workgroup'
              : 'Confirm Payment and Generate Receipt'}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <span>
            {actionState === 'group'
              ? 'Are you Sure you want to assign the job this Workgroup'
              : 'Are sure you want to generate a receipt for this client?'}
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
          {!isGeneratingRecipt && (
            <CButton
              onClick={() => {
                actionState === 'group' ? assignTaskToWorkgroup() : generateReceipt()
              }}
              color="primary"
            >
              Yes
            </CButton>
          )}
          {isGeneratingRecipt && <CSpinner size="sm" color="primary"></CSpinner>}
        </CModalFooter>
      </CModal>
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
              isLoading,
              currentRequest,
              setAction,
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
                        <CCardTitle>
                          {actionState === 'group' ? 'Assign a Workgroup' : 'Order Details'}
                        </CCardTitle>
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
                    <CListGroup>
                      {isLoading && <CSpinner component="span" aria-hidden="true" />}
                      {currentRequest.order &&
                        actionState !== 'receipt' &&
                        actionState !== 'group' && (
                          <>
                            <CListGroupItem>
                              <strong>{currentRequest.order.amount}</strong>
                              <br />
                              <small className="small text-medium-emphasis">
                                {currentRequest.order.created_at}
                              </small>
                            </CListGroupItem>
                            <CListGroupItem>
                              <strong>{currentRequest.order.order_package}</strong>
                              <br />
                              <small className="small text-medium-emphasis">
                                {currentRequest.order.transaction_Id}
                              </small>
                            </CListGroupItem>
                            {/* <CListGroupItem>
                            <strong>{currentRequest.order.package}</strong>
                            <br />
                            <small className="small text-medium-emphasis">
                              {currentRequest.order.transaction_Id}
                            </small>
                          </CListGroupItem> */}
                          </>
                        )}
                      {actionState === 'receipt' && (
                        <>
                          <CListGroupItem>
                            <CFormSelect
                              onChange={(e) => setpackage(e.target.value)}
                              aria-label="packages"
                            >
                              <option value={orderPackage}>{orderPackage}</option>
                              <option value="">Normal Services</option>
                              <option value="gold">Gold</option>
                              <option value="silver">Silver</option>
                              <option value="bronze">Bronze</option>
                              <option value="offer">Offer</option>
                            </CFormSelect>
                          </CListGroupItem>
                          <CListGroupItem>
                            <CInputGroup className="mb-3">
                              <CInputGroupText>
                                <CIcon name="cil-note" />
                              </CInputGroupText>
                              <CFormControl
                                value={offer}
                                className={errors.offer && 'is-invalid'}
                                onChange={(e) => {
                                  setErrors({})
                                  setOffer(e.target.value)
                                }}
                                size="lg"
                                placeholder={!errors.transaction_Id ? 'Offer' : errors.offer[0]}
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
                                className={errors.offer && 'is-invalid'}
                                onChange={(e) => {
                                  setErrors({})
                                  setTransactionId(e.target.value)
                                }}
                                size="lg"
                                placeholder={
                                  !errors.transaction_Id
                                    ? 'Transaction ID'
                                    : errors.transaction_Id[0]
                                }
                              />
                            </CInputGroup>
                          </CListGroupItem>
                          {/* <CListGroupItem>
                            <strong>{currentRequest.order.package}</strong>
                            <br />
                            <small className="small text-medium-emphasis">
                              {currentRequest.order.transaction_Id}
                            </small>
                          </CListGroupItem> */}
                        </>
                      )}
                      {actionState === 'group' &&
                        workgroups.result &&
                        workgroups.result.map((item, i) => (
                          <CListGroupItem key={i}>
                            <strong>{item.name}</strong>

                            <CAvatar
                              onClick={() => {
                                if (jobWorkgroup && jobWorkgroup.id == item.id) {
                                  setUserJobWorkgroup(null)
                                } else {
                                  setServciesSelected(setUserJobWorkgroup(item))
                                }
                              }}
                              style={{
                                float: 'right',
                                cursor: 'pointer',
                              }}
                              src={
                                collapsibleVisible && jobWorkgroup && jobWorkgroup.id == item.id
                                  ? 'https://res.cloudinary.com/g-draf-inc/image/upload/v1629126423/delete_mq5y4c.svg'
                                  : 'https://res.cloudinary.com/g-draf-inc/image/upload/v1621414081/plus_a06iqt.svg'
                                //: 'https://res.cloudinary.com/g-draf-inc/image/upload/v1629126423/delete_mq5y4c.svg'
                              }
                              size="sm"
                            />

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
                        <CCardTitle>
                          {actionState === 'group' ? 'Additonal Information' : 'Services Requested'}
                        </CCardTitle>
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
                    <CListGroup>
                      {isLoading && <CSpinner component="span" aria-hidden="true" />}
                      {currentRequest.services &&
                        actionState !== 'receipt' &&
                        actionState !== 'group' &&
                        currentRequest.services.map((item, i) => (
                          <CListGroupItem key={i}>
                            <strong>{item.name}</strong>
                            {!isGeneratingRecipt && actionState === 'receipt' && (
                              <CAvatar
                                onClick={() => {
                                  if (servicesSelcted.filter((s) => s.id === item.id).length == 0) {
                                    setServciesSelected([...servicesSelcted, item])
                                  } else {
                                    setServciesSelected(
                                      servicesSelcted.filter((s) => s.id !== item.id),
                                    )
                                  }
                                  // setisEditPermission(true)
                                }}
                                style={{
                                  float: 'right',
                                  cursor: 'pointer',
                                }}
                                src={
                                  collapsibleVisible &&
                                  servicesSelcted.filter((s) => s.id === item.id).length == 0
                                    ? 'https://res.cloudinary.com/g-draf-inc/image/upload/v1621414081/plus_a06iqt.svg'
                                    : 'https://res.cloudinary.com/g-draf-inc/image/upload/v1629126423/delete_mq5y4c.svg'
                                }
                                size="sm"
                              />
                            )}
                            <br />
                            <small className="small text-medium-emphasis">{item.description}</small>
                          </CListGroupItem>
                        ))}
                      {actionState === 'receipt' &&
                        services.result &&
                        services.result.map((item, i) => (
                          <CListGroupItem key={i}>
                            <strong>{item.name}</strong>
                            {!isGeneratingRecipt && (
                              <CAvatar
                                onClick={() => {
                                  if (servicesSelcted.filter((s) => s.id === item.id).length == 0) {
                                    setServciesSelected([...servicesSelcted, item])
                                  } else {
                                    setServciesSelected(
                                      servicesSelcted.filter((s) => s.id !== item.id),
                                    )
                                  }
                                  // setisEditPermission(true)
                                }}
                                style={{
                                  float: 'right',
                                  cursor: 'pointer',
                                }}
                                src={
                                  collapsibleVisible &&
                                  servicesSelcted.filter((s) => s.id === item.id).length == 0
                                    ? 'https://res.cloudinary.com/g-draf-inc/image/upload/v1621414081/plus_a06iqt.svg'
                                    : 'https://res.cloudinary.com/g-draf-inc/image/upload/v1629126423/delete_mq5y4c.svg'
                                }
                                size="sm"
                              />
                            )}
                            <br />
                            <small className="small text-medium-emphasis">{item.description}</small>
                          </CListGroupItem>
                        ))}
                      {actionState === 'group' && (
                        <>
                          <CListGroupItem>
                            <CInputGroup className="mb-3">
                              <CInputGroupText>Due Date</CInputGroupText>
                              <CFormControl
                                value={dueDate}
                                type="date"
                                className={errors.due_date && 'is-invalid'}
                                onChange={(e) => {
                                  setErrors({})
                                  setDueDate(e.target.value)
                                }}
                                size="lg"
                                placeholder={!errors.due_date ? 'Due Date' : errors.due_date[0]}
                              />
                            </CInputGroup>
                          </CListGroupItem>
                          {/* <CListGroupItem>
                            <CInputGroup className="mb-3">
                              <CFormControl
                                value={additionalComments}
                                component="textarea"
                                className={errors.additional_comments && 'is-invalid'}
                                onChange={(e) => {
                                  setErrors({})
                                  setadditionalComments(e.target.value)
                                }}
                                size="lg"
                                placeholder={
                                  !errors.additional_comments
                                    ? 'Additional Comments'
                                    : errors.additional_comments[0]
                                }
                              />
                            </CInputGroup>
                          </CListGroupItem> */}
                          {/* <CListGroupItem>
                            <strong>{currentRequest.order.package}</strong>
                            <br />
                            <small className="small text-medium-emphasis">
                              {currentRequest.order.transaction_Id}
                            </small>
                          </CListGroupItem> */}
                        </>
                      )}
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
                      {actionState === 'group' || actionState === 'receipt'
                        ? 'Activities'
                        : 'Group Assigned'}
                    </CCardTitle>
                  </CCardHeader>
                  <CCardBody>
                    {actionState === 'receipt' && (
                      <CButton
                        onClick={() => {
                          if (servicesSelcted.length < 1) {
                            addToast(roleErrorToast)
                            return
                          }
                          if (!transactionId) {
                            addToast(GroupErrorToast)
                            return
                          }

                          if (orderPackage === 'Select Client Package') {
                            addToast(selectClientPackageError)
                            return
                          }
                          setVisible(true)
                        }}
                        color="info"
                        size="lg"
                      >
                        Generate Receipt
                      </CButton>
                    )}
                    {actionState === 'group' && (
                      <CButton
                        onClick={() => {
                          if (!jobWorkgroup) {
                            addToast(jobGroupErrorToast)
                            return
                          }
                          if (!dueDate) {
                            addToast(dueDateToastError)
                            return
                          }

                          setVisible(true)
                        }}
                        color="info"
                        size="lg"
                      >
                        Assign Group
                      </CButton>
                    )}
                    {actionState !== 'grouo' && actionState !== 'receipt' && jobWorkgroup && (
                      <CListGroupItem>
                        <strong>{jobWorkgroup.name}</strong>

                        <small className="small text-medium-emphasis">
                          {currentRequest.order && currentRequest.order.due_date}
                        </small>
                      </CListGroupItem>
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

const renderequests = (
  requests,
  selectRequest,
  setCollapsibleVisible,
  id,
  collapsibleVisible,
  isLoading,
  request,
  setAction,
) => {
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
            selectRequest,
            request,
            isLoading,
            setAction,
            setCollapsibleVisible,
          )}
          placement="bottom"
        >
          <CIcon name="cil-settings" size="lg" />
        </CPopover>
      </CTableDataCell>
    </CTableRow>
  ))

  return allRequest
}

const renderPopOverContent = (
  item,
  selectUser,
  request,
  isLoading,
  setAction,
  setCollapsibleVisible,
) => (
  <CListGroup>
    <CListGroupItem component="button">Hide</CListGroupItem>
    <CListGroupItem
      onClick={() => {
        setAction('receipt')
        // setCollapsibleVisible(item)
      }}
      component="button"
    >
      Generate Receipt
    </CListGroupItem>
    <CListGroupItem
      onClick={() => {
        setAction('group')
        // setCollapsibleVisible(item)
      }}
      component="button"
    >
      Assign To a Group
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

export default Requests
