import {
  Button,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { ArrowDownward } from '@material-ui/icons'
import React, { useState, useRef } from 'react'
import { useAuth } from '../../../context/AuthContext'

const Dashboard = () => {
  const { currentUser } = useAuth()
  const { origin } = window.location
  const [copySuccess, setCopySuccess] = useState(
    'Copy'
  )
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
      <Paper>
        <Typography variant="h1">
          {' '}
          Welcome,{' '}
          {currentUser && currentUser.displayName}
        </Typography>
        <Typography variant="subtitle1">
          To invite someone to your waiting room,
          share this link
        </Typography>
        <TextField
          size="small"
          variant="outlined"
          inputRef={textAreaRef}
          defaultValue={`${origin}/room/${
            currentUser && currentUser.roomName
          }`}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={copyToClipBoard}
        >
          {copySuccess}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          endIcon={<ArrowDownward />}
        >
          Invite via
        </Button>
      </Paper>
    </>
  )
}

export default Dashboard
