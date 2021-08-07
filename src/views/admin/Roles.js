import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CBadge,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CAlert,
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
import { fetchAllRoles, editRole, deleteRole } from '../../actions/admin/role.action'

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

  const roles = useSelector((state) => state.roleReducer)
  useEffect(() => dispatch(fetchAllRoles()), []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleErrors = (errors) => {
    setErrors(errors.errors)
  }

  const handleSuccess = (data) => {
    setisSucess(true)
    dispatch(fetchAllRoles())
  }

  const selectRole = (item, actionState) => {
    setActionState(actionState)
    setId(item.id)
    setName(item.name)
    setDescription(item.description)
    setVisible(true)
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

  const resetModal = () => {
    setId(null)
    setVisible(false)
    setName('')
    setDescription('')
    setisSucess(false)
  }

  return (
    <>
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
        <CTableBody>{roles.result && renderRoles(roles.result, selectRole)}</CTableBody>
      </CTable>
    </>
  )
}

const renderRoles = (roles, selectRole) => {
  const allRoles = roles.map((item, i) => (
    <CTableRow key={i}>
      <CTableDataCell>
        <div>{item.name}</div>
        <div className="small text-medium-emphasis">{item.created_at}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center">
        {/* <CIcon size="xl" name="cif-us" title="us" id="us" /> */}
        <div>{item.description}</div>
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

export default Roles
