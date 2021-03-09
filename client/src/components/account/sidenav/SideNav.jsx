import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {
  makeStyles,
  useTheme,
} from '@material-ui/core/styles'
import providerDashboardRoutes from '../../../config/providerDashboardRoutes'
import {
  Avatar,
  Button,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListSubheader,
} from '@material-ui/core'
import {
  ExitToApp,
  Extension as ExtensionIcon,
  VideoCallRounded as VideoCallRoundedIcon,
} from '@material-ui/icons'
import {
  Link,
  useRouteMatch,
} from 'react-router-dom'

import useSideNavStyles from './useSideNavStyles'

function ResponsiveDrawer({
  mobileOpen,
  handleDrawerToggle,
  selectedTab,
}) {
  const { url } = useRouteMatch()
  const classes = useSideNavStyles()
  const theme = useTheme()

  const patients = [
    {
      name: 'Klaus Mickaelson',
      image: '',
      time: '4m',
    },
    {
      name: 'Klaus Mickaelson',
      image: '',
      time: '4m',
    },
    {
      name: 'Klaus Mickaelson',
      image: '',
      time: '4m',
    },
    {
      name: 'Klaus Mickaelson',
      image: '',
      time: '4m',
    },
  ]

  const routes = providerDashboardRoutes

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List
        subheader={
          <ListSubheader>
            Patient Queue
          </ListSubheader>
        }
      >
        {patients.map((patient) => (
          <ListItem button key={patient.name}>
            <ListItemAvatar>
              <Avatar
                src={patient.image}
                alt={patient.name}
              />
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  variant="body2"
                  noWrap={true}
                >
                  {patient.name}
                </Typography>
              }
              secondary={
                <Typography
                  variant="subtitle"
                  noWrap={true}
                >
                  {`waiting ${patient.time}`}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton color="secondary">
                <VideoCallRoundedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader>Account</ListSubheader>
        }
      >
        {routes.map((route) => (
          <ListItem
            button
            key={route.name}
            component={Link}
            to={`${url}${route.path}`}
            selected={selectedTab === route.path}
          >
            <ListItemIcon>
              {route.icon}
            </ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          to={`${url}/subscription`}
        >
          <ListItemIcon>
            <ExtensionIcon />
          </ListItemIcon>
          <ListItemText primary="Upgrade" />
        </ListItem>
      </List>
      <Divider />
      <Button
        fullWidth
        variant="outlined"
        endIcon={<ExitToApp />}
      >
        Log Out
      </Button>
    </div>
  )

  return (
    <nav
      className={classes.drawer}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={
            theme.direction === 'rtl'
              ? 'right'
              : 'left'
          }
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default ResponsiveDrawer
