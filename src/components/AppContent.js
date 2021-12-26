import React, { Suspense, useState, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import moment from 'moment'
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
  CFormSelect,
  CSpinner,
  CFormControl,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormText,
} from '@coreui/react'
import 'react-datepicker/dist/react-datepicker.css'
// routes config

import routes from '../routes'

const AppContent = () => {
  const [startDate, setStartDate] = useState(new Date(moment().startOf('month').format()))
  const [endDate, setEndDate] = useState(new Date(moment().endOf('month').format()))
  const [perPage, setPerPage] = useState(25)
  const [querText, setQueryText] = useState('')
  const [groupId, setgroupId] = useState('')
  const groups = useSelector((state) => state.groupReducer)
  const dispatch = useDispatch()
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      {route.name === 'Requests' && (
                        <CRow>
                          <CCol xs={3}>
                            <CInputGroup className="mb-3">
                              <CInputGroupText>
                                <span className="iconify" data-icon="cil:search"></span>
                              </CInputGroupText>
                              <CFormControl
                                onChange={(e) => setQueryText(e.target.value)}
                                size="md"
                                placeholder="Search"
                              />
                            </CInputGroup>
                          </CCol>
                          <CCol xs={3} style={{ display: 'inline-flex', marginRight: '1.5rem' }}>
                            <CFormText style={{ marginRight: '.5rem' }}>From:</CFormText>
                            <DatePicker
                              style
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                          </CCol>
                          <CCol xs={3} style={{ display: 'inline-flex', marginRight: '1rem' }}>
                            <CFormText style={{ marginRight: '.5rem' }}>To:</CFormText>
                            <DatePicker
                              style
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                            />
                          </CCol>
                          <CCol xs={2}>
                            <CInputGroup className="mb-3">
                              <CFormText style={{ marginRight: '1rem' }}>Per Page:</CFormText>
                              <CFormControl
                                type="text"
                                value={perPage}
                                onChange={(e) => setPerPage(e.target.value)}
                                size="md"
                                placeholder=""
                              />
                            </CInputGroup>
                          </CCol>
                        </CRow>
                      )}
                      {route.name === 'Jobs' && (
                        <CRow>
                          <CCol xs={3}>
                            <CInputGroup className="mb-3">
                              <CInputGroupText>
                                <span className="iconify" data-icon="cil:search"></span>
                              </CInputGroupText>
                              <CFormControl
                                onChange={(e) => {
                                  setQueryText(e.target.value)
                                  setgroupId('')
                                }}
                                size="md"
                                placeholder="Search"
                              />
                            </CInputGroup>
                          </CCol>
                          <CCol xs={2} style={{ display: 'inline-flex', marginRight: '1.5rem' }}>
                            <CFormText style={{ marginRight: '.5rem' }}>From:</CFormText>
                            <DatePicker
                              style
                              selected={startDate}
                              onChange={(date) => setStartDate(date)}
                            />
                          </CCol>
                          <CCol xs={2} style={{ display: 'inline-flex', marginRight: '1rem' }}>
                            <CFormText style={{ marginRight: '.5rem' }}>To:</CFormText>
                            <DatePicker
                              style
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                            />
                          </CCol>
                          <CCol xs={2} style={{ display: 'inline-flex' }}>
                            <CInputGroup className="mb-3">
                              <CFormText style={{ marginRight: '1rem' }}>Filter By:</CFormText>
                              <CFormSelect
                                onChange={(e) => {
                                  setgroupId(e.target.value)
                                }}
                                size="md"
                                aria-label="Filter By Group"
                              >
                                <option value="null">View All</option>
                                {groups.result &&
                                  groups.result.map((g, i) => (
                                    <option key={i} value={g.id}>
                                      {g.name}
                                    </option>
                                  ))}
                              </CFormSelect>
                            </CInputGroup>
                          </CCol>
                          <CCol xs={2}>
                            <CInputGroup className="mb-3">
                              <CFormText style={{ marginRight: '1rem' }}>Per Page:</CFormText>
                              <CFormControl
                                type="text"
                                value={perPage}
                                onChange={(e) => setPerPage(e.target.value)}
                                size="md"
                                placeholder=""
                              />
                            </CInputGroup>
                          </CCol>
                        </CRow>
                      )}
                      <route.component
                        startDate={startDate}
                        endDate={endDate}
                        pageSize={perPage}
                        query={querText}
                        group_id={groupId}
                        setquery={setQueryText}
                        {...props}
                      />
                    </>
                  )}
                />
              )
            )
          })}
          <Redirect from="/" to="/analytics" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
