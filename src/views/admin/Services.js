import React, { lazy, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CBadge,
  CCardBody,
  CCardTitle,
  CCallout,
  CCardFooter,
  CCardHeader,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CAccordionCollapse,
  CAccordionButton,
  CToastBody,
  CToaster,
  CToastHeader,
  CToast,
  CAlert,
  CCollapse,
  CForm,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
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
import {
  fetchAllServices,
  editService,
  deleteService,
  saveService,
} from '../../actions/admin/service.action'

const Services = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(null)
  const [isSuccess, setisSucess] = useState(false)
  const [actionState, setActionState] = useState('')
  const [collapsibleVisible, setCollapsible] = useState(false)

  const services = useSelector((state) => state.serviceReducer)

  //   const roles = useSelector((state) => state.roleReducer)
  useEffect(() => {
    dispatch(fetchAllServices())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleErrors = (errors) => {
    setErrors(errors.errors)
  }

  const handleSuccess = (data) => {
    setisSucess(true)
    if (actionState === `delete`) {
      setVisible(false)
    }
    dispatch(fetchAllServices())
  }

  const selectService = (item, actionState) => {
    setActionState(actionState)
    setId(item.id)
    setName(item.name)
    setDescription(item.description)
    setPrice(item.price)
    setVisible(true)
  }

  const setCollapsibleVisible = (item) => {
    if (collapsibleVisible) {
      setCollapsible(false)
      setId(null)

      return
    }
    setId(item.id)
    setCollapsible(true)
  }

  const SubmitService = () => {
    if (id !== null) {
      dispatch(
        editService(
          id,
          {
            name: name,
            description: description,
            price: price,
          },
          handleErrors,
          handleSuccess,
          setIsLoading,
        ),
      )
    }
  }

  const permissionsErrorToast = (
    <CToast placement="top-end" title="" autohide={true}>
      <CToastHeader close>
        <strong className="me-auto">Some Changes will be Lost</strong>
      </CToastHeader>
      <CToastBody>Please Discard or save the Changes made on Role Permissions</CToastBody>
    </CToast>
  )

  const resetModal = () => {
    setId(null)
    setVisible(false)
    setName('')
    setDescription('')
    setPrice('')
    setisSucess(false)
  }

  return (
    <>
      {/* <CToaster ref={toaster} push={toast} placement="top-end" /> */}
      <CModal visible={visible} onDismiss={() => resetModal}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>
            {isSuccess && <CAlert color="success">Service Successfully Edited!</CAlert>}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {actionState === 'edit' ? (
            <CForm className="row g-3">
              <h3>Edit Service</h3>
              <p className="text-medium-emphasis">Edit {name}</p>
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon name="cil-note" />
                </CInputGroupText>
                <CFormControl
                  value={name}
                  className={errors.name && 'is-invalid'}
                  onChange={(e) => {
                    setErrors({})
                    setName(e.target.value)
                  }}
                  size="lg"
                  placeholder={!errors.name ? 'Name' : errors.name[0]}
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon name="cil-note" />
                </CInputGroupText>
                <CFormControl
                  component="textarea"
                  value={description}
                  className={errors.description && 'is-invalid'}
                  onChange={(e) => {
                    setErrors({})
                    setDescription(e.target.value)
                  }}
                  size="lg"
                  placeholder={!errors.description ? 'Description' : errors.description[0]}
                />
              </CInputGroup>

              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CIcon name="cil-note" />
                </CInputGroupText>
                <CFormControl
                  value={price}
                  className={errors.price && 'is-invalid'}
                  onChange={(e) => {
                    setErrors({})
                    setPrice(e.target.value)
                  }}
                  size="lg"
                  placeholder={!errors.price ? 'Description' : errors.price[0]}
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
                    onClick={SubmitService}
                    className="btn btn-success"
                    type="button"
                    size="lg"
                    value="Save Changes"
                  />
                )}
              </CCol>
            </CForm>
          ) : (
            <span>Do you want to delete {name}</span>
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
                  dispatch(deleteService(id, handleErrors, handleSuccess, setIsLoading))
                }
              }}
              color="primary"
            >
              Yes
            </CButton>
          </CModalFooter>
        )}
      </CModal>
      <CTable hover striped responsive align="middle" className="mb-0 border">
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Description</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Price</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {services.result &&
            renderService(
              services.result,
              selectService,
              setCollapsibleVisible,
              id,
              collapsibleVisible,
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
                        <CCardTitle>Tasks</CCardTitle>
                      </CCol>
                      <CCol className="col-3">
                        {/* <CPopover
                          title="Edit Permissions"
                          trigger="click"
                          content={renderPermissions(
                            permissions,
                            isEditPemission,
                            setisEditPermission,
                            rolesPermissions,
                            setRolesPermissions,
                            collapsibleVisible,
                            discardPermissionsChanges,
                            isAddingPermissionsLoading,
                            saveRolePermissions,
                            activeKey,
                            setActiveKey,
                          )}
                          placement="bottom"
                        >
                          <CButton size="sm">Edit ➕</CButton>
                        </CPopover> */}
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    {/* <CListGroup>
                      {isPermissionLoading && <CSpinner component="span" aria-hidden="true" />}
                      {rolesPermissions.map((item, i) => (
                        <CListGroupItem key={i}>
                          <strong>{item.name}</strong>
                          <br />
                          <small className="small text-medium-emphasis">{item.endpoint}</small>
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
                    <CCardTitle>Requests</CCardTitle>
                  </CCardHeader>
                  <CCardBody>
                    {/* <CListGroup>
                      {isUsersLoading && <CSpinner component="span" aria-hidden="true" />}
                      {rolesusers.result &&
                        rolesusers.result.map((item, i) => (
                          <CListGroupItem key={i}>
                            <strong>{`${item.sir_name} ${item.last_name}`}</strong>
                            <br />
                            <small className="small text-medium-emphasis">{item.email}</small>
                          </CListGroupItem>
                        ))}
                    </CListGroup> */}
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

const renderService = (services, selectService, setCollapsibleVisible, id, collapsibleVisible) => {
  let filteredServces = services
  const currentService = services.filter((role) => role.id === id)
  if (currentService.length > 0 && collapsibleVisible) {
    filteredServces = currentService
  }
  const allServices = filteredServces.map((item, i) => (
    <CTableRow key={i} style={{ cursor: 'pointer' }}>
      <CTableDataCell
        onClick={() => {
          //   if (!isPermissionLoading && !isUsersLoading)
          //     if (isEditPemission) {
          //       addToast(permissionsErrorToast)
          //       return
          //     }
          setCollapsibleVisible(item)
        }}
      >
        <strong>{item.name}</strong>
        <div className="small text-medium-emphasis">{item.created_at}</div>
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => {
          //   if (!isPermissionLoading && !isUsersLoading)
          //     if (isEditPemission) {
          //       addToast(permissionsErrorToast)
          //       return
          //     }
          setCollapsibleVisible(item)
        }}
      >
        {/* <CIcon size="xl" name="cif-us" title="us" id="us" /> */}
        <strong>{item.description}</strong>
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => {
          //   if (!isPermissionLoading && !isUsersLoading)
          //     if (isEditPemission) {
          //       addToast(permissionsErrorToast)
          //       return
          //     }
          setCollapsibleVisible(item)
        }}
      >
        {/* <CIcon size="xl" name="cif-us" title="us" id="us" /> */}
        <strong>{item.price}</strong>
      </CTableDataCell>
      <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
        <CPopover
          title="Manage Workgroups"
          content={renderPopOverContent(item, selectService)}
          placement="bottom"
        >
          <CIcon name="cil-settings" size="lg" />
        </CPopover>
      </CTableDataCell>
    </CTableRow>
  ))

  return allServices
}

const renderPopOverContent = (item, selectService) => (
  <CListGroup>
    <CListGroupItem component="button" onClick={() => selectService(item, 'edit')}>
      Edit
    </CListGroupItem>
    <CListGroupItem component="button" onClick={() => selectService(item, 'delete')}>
      Delete
    </CListGroupItem>
  </CListGroup>
)

export default Services
