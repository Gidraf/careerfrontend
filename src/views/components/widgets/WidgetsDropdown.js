import React from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CSpinner,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetDropdown,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'
import moment from 'moment'
const colors = [
  '#880e4f',
  '#b71c1c',
  '#4a148c',
  '#311b92',
  '#1a237e',
  '#0d47a1',
  '#006064',
  '#1b5e20',
  '#f57f17',
  '#bf360c',
]
const WidgetsDropdown = ({
  goldAnalytics,
  silverAnalytics,
  bronzeAnalytics,
  normalAnalytics,
  startDate,
  endDate,
  isFetchingGold,
  isFetchingSilver,
  isFetchingBronze,
  isFetchingNormal,
}) => {
  const goldDataSets = Object.entries(goldAnalytics.result).map((item, i) => i * 1000 - i)
  console.log(goldDataSets)
  return (
    <CRow>
      {Object.keys(goldAnalytics.result).map((item, i) => (
        <CCol key={i} sm="6" lg="3">
          <CWidgetDropdown
            className="mb-4"
            style={{
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            }}
            color="#fff"
            value={goldAnalytics.result[item].total}
            change={
              <>
                <small>Total</small>
              </>
            }
            title={item}
            // action={
            //   <CDropdown alignment="end">
            //     <CDropdownToggle color="transparent" caret={false} className="p-0">
            //       <CIcon name="cil-options" className="text-high-emphasis-inverse" />
            //     </CDropdownToggle>
            //     <CDropdownMenu>
            //       <CDropdownItem>Action</CDropdownItem>
            //       <CDropdownItem>Another action</CDropdownItem>
            //       <CDropdownItem>Something else here...</CDropdownItem>
            //       <CDropdownItem disabled>Disabled action</CDropdownItem>
            //     </CDropdownMenu>
            //   </CDropdown>
            // }
            chart={
              <>
                {isFetchingGold && <CSpinner size="md" />}
                <CChartLine
                  className="mt-3 mx-3"
                  style={{ height: '100px' }}
                  data={{
                    labels: goldAnalytics.result[item][item].map((val, i) =>
                      moment(val.title, 'DD-MM-YYYY').format('ll'),
                    ),
                    datasets: [
                      {
                        label: `${item} created`,
                        backgroundColor: 'transparent',
                        borderColor: 'rgb(255,215,255)',
                        pointBackgroundColor: getStyle('--cui-primary'),
                        data: goldAnalytics.result[item][item].map((val, i) => val.value),
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          drawBorder: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                      y: {
                        min: Math.min(
                          ...goldAnalytics.result[item][item].map((val, i) => val.value),
                        ),
                        max: Math.max(
                          ...goldAnalytics.result[item][item].map((val, i) => val.value),
                        ),
                        display: false,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                    elements: {
                      line: {
                        borderWidth: 1,
                        tension: 0.4,
                      },
                      point: {
                        radius: 4,
                        hitRadius: 10,
                        hoverRadius: 4,
                      },
                    },
                  }}
                />
              </>
            }
          />
        </CCol>
      ))}
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  goldAnalytics: PropTypes.array.isRequired,
  silverAnalytics: PropTypes.array.isRequired,
  bronzeAnalytics: PropTypes.array.isRequired,
  normalAnalytics: PropTypes.array.isRequired,
  isFetchingGold: PropTypes.bool.isRequired,
  isFetchingSilver: PropTypes.bool.isRequired,
  isFetchingBronze: PropTypes.bool.isRequired,
  isFetchingNormal: PropTypes.bool.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
}

export default WidgetsDropdown
