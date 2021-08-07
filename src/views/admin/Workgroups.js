import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
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
  CBadge,
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
import { fetchAllgroups, editWorkgroup, deleteWorkgroup } from '../../actions/admin/group.action'

const Workgroups = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(null)
  const [isSuccess, setisSucess] = useState(false)
  const [actionState, setActionState] = useState(null)

  const groups = useSelector((state) => state.groupReducer)
  useEffect(() => dispatch(fetchAllgroups()), []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleErrors = (errors) => {
    setErrors(errors.errors)
  }

  const handleSuccess = (data) => {
    setisSucess(true)
    dispatch(fetchAllgroups())
  }

  const selectWorkgroup = (item, actionState) => {
    setActionState(actionState)
    setId(item.id)
    setName(item.name)
    setDescription(item.description)
    setEmail(item.email)
    setVisible(true)
  }

  const SubmitWorkgroup = () => {
    if (id !== null) {
      dispatch(
        editWorkgroup(
          id,
          {
            name: name,
            description: description,
            email: email,
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
    setEmail('')
    setisSucess(false)
  }

  return (
    <>
      <CModal visible={visible} onDismiss={() => resetModal}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>
            {isSuccess && <CAlert color="success">Workgroup Successfully Edited!</CAlert>}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          {actionState === 'edit' ? (
            <CForm className="row g-3">
              <h3>Edit Workgroup</h3>
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
                <CInputGroupText></CInputGroupText>
                <CFormControl
                  value={email}
                  type="email"
                  className={errors.email && 'is-invalid'}
                  onChange={(e) => {
                    setErrors({})
                    setEmail(e.target.value)
                  }}
                  size="lg"
                  placeholder={!errors.email ? 'Email' : errors.email[0]}
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
                    onClick={SubmitWorkgroup}
                    className="btn btn-success"
                    type="button"
                    size="lg"
                    value="Save Changes"
                  />
                )}
              </CCol>
            </CForm>
          ) : (
            <span>Are you sure you want to delete {name}</span>
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
                  dispatch(deleteWorkgroup(id, handleErrors, handleSuccess, setIsLoading))
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
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Description</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>{groups.result && renderGroups(groups.result, selectWorkgroup)}</CTableBody>
      </CTable>
    </>
  )
}

const renderGroups = (groups, selectWorkgroup) => {
  const allGroups = groups.map((item, i) => (
    <CTableRow key={i}>
      <CTableDataCell>
        <div>{item.name}</div>
        <div className="small text-medium-emphasis">{item.created_at}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center">
        {/* <CIcon size="xl" name="cif-us" title="us" id="us" /> */}
        <div>{item.email}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center">
        {/* <CIcon size="xl" name="cif-us" title="us" id="us" /> */}
        <div>{item.description}</div>
      </CTableDataCell>
      <CTableDataCell className="text-center" style={{ cursor: 'pointer' }}>
        <CPopover
          title="Manage Workgroups"
          content={renderPopOverContent(item, selectWorkgroup)}
          placement="bottom"
        >
          <CIcon name="cil-settings" size="lg" />
        </CPopover>
      </CTableDataCell>
    </CTableRow>
  ))

  return allGroups
}

const renderPopOverContent = (item, selectWorkgroup) => (
  <CListGroup>
    <CListGroupItem component="button">Assign/Remove User</CListGroupItem>
    <CListGroupItem component="button" onClick={() => selectWorkgroup(item, 'edit')}>
      Edit
    </CListGroupItem>
    <CListGroupItem component="button" onClick={() => selectWorkgroup(item, 'delete')}>
      Delete
    </CListGroupItem>
    <CListGroupItem component="button">View Users</CListGroupItem>
    <CListGroupItem component="button">View Report</CListGroupItem>
  </CListGroup>
)

export default Workgroups
