import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
} from '@material-ui/core'
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Settings as SettingsIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
} from '@material-ui/icons'

import { useState } from 'react'
import DeviceSettingsDialog from './DeviceSettingsDialog'

const MenuSettings = ({
  anchorEl,
  handleClose,
  microphoneIsOn,
  cameraIsOn,
  toggleCamera,
  toggleMicrophone,
  setCamera,
  setSpeaker,
  setMicrophone,
  camera,
  microphone,
  speaker,
}) => {
  const [
    openDeviceSettingsDialog,
    setOpenDeviceSettingsDialog,
  ] = useState(false)
  return (
    <>
      {' '}
      <Menu
        id="simple-menu"
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        color="primary"
      >
        <ListItem
          button
          onClick={() => {
            setOpenDeviceSettingsDialog(true)
            handleClose()
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Device Settings" />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={() => {
            toggleMicrophone()
            handleClose()
          }}
        >
          <ListItemIcon>
            {microphoneIsOn ? (
              <MicIcon />
            ) : (
              <MicOffIcon />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              microphoneIsOn
                ? 'Mute myself'
                : 'Unmute myself'
            }
          />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            toggleCamera()
            handleClose()
          }}
        >
          <ListItemIcon>
            {cameraIsOn ? (
              <VideocamIcon />
            ) : (
              <VideocamOffIcon />
            )}
          </ListItemIcon>
          <ListItemText
            primary={
              cameraIsOn
                ? 'Turn of camera'
                : 'Turn on camera'
            }
          />
        </ListItem>
      </Menu>
      <DeviceSettingsDialog
        handleCloseDialog={() =>
          setOpenDeviceSettingsDialog(false)
        }
        openDialog={openDeviceSettingsDialog}
        setCamera={setCamera}
        setSpeaker={setSpeaker}
        setMicrophone={setMicrophone}
        camera={camera}
        microphone={microphone}
        speaker={speaker}
      />
    </>
  )
}

export default MenuSettings
