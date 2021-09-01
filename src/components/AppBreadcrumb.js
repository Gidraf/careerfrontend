import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem, CButton } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname
  const history = useHistory()

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute.name
  }

  const handleClick = (name) => {
    history.push(`/add_${name}`.toLowerCase())
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const name = getRouteName(currentPathname, routes)
      let canShow = false
      if (name === `Users` || name === 'Workgroups' || name === 'Roles' || 'Services') {
        canShow = true
      }
      if (name === `Requests` || name === 'Jobs') {
        canShow = false
      }
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes),
        active: index + 1 === array.length ? true : false,
        canShow: canShow,
      })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <>
      <CBreadcrumb className="m-0 ms-2">
        <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <CBreadcrumbItem
              {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
              key={index}
            >
              {breadcrumb.name}
            </CBreadcrumbItem>
          )
        })}
      </CBreadcrumb>
      {console.log(breadcrumbs)}
      {breadcrumbs[0].canShow && (
        <CBreadcrumb className="m-0 ms-2">
          <CButton onClick={() => handleClick(breadcrumbs[0].name)}>
            Add {`${breadcrumbs[0].name}`}
          </CButton>
        </CBreadcrumb>
      )}
    </>
  )
}

export default React.memo(AppBreadcrumb)
