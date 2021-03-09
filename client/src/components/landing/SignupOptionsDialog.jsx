import {
  AppBar,
  Avatar,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
} from '@material-ui/core'
import {
  AccountBox as AccountBoxIcon,
  Close as CloseIcon,
  LocalHospital as LocalHospitalIcon,
} from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'

const SignupOptionsDialog = ({
  onClose,
  open,
  classes,
  matches = false,
}) => {
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      fullScreen={matches}
      onClose={handleClose}
      aria-labelledby="signup-options-dialog-title"
      open={open}
      keepMounted
    >
      <AppBar
        color="secondary"
        position="relative"
        elevation={3}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <DialogTitle id="signup-options-dialog-title">
            Who are you?
          </DialogTitle>
        </Toolbar>
      </AppBar>

      <List>
        <ListItem
          divider
          button
          onClick={handleClose}
          component={Link}
          to="/signup"
        >
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              className={classes.providerOpt}
            >
              <LocalHospitalIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="I'm a Provider"
            secondary="Start praticing telemedicine now"
          />
        </ListItem>

        <ListItem
          button
          onClick={handleClose}
          component={Link}
          to="/checkin"
        >
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              className={classes.patientOpt}
            >
              <AccountBoxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="I'm a Patient"
            secondary="Go to Check In page."
          />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default SignupOptionsDialog
