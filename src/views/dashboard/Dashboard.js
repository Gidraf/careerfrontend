import React, { lazy, useEffect, useState, useRef } from 'react'

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
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import { fetchGoldAnalytics } from 'src/actions/dashboard/analytics.action.js'

const WidgetsDropdown = lazy(() => import('../components/widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../components/widgets/WidgetsBrand.js'))

const Dashboard = ({ startDate, endDate }) => {
  const dispatch = useDispatch()
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const [isFetchingGold, setisFetchingGold] = useState(false)
  const goldAnalytics = useSelector((state) => state.goldReducer)
  console.log(goldAnalytics)
  useEffect(() => {
    dispatch(fetchGoldAnalytics(startDate, endDate, setisFetchingGold))
  }, [startDate, endDate])
  return (
    <>
      <WidgetsDropdown
        isFetchingGold={isFetchingGold}
        startDate={startDate}
        endDate={endDate}
        goldAnalytics={goldAnalytics}
      />
      <CCard className="mb-4">
        <CCardBody></CCardBody>
      </CCard>
    </>
  )
}
Dashboard.propTypes = {
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
}
export default Dashboard
