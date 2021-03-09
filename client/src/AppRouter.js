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
import { AuthProvider } from './context/AuthContext'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/room/:roomName">
          <Account />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <AuthProvider>
            <Login />
          </AuthProvider>
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default AppRouter
