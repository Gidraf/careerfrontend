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

import { saveService } from '../../actions/admin/service.action'

const ServiceForm = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleErrors = (errors) => {
    setErrors(errors.errors)
  }

  const handleSuccess = (data) => {
    setVisible(true)
  }
  const SubmitService = () => {
    dispatch(
      saveService(
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

  return (
    // <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CModal visible={visible} onDismiss={() => setVisible(false)}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>Service Added Successfully!</CModalTitle>
        </CModalHeader>
        <CModalBody>Do you want to add another Service?</CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setVisible(false)
              history.push('/services')
            }}
          >
            No
          </CButton>
          <CButton
            onClick={() => {
              setName('')
              setDescription('')
              setPrice('')
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
                <h3>New Service</h3>
                <p className="text-medium-emphasis">Add a New Service</p>
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
                    placeholder={!errors.price ? 'Price' : errors.price[0]}
                  />
                </CInputGroup>

                <CCol xs="6">
                  <CFormControl
                    onClick={() => {
                      setVisible(false)
                      history.push('/services')
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
                      onClick={SubmitService}
                      className="btn btn-success"
                      type="button"
                      size="lg"
                      value="Add Service"
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

export default ServiceForm
