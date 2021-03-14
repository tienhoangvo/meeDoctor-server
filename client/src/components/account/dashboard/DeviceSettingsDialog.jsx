import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core'
import {
  Mic as MicIcon,
  Close as CloseIcon,
  CameraAlt as CameraAltIcon,
  VolumeUp as VolumeUpIcon,
} from '@material-ui/icons'
import { useState, useEffect } from 'react'

const DeviceSettingsDialog = ({
  handleCloseDialog,
  openDialog,
  setCamera,
  setSpeaker,
  setMicrophone,
  camera,
  microphone,
  speaker,
}) => {
  const theme = useTheme()

  const [cameras, setCameras] = useState()
  const [microphones, setMirophones] = useState()
  const [speakers, setSpeakers] = useState()
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        let cameraDevices = []
        let microphoneDevices = []
        let speakerDevices = []
        for (const device of devices) {
          switch (device.kind) {
            case 'videoinput': {
              cameraDevices.push(device)
              break
            }
            case 'audioinput': {
              microphoneDevices.push(device)
              break
            }
            case 'audiooutput': {
              speakerDevices.push(device)
              break
            }
            default: {
              throw new Error(
                'Not supported that kind of device'
              )
            }
          }
        }

        setCameras(cameraDevices)
        setMirophones(microphoneDevices)
        setSpeakers(speakerDevices)
      })
      .catch(function (err) {
        console.log(err.name + ': ' + err.message)
      })
  }, [])

  return (
    <Dialog
      onClose={handleCloseDialog}
      aria-labelledby="device-settings-dialog"
      open={openDialog}
    >
      <DialogTitle
        id="device-settings-dialog"
        disableTypography
        style={{
          margin: 0,
          padding: theme.spacing(2),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">
          Device Settings
        </Typography>
        <IconButton
          aria-label="close"
          style={{
            color: theme.palette.grey[500],
          }}
          onClick={handleCloseDialog}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent
        style={{
          padding: theme.spacing(2),
        }}
      >
        {!speakers || !microphones || !cameras ? (
          <LinearProgress />
        ) : (
          <>
            <TextField
              margin="normal"
              fullWidth
              select
              label="Camera"
              value={camera}
              onChange={(event) =>
                setCamera(event.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CameraAltIcon />
                  </InputAdornment>
                ),
              }}
            >
              {cameras.map(
                ({
                  groupId,
                  deviceId,
                  label,
                }) => (
                  <MenuItem
                    key={deviceId}
                    value={deviceId}
                    selected={deviceId === camera}
                  >
                    {label}
                  </MenuItem>
                )
              )}
            </TextField>
            <TextField
              margin="normal"
              fullWidth
              select
              label="Microphone"
              value={microphone}
              onChange={(event) =>
                setMicrophone(event.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MicIcon />
                  </InputAdornment>
                ),
              }}
            >
              {microphones.map(
                ({
                  groupId,
                  deviceId,
                  label,
                }) => (
                  <MenuItem
                    key={deviceId}
                    value={deviceId}
                    selected={
                      deviceId === microphone
                    }
                  >
                    {label}
                  </MenuItem>
                )
              )}
            </TextField>
            <TextField
              margin="normal"
              fullWidth
              select
              label="Speaker"
              value={speaker}
              onChange={(event) =>
                setSpeaker(event.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VolumeUpIcon />
                  </InputAdornment>
                ),
              }}
            >
              {speakers.map(
                ({
                  groupId,
                  deviceId,
                  label,
                }) => (
                  <MenuItem
                    key={deviceId}
                    value={deviceId}
                    selected={
                      deviceId === speaker
                    }
                  >
                    {label}
                  </MenuItem>
                )
              )}
            </TextField>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default DeviceSettingsDialog
