import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CContainer,
  CForm,
  CSpinner,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { saveWorkgroup } from '../../actions/admin/group.action'

const WorkgroupForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [topic, setTopic] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()

  const handleErrors = (errors) => {
    setErrors(errors.errors)
  }

  const handleSuccess = (data) => {
    setVisible(true)
  }
  const SubmitWorkgroup = () => {
    dispatch(
      saveWorkgroup(
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

  return (
    // <div className="flex-row bg-light min-vh-100 d-flex align-items-center">
    <CContainer>
      <CModal visible={visible} onDismiss={() => setVisible(false)}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>Workgroup Added Successfully!</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to add another Workgroup?</CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false)
              history.push('/workgroups')
            }}
          >
            No
          </CButton>
          <CButton
            onClick={() => {
              setName('')
              setDescription('')
              setEmail('')
              setVisible(false)
            }}
            color="primary"
          >
            Yes
          </CButton>
        </CModalFooter>
      </CModal>
      <CRow className="justify-content-center">
        <CCol md="9" lg="7" xl="6">
          <CCard className="mx-4">
            <CCardBody className="p-4">
              <CForm className="row g-3">
                <h3>New Workgroup</h3>
                <p className="text-medium-emphasis">Add a New Workgroup</p>
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
                    value={email}
                    type="email"
                    className={errors.email && 'is-invalid'}
                    onChange={(e) => {
                      setErrors({})
                      setEmail(e.target.value)
                    }}
                    size="lg"
                    placeholder={!errors.email ? 'Workgroup Email' : errors.email[0]}
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon name="cil-note" />
                  </CInputGroupText>
                  <CFormControl
                    value={topic}
                    type="text"
                    className={errors.topic && 'is-invalid'}
                    onChange={(e) => {
                      setErrors({})
                      setTopic(e.target.value)
                    }}
                    size="lg"
                    placeholder={!errors.topic ? 'Workgroup Topic' : errors.email[0]}
                  />
                </CInputGroup>

                <CCol xs="6">
                  <CFormControl
                    onClick={() => {
                      setVisible(false)
                      history.push('/workgroups')
                    }}
                    className="btn btn-primary"
                    type="button"
                    size="lg"
                    value="Back"
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
                      value="Add Workgroup"
                    />
                  )}
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
    // </div>
  )
}

export default WorkgroupForm
