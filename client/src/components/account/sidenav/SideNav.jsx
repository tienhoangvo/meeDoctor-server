import React from 'react'
import PropTypes from 'prop-types'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Typography from '@material-ui/core/Typography'
import { useTheme } from '@material-ui/core/styles'
import providerDashboardRoutes from '../../../config/providerDashboardRoutes'
import {
  Avatar,
  Button,
  SwipeableDrawer,
} from '@material-ui/core'
import {} from '@material-ui/icons'
import {
  Link,
  Redirect,
  useRouteMatch,
} from 'react-router-dom'

import useSideNavStyles from './useSideNavStyles'

import projectLogo from './../../../Logo.png'
function SideNav({
  mobileOpen,
  handleDrawerToggle,
  children,
  setMobileOpen,
}) {
  const iOS =
    process.browser &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const { url } = useRouteMatch()
  const classes = useSideNavStyles()
  const theme = useTheme()

  const drawer = (children) => (
    <>
      <Button
        fullWidth
        startIcon={
          <Avatar
            src={projectLogo}
            className={classes.logo}
          />
        }
        color="inherit"
        component={Link}
        size="large"
        to={`${url}/dashboard`}
        className={classes.toolbar}
      >
        meeDoctor
      </Button>
      <Divider />
      {children}
    </>
  )

  return (
    <nav
      className={classes.drawer}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          variant="temporary"
          anchor={
            theme.direction === 'rtl'
              ? 'right'
              : 'left'
          }
          open={mobileOpen}
          onOpen={() => setMobileOpen(true)}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer(children)}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer(children)}
        </SwipeableDrawer>
      </Hidden>
    </nav>
  )
}

SideNav.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default SideNav
