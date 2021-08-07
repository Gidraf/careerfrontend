import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ADMIN_SELECTED, DASHBOARD_SELECTED, REPORTS_SELECTED } from '../assets/constants'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CCreateNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const sidebarToggleReducer = useSelector((state) => state.sidebarToggleReducer)
  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      show={sidebarShow}
      onShow={() => console.log('show')}
      onHide={() => {
        dispatch({ type: 'set', sidebarShow: false })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" name="logo-negative" height={35} />
        <CIcon className="sidebar-brand-narrow" name="sygnet" height={35} />
      </CSidebarBrand>
      <CSidebarNav
        onClick={(event) => {
          if (event.target.childNodes[1])
            switch (event.target.childNodes[1].data) {
              case 'Dashboard':
                dispatch({ type: DASHBOARD_SELECTED })
                break
              case 'Admin':
                dispatch({ type: ADMIN_SELECTED })
                break
              case REPORTS_SELECTED:
                dispatch({ type: REPORTS_SELECTED })
                break
              default:
                dispatch({ type: DASHBOARD_SELECTED })
            }
        }}
      >
        <SimpleBar>
          <CCreateNavItem items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
