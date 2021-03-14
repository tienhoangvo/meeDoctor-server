import React from 'react'

import Divider from '@material-ui/core/Divider'

import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import Typography from '@material-ui/core/Typography'

import providerDashboardRoutes from '../../../config/providerDashboardRoutes'
import {
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListSubheader,
} from '@material-ui/core'
import {
  ExitToApp as ExitToAppIcon,
  Extension as ExtensionIcon,
  VideoCallRounded as VideoCallRoundedIcon,
} from '@material-ui/icons'
import {
  Link,
  Redirect,
  useRouteMatch,
} from 'react-router-dom'
import SideNav from './SideNav'
import { useAuth } from '../../../context/AuthContext'

const ProviderSidenav = ({
  mobileOpen,
  handleDrawerToggle,
  selectedTab,
  setMobileOpen,
}) => {
  const { url } = useRouteMatch()
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

  const { currentUser, logout } = useAuth()

  const routes = providerDashboardRoutes

  if (!currentUser)
    return <Redirect to="/login" />
  return (
    <SideNav
      mobileOpen={mobileOpen}
      handleDrawerToggle={handleDrawerToggle}
      selectedTab={selectedTab}
      setMobileOpen={setMobileOpen}
    >
      <List
        subheader={
          <ListSubheader>
            Patient Queue
          </ListSubheader>
        }
      >
        {patients.map((patient) => (
          <ListItem
            button
            key={
              patient.name +
              Math.floor(Math.random() * 10)
            }
          >
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
                  variant="body1"
                  noWrap={true}
                >
                  {patient.name}
                </Typography>
              }
              secondary={
                <Typography
                  variant="subtitle2"
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
      <List>
        <ListItem
          button
          color="secondary"
          onClick={(event) => {
            logout()
            event.preventDefault()
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </SideNav>
  )
}

export default ProviderSidenav
