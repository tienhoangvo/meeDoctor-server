import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import {
  ArrowDownward,
  MeetingRoom as MeetingRoomIcon,
} from '@material-ui/icons'

import React, { useState, useRef } from 'react'
import { useAuth } from '../../../context/AuthContext'
import CameraPreview from './CameraPreview'

import useDashboardStyles from './useDashboardStyles'

const Dashboard = () => {
  const { currentUser } = useAuth()
  const { origin } = window.location
  const [copySuccess, setCopySuccess] = useState(
    'Copy'
  )

  const classes = useDashboardStyles()
  const textAreaRef = useRef(null)
  const copyToClipBoard = (e) => {
    textAreaRef.current.select()
    document.execCommand('copy')
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus()
    setCopySuccess('Copied!')
    setTimeout(() => setCopySuccess('Copy'), 500)
  }

  return (
    <>
      <CameraPreview />
      <Paper className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1">
              {' '}
              Welcome,{' '}
              {currentUser &&
                currentUser.displayName}
            </Typography>
            <Typography variant="subtitle1">
              To invite someone to your waiting
              room, share this link
            </Typography>
          </Grid>

          <Grid item xs={4}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  label="Room Url"
                  fullWidth
                  size="medium"
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <MeetingRoomIcon />
                      </InputAdornment>
                    ),
                  }}
                  inputRef={textAreaRef}
                  defaultValue={`${origin}/room/${
                    currentUser &&
                    currentUser.roomName
                  }`}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  justify="flex-end"
                  spacing={1}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={copyToClipBoard}
                      className={classes.copyBtn}
                    >
                      {copySuccess}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                      endIcon={<ArrowDownward />}
                    >
                      Invite via
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Dashboard
