import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Toolbar,
  AppBar,
  Tab,
  Tabs,
  Button,
  Avatar,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  ListItemIcon,
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import ElevationScroll from '../pure/ElevationScroll'
import useHeaderStyles from './useHeaderStyles'
import projectLogo from '../../Logo.png'
import landingRoutes from '../../config/landingRoutes'

const Header = ({
  selectedTab,
  setOpenSignupOptions,
  matches,
}) => {
  const iOS =
    process.browser &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const classes = useHeaderStyles()
  const [openDrawer, setOpenDrawer] = useState(
    false
  )
  const handleClick = () => {
    setOpenSignupOptions(true)
  }
  const routes = landingRoutes

  const tabs = (
    <>
      <Tabs
        className={classes.tabsContainer}
        value={selectedTab}
      >
        {routes.map((route) => (
          <Tab
            key={route.name}
            label={route.name}
            value={route.path}
            icon={route.icon}
            className={classes.tab}
            component={Link}
            to={route.path}
          />
        ))}
      </Tabs>
      <Button
        variant="outlined"
        color="inherit"
        className={classes.btn}
        component={Link}
        to="/login"
      >
        Log In
      </Button>

      <Button
        variant="contained"
        className={classes.btn}
        onClick={handleClick}
      >
        Sign up for free
      </Button>
    </>
  )

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List>
          <li>
            <ul className={classes.ul}>
              <ListSubheader
                className={
                  classes.listSectionHeader
                }
              >
                Navigation
              </ListSubheader>
              {routes.map((route) => (
                <ListItem
                  key={route.name}
                  button
                  component={Link}
                  to={route.path}
                  onClick={() =>
                    setOpenDrawer(false)
                  }
                  color="primary"
                  selected={
                    selectedTab === route.path
                  }
                >
                  <ListItemIcon
                    classes={{
                      root: classes.listItemIcon,
                    }}
                  >
                    {route.icon}
                  </ListItemIcon>
                  <ListItemText>
                    {route.name}
                  </ListItemText>
                </ListItem>
              ))}
            </ul>
          </li>
          <Divider
            classes={{
              root: classes.listSectionDivider,
            }}
          />
          <li>
            <ul className={classes.ul}>
              <ListSubheader
                className={
                  classes.listSectionHeader
                }
              >
                Account
              </ListSubheader>
              <ListItem>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  component={Link}
                  to="/login"
                  onClick={() =>
                    setOpenDrawer(false)
                  }
                >
                  Log In
                </Button>
              </ListItem>

              <ListItem>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    setOpenDrawer(false)
                    handleClick()
                  }}
                >
                  Sign up for free
                </Button>
              </ListItem>
            </ul>
          </li>
        </List>
      </SwipeableDrawer>

      <IconButton
        disableRipple
        color="inherit"
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon
          className={classes.drawerIcon}
        />
      </IconButton>
    </>
  )

  return (
    <>
      <ElevationScroll>
        <AppBar color="secondary">
          <Toolbar>
            <Button
              startIcon={
                <Avatar
                  src={projectLogo}
                  className={classes.logo}
                />
              }
              color="inherit"
              component={Link}
              size="large"
              to="/"
              className={classes.logoBtn}
            >
              meeDoctor
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div
        className={classes.toolbarMargin}
      ></div>
    </>
  )
}

export default Header
