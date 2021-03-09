import React, { useEffect, useState } from 'react'
import Header from '../header/Header'
import {
  Redirect,
  Route,
  useLocation,
} from 'react-router-dom'
import Patients from '../Patients'
import Providers from '../Providers'
import Pricing from '../Pricing'
import Footer from '../footer/Footer'

import Home from '../home/Home'
import SignupOptionsDialog from './SignupOptionsDialog'
import {
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import landingRoutes from '../../config/landingRoutes'
import useLandingStyles from './useLandingStyles'
const Landing = () => {
  const classes = useLandingStyles()
  const { pathname } = useLocation()
  const [selectedTab, setSelectedTab] = useState(
    '/'
  )
  const [
    openSignupOptions,
    setOpenSignupOptions,
  ] = useState(false)

  const theme = useTheme()
  const matches = useMediaQuery(
    theme.breakpoints.down('md')
  )
  const routes = landingRoutes

  const handleClose = () => {
    setOpenSignupOptions(false)
  }

  useEffect(() => {
    if (pathname === '/')
      return setSelectedTab('/')
    if (selectedTab.startsWith(pathname)) return
    const currentPathname = `/${
      pathname.split('/')[1]
    }`
    routes.some(
      ({ path }) => currentPathname === path
    ) && setSelectedTab(currentPathname)
  }, [pathname])
  return (
    <>
      <Header
        selectedTab={selectedTab}
        matches={matches}
        setOpenSignupOptions={
          setOpenSignupOptions
        }
      />
      <SignupOptionsDialog
        open={openSignupOptions}
        onClose={handleClose}
        classes={classes}
        matches={matches}
      />
      <Route path="/home">
        <Redirect to="/" />
      </Route>
      <Route path="/patients">
        <Patients />
      </Route>
      <Route path="/providers">
        <Providers />
      </Route>
      <Route exact path="/pricing">
        <Pricing />
      </Route>
      <Route exact path="/">
        <Home
          setOpenSignupOptions={
            setOpenSignupOptions
          }
        />
      </Route>
      <Footer selectedTab={selectedTab} />
    </>
  )
}

export default Landing
