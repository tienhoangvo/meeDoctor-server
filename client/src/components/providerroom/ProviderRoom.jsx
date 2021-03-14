import React from 'react'

import { CssBaseline } from '@material-ui/core'
import DashBoardHeader from '../account/appbar/DashBoardHeader'
import useProviderRoomStyles from './useProviderRoomStyles'
import PatientSidenav from '../account/sidenav/PatientSidenav'
import CameraPreview from '../account/dashboard/CameraPreview'

const ProviderRoom = () => {
  const [
    mobileOpen,
    setMobileOpen,
  ] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const classes = useProviderRoomStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DashBoardHeader
        handleDrawerToggle={handleDrawerToggle}
      />
      <PatientSidenav
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <CameraPreview />
      </main>
    </div>
  )
}

export default ProviderRoom
