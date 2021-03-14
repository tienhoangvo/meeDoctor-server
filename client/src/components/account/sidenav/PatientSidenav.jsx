import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Typography from '@material-ui/core/Typography'

import {
  Avatar,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListSubheader,
} from '@material-ui/core'
import { VideoCallRounded as VideoCallRoundedIcon } from '@material-ui/icons'

import SideNav from './SideNav'

const ProviderSidenav = ({
  mobileOpen,
  handleDrawerToggle,
  selectedTab,
  setMobileOpen,
}) => {
  return (
    <SideNav
      mobileOpen={mobileOpen}
      handleDrawerToggle={handleDrawerToggle}
      selectedTab={selectedTab}
      setMobileOpen={setMobileOpen}
    >
      <List
        subheader={
          <ListSubheader>Available</ListSubheader>
        }
      >
        <ListItem button>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            disableTypography
            primary={
              <Typography
                variant="body1"
                noWrap={true}
              >
                Dr Klause
              </Typography>
            }
            secondary={
              <Typography
                variant="subtitle2"
                noWrap={true}
              >
                available
              </Typography>
            }
          />
          <ListItemSecondaryAction>
            <IconButton color="secondary">
              <VideoCallRoundedIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </SideNav>
  )
}

export default ProviderSidenav
