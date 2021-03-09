import React, { useState, useEffect } from 'react'

import SideNav from '../sidenav/SideNav'
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import Settings from '../Settings'
import MeetingHistory from '../MeetingHistory'
import Subscription from '../Subscription'
import Analytics from '../Analytics'
import { CssBaseline } from '@material-ui/core'
import DashBoardHeader from '../appbar/DashBoardHeader'
import useAccountStyles from './useAccountStyles'
import providerDashboardRoutes from '../../../config/providerDashboardRoutes'

const Account = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const routes = providerDashboardRoutes
  const [
    mobileOpen,
    setMobileOpen,
  ] = React.useState(false)
  const [selectedTab, setSelectedTab] = useState(
    '/account'
  )
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const classes = useAccountStyles()
  useEffect(() => {
    if (pathname === '/account')
      return setSelectedTab('/account/dashboard')
    if (selectedTab.startsWith(pathname)) return
    const currentPathname = `/${
      pathname.split('/')[2]
    }`
    console.log({ currentPathname })
    routes.some(
      ({ path }) => currentPathname === path
    ) && setSelectedTab(currentPathname)
  }, [pathname])
  console.log({ pathname, selectedTab, path })
  return (
    <div className={classes.root}>
      <CssBaseline />
      <DashBoardHeader
        handleDrawerToggle={handleDrawerToggle}
      />
      <SideNav
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        selectedTab={selectedTab}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={`${path}/`}>
            <Redirect to={`${path}/dashboard`} />
          </Route>
          <Route path={`${path}/dashboard`}>
            <Dashboard />
          </Route>
          <Route path={`${path}/settings`}>
            <Settings />
          </Route>
          <Route path={`${path}/meeting-history`}>
            <MeetingHistory />
          </Route>
          <Route path={`${path}/subscription`}>
            <Subscription />
          </Route>
          <Route path={`${path}/analytics`}>
            <Analytics />
          </Route>
        </Switch>
      </main>
    </div>
  )
}

export default Account
