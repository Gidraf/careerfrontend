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
  fetchAllRoles,
  editRole,
  deleteRole,
  viewRolePermissions,
  viewRoleUsers,
  addRolePermissions,
  viewAllPermissions,
} from '../../actions/admin/role.action'

const Roles = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(null)
  const [isSuccess, setisSucess] = useState(false)
  const [actionState, setActionState] = useState('')
  const [collapsibleVisible, setCollapsible] = useState(false)
  const [rolesPermissions, setRolesPermissions] = useState([])
  const [rolesusers, setRolesUsers] = useState({})
  const [isPermissionLoading, setIsPermissionLoading] = useState(false)
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const reducePermissions = useSelector((state) => state.rolesPermissions)
  const permissions = useSelector((state) => state.permissions)

  const [isEditPemission, setisEditPermission] = useState(false)
  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const [isAddingPermissionsLoading, setIsAddingPermissionsLoading] = useState(false)
  const [activeKey, setActiveKey] = useState(-1)

  const roles = useSelector((state) => state.roleReducer)
  useEffect(() => {
    dispatch(fetchAllRoles())
    dispatch(viewAllPermissions())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleErrors = (errors) => {
    setErrors(errors.errors)
  }

  const handleSuccess = (data) => {
    setisSucess(true)
    if (actionState === `delete`) {
      setVisible(false)
    }
    dispatch(fetchAllRoles())
  }

  const handlePermissionAddedSuccess = (data) => {
    dispatch(
      viewRolePermissions(id, handleErrors, handlePermissionsSuccess, setIsPermissionLoading),
    )
    setisEditPermission(false)
  }

  const selectRole = (item, actionState) => {
    setActionState(actionState)
    setId(item.id)
    setName(item.name)
    setDescription(item.description)
    setVisible(true)
  }

  const handlePermissionsSuccess = (data) => {
    setRolesPermissions(data.result)
  }

  const handleUserSuccess = (data) => {
    setRolesUsers(data)
  }

  const setCollapsibleVisible = (item) => {
    if (collapsibleVisible) {
      setCollapsible(false)
      setId(null)
      setRolesPermissions([])
      setRolesUsers([])
      return
    }
    setId(item.id)
    setCollapsible(true)
    dispatch(
      viewRolePermissions(item.id, handleErrors, handlePermissionsSuccess, setIsPermissionLoading),
    )
    dispatch(viewRoleUsers(item.id, handleErrors, handleUserSuccess, setIsUsersLoading))
  }

  const saveRolePermissions = () => {
    const data = []
    if (isEditPemission) {
      for (let i = 0; i < rolesPermissions.length; i++) {
        data.push(rolesPermissions[i].id)
      }
    }
    dispatch(
      addRolePermissions(
        id,
        { permissions: data },
        handleErrors,
        handlePermissionAddedSuccess,
        setIsAddingPermissionsLoading,
      ),
    )
  }

  const discardPermissionsChanges = () => {
    setRolesPermissions(reducePermissions)
    setisEditPermission(false)
  }

  const SubmitRole = () => {
    if (id !== null) {
      dispatch(
        editRole(
          id,
          {
            name: name,
            description: description,
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
    setisSucess(false)
  }

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CModal visible={visible} onDismiss={() => resetModal}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>
            {isSuccess && <CAlert color="success">Role Successfully Edited!</CAlert>}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {actionState === 'edit' ? (
            <CForm className="row g-3">
              <h3>Edit Role</h3>
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
                  placeholder={!errors.sir_name ? 'Name' : errors.sir_name[0]}
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
                    onClick={SubmitRole}
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
                  dispatch(deleteRole(id, handleErrors, handleSuccess, setIsLoading))
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
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {roles.result &&
            renderRoles(
              roles.result,
              selectRole,
              setCollapsibleVisible,
              id,
              collapsibleVisible,
              isPermissionLoading,
              isUsersLoading,
              isEditPemission,
              addToast,
              permissionsErrorToast,
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
                        <CCardTitle>Permission</CCardTitle>
                      </CCol>
                      <CCol className="col-3">
                        <CPopover
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
                        </CPopover>
                      </CCol>
                    </CRow>
                  </CCardHeader>
                  <CCardBody>
                    <CListGroup>
                      {isPermissionLoading && <CSpinner component="span" aria-hidden="true" />}
                      {rolesPermissions.map((item, i) => (
                        <CListGroupItem key={i}>
                          <strong>{item.name}</strong>
                          <br />
                          <small className="small text-medium-emphasis">{item.endpoint}</small>
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
                    <CCardTitle>Users</CCardTitle>
                  </CCardHeader>
                  <CCardBody>
                    <CListGroup>
                      {isUsersLoading && <CSpinner component="span" aria-hidden="true" />}
                      {rolesusers.result &&
                        rolesusers.result.map((item, i) => (
                          <CListGroupItem key={i}>
                            <strong>{`${item.sir_name} ${item.last_name}`}</strong>
                            <br />
                            <small className="small text-medium-emphasis">{item.email}</small>
                          </CListGroupItem>
                        ))}
                    </CListGroup>
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

const renderRoles = (
  roles,
  selectRole,
  setCollapsibleVisible,
  id,
  collapsibleVisible,
  isPermissionLoading,
  isUsersLoading,
  isEditPemission,
  addToast,
  permissionsErrorToast,
) => {
  let filteredRoles = roles
  const currentRole = roles.filter((role) => role.id === id)
  if (currentRole.length > 0 && collapsibleVisible) {
    filteredRoles = currentRole
  }
  const allRoles = filteredRoles.map((item, i) => (
    <CTableRow key={i} style={{ cursor: 'pointer' }}>
      <CTableDataCell
        onClick={() => {
          if (!isPermissionLoading && !isUsersLoading)
            if (isEditPemission) {
              addToast(permissionsErrorToast)
              return
            }
          setCollapsibleVisible(item)
        }}
      >
        <strong>{item.name}</strong>
        <div className="small text-medium-emphasis">{item.created_at}</div>
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => {
          if (!isPermissionLoading && !isUsersLoading)
            if (isEditPemission) {
              addToast(permissionsErrorToast)
              return
            }
          setCollapsibleVisible(item)
        }}
      >
        {/* <CIcon size="xl" name="cif-us" title="us" id="us" /> */}
        <strong>{item.description}</strong>
      </CTableDataCell>
      <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
        <CPopover
          title="Manage Workgroups"
          content={renderPopOverContent(item, selectRole)}
          placement="bottom"
        >
          <CIcon name="cil-settings" size="lg" />
        </CPopover>
      </CTableDataCell>
    </CTableRow>
  ))

  return allRoles
}

const renderPopOverContent = (item, selectRole) => (
  <CListGroup>
    <CListGroupItem component="button">Assign/Remove Permission</CListGroupItem>
    <CListGroupItem component="button" onClick={() => selectRole(item, 'edit')}>
      Edit
    </CListGroupItem>
    <CListGroupItem component="button" onClick={() => selectRole(item, 'delete')}>
      Delete
    </CListGroupItem>
    <CListGroupItem component="button">View Permissions</CListGroupItem>
  </CListGroup>
)

const renderPermissions = (
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
) => (
  <CAccordion style={{ width: '380px' }}>
    {permissions &&
      Object.entries(permissions).map((item, i) => {
        const [dept, perm] = item
        console.log(perm)
        return (
          <CAccordionItem key={i} style={{ height: '30px', marginTop: '.8rem' }}>
            <CAccordionHeader>
              <CAccordionButton
                collapsed={activeKey !== i}
                onClick={() => (activeKey === i ? setActiveKey(-1) : setActiveKey(i))}
              >
                <span>{`${dept} Permissions`}</span>
                {isEditPemission &&
                  activeKey === i &&
                  (!isAddingPermissionsLoading ? (
                    <div
                      style={{
                        display: 'block',
                        padding: '5px',
                        width: '40%',
                      }}
                    >
                      <CButton
                        onClick={discardPermissionsChanges}
                        color="danger"
                        size="sm"
                        style={{ float: 'left', color: 'white' }}
                      >
                        Discard
                      </CButton>
                      <CButton
                        onClick={saveRolePermissions}
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
              </CAccordionButton>
            </CAccordionHeader>
            <CAccordionCollapse visible={activeKey === i}>
              <CAccordionBody>
                {perm.map((val, k) => (
                  <div key={k} className="mb-3">
                    <strong style={{ float: 'left' }}>{val.name}</strong>
                    {!isAddingPermissionsLoading && (
                      <CAvatar
                        onClick={() => {
                          if (rolesPermissions.filter((p) => p.id === val.id).length == 0) {
                            setRolesPermissions([...rolesPermissions, val])
                          } else {
                            setRolesPermissions(rolesPermissions.filter((p) => p.id !== val.id))
                          }
                          setisEditPermission(true)
                        }}
                        style={{
                          float: 'right',
                          cursor: 'pointer',
                        }}
                        src={
                          collapsibleVisible &&
                          rolesPermissions.filter((p) => p.id === val.id).length == 0
                            ? 'https://res.cloudinary.com/g-draf-inc/image/upload/v1621414081/plus_a06iqt.svg'
                            : 'https://res.cloudinary.com/g-draf-inc/image/upload/v1629126423/delete_mq5y4c.svg'
                        }
                        size="sm"
                      />
                    )}
                    <br />
                    <small className="text-muted">{item.endpoint}</small>
                  </div>
                ))}
              </CAccordionBody>
            </CAccordionCollapse>
          </CAccordionItem>
        )
      })}
  </CAccordion>
)

export default Roles
