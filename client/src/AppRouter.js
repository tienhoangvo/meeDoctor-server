import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Account from './components/account/account/Account'
import Landing from './components/landing/Landing'
import PrivateRoute from './components/pure/PrivateRoute'
import ProviderRoom from './components/providerroom/ProviderRoom'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/account">
          <Account />
        </PrivateRoute>
        <Route path="/room/:roomName">
          <ProviderRoom />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
