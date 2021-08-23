import React, { Component } from 'react'
import { HashRouter, Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import './scss/style.scss'
import { useCookies } from 'react-cookie'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  // const [cookies, setCookie] = useCookies(['AUTH'])
  const cookies = localStorage.getItem('AUTH')
  console.log(cookies)
  return (
    <Router>
      <React.Suspense fallback={loading}>
        <Switch>
          {!cookies && (
            <Route path="/" name="Login Page" render={(props) => <Login {...props} />} />
          )}
          {cookies && (
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          )}
          {/* <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          /> */}
          <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} />
        </Switch>
      </React.Suspense>
    </Router>
  )
}

export default App
