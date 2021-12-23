import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoogleLogin from 'react-google-login'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardTitle,
  CCollapse,
  CCallout,
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
import {
  fetchAllgroups,
  editWorkgroup,
  deleteWorkgroup,
  viewWorkgroupUsers,
  connectGroupToGmail,
  disconnectGroupToGmail,
} from '../../actions/admin/group.action'

const Workgroups = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')

  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState(null)
  const [isSuccess, setisSucess] = useState(false)
  const [actionState, setActionState] = useState(null)
  const [collapsibleVisible, setCollapsible] = useState(false)
  const [groupUsers, setWorkgroupUsers] = useState({})
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const [groupToken, setGroupToken] = useState(null)

  const groups = useSelector((state) => state.groupReducer)
  useEffect(() => dispatch(fetchAllgroups()), []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleErrors = (errors) => {
    setErrors(errors.errors)
  }

  const handleSuccess = (data) => {
    setisSucess(true)
    if (actionState === `delete`) {
      setVisible(false)
    }
    dispatch(fetchAllgroups())
  }

  const handleUserSuccess = (data) => {
    setWorkgroupUsers(data)
  }

  const responseGoogle = (response) => {
    dispatch(
      connectGroupToGmail(
        {
          auth_code: response.code,
          group_id: id,
        },
        handleErrors,
        handleSuccess,
        setCollapsibleVisible,
      ),
    )
  }

  const disconnectGmail = (response) => {
    const confirm = window.confirm('Are you sure you want to Disconnect this Workgroup')
    if (confirm) {
      dispatch(disconnectGroupToGmail(id, handleErrors, handleSuccess, setCollapsibleVisible))
    }
  }

  const setCollapsibleVisible = (item) => {
    if (collapsibleVisible) {
      setCollapsible(false)
      setId(null)
      setWorkgroupUsers({})
      setGroupToken(null)
      return
    }
    setId(item.id)
    setGroupToken(item.token_id)
    setCollapsible(true)

    dispatch(viewWorkgroupUsers(item.id, handleErrors, handleUserSuccess, setIsUsersLoading))
  }

  const selectWorkgroup = (item, actionState) => {
    setActionState(actionState)
    setId(item.id)
    setName(item.name)
    setDescription(item.description)
    setEmail(item.email)
    setGroupToken(item.token_id)
    setTopic(item.topic)
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
            topic: topic,
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
    setGroupToken('')
    setTopic('')
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
                <CInputGroupText></CInputGroupText>
                <CFormControl
                  value={topic}
                  type="text"
                  className={errors.topic && 'is-invalid'}
                  onChange={(e) => {
                    setErrors({})
                    setTopic(e.target.value)
                  }}
                  size="lg"
                  placeholder={!errors.topic ? 'Topic' : errors.topic[0]}
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
        <CTableBody>
          {groups.result &&
            renderGroups(
              groups.result,
              selectWorkgroup,
              setCollapsibleVisible,
              id,
              collapsibleVisible,
              isUsersLoading,
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
                    <CCardTitle>Users</CCardTitle>
                  </CCardHeader>
                  <CCardBody>
                    <CListGroup>
                      {isUsersLoading && <CSpinner component="span" aria-hidden="true" />}
                      {groupUsers.result &&
                        groupUsers.result.map((item, i) => (
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
            <CCol>
              <CCallout color="primary" style={{ padding: 0 }}>
                <CCard className="mt-1" style={{ marginTop: 0 }}>
                  <CCardHeader>
                    <CCardTitle>Tasks</CCardTitle>
                  </CCardHeader>
                  <CCardBody></CCardBody>
                </CCard>
              </CCallout>
            </CCol>
            <CCol>
              <CCallout color="primary" style={{ padding: 0 }}>
                <CCard className="mt-1" style={{ marginTop: 0 }}>
                  <CCardHeader>
                    <CCardTitle>Configurations</CCardTitle>
                  </CCardHeader>
                  <CCardBody>
                    {!groupToken ? (
                      <GoogleLogin
                        clientId="973683055487-qp9hfrqpaefunvgtts3717dtohur8cqn.apps.googleusercontent.com"
                        buttonText="Connect to Gmail"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        accessType="offline"
                        responseType="code"
                        prompt="consent"
                        scope={'https://www.googleapis.com/auth/gmail.modify'}
                        cookiePolicy={'single_host_origin'}
                      />
                    ) : (
                      <CButton onClick={disconnectGmail}>Disconnect</CButton>
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

const renderGroups = (
  groups,
  selectWorkgroup,
  setCollapsibleVisible,
  id,
  collapsibleVisible,
  isUsersLoading,
) => {
  let filteredGroups = groups
  const currentGroup = groups.filter((role) => role.id === id)
  if (currentGroup.length > 0 && collapsibleVisible) {
    filteredGroups = currentGroup
  }
  const allGroups = filteredGroups.map((item, i) => (
    <CTableRow key={i} style={{ cursor: 'pointer' }}>
      <CTableDataCell onClick={() => !isUsersLoading && setCollapsibleVisible(item)}>
        <div>{item.name}</div>
        <div className="small text-medium-emphasis">{item.created_at}</div>
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => !isUsersLoading && setCollapsibleVisible(item)}
      >
        {/* <CIcon size="xl" name="cif-us" title="us" id="us" /> */}
        <div>{item.email}</div>
      </CTableDataCell>
      <CTableDataCell
        className="text-center"
        onClick={() => !isUsersLoading && setCollapsibleVisible(item)}
      >
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
