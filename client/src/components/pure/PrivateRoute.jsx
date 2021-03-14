import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
