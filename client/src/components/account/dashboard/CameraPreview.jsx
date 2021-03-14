import { IconButton } from '@material-ui/core'
import {
  MoreHoriz as MoreIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  VideocamOff as VideocamOffIcon,
} from '@material-ui/icons'

import React, {
  useState,
  useRef,
  useEffect,
} from 'react'

import useToggle from '../../../hooks/useToggle'
import MenuSettings from './MenuSettings'
import useDashboardStyles from './useDashboardStyles'
const CameraPreview = () => {
  const [width, setWidth] = useState(293)
  const [height, setHeight] = useState(0)
  const [streaming, setStreaming] = useState(
    false
  )
  const [
    microphoneIsOn,
    toggleMicrophone,
  ] = useToggle(true)
  const [cameraIsOn, toggleCamera] = useToggle(
    true
  )
  const [anchorEl, setAnchorEl] = useState(null)
  const [stream, setStream] = useState(null)
  const [
    cameraDevice,
    setCameraDevice,
  ] = useState()
  const [
    microphoneDevice,
    setMicrophoneDevice,
  ] = useState()
  const [
    speakerDevice,
    setSpeakerDevice,
  ] = useState('default')
  const videoRef = useRef(null)
  const canvasRef = useRef('canvas')
  const photoRef = useRef(null)
  const classes = useDashboardStyles()

  const clearPhoto = () => {
    const context = canvasRef.current.getContext(
      '2d'
    )
    context.fieldStyle = '#AAA'
    context.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    )
    const data = canvasRef.current.toDataURL(
      'image/png'
    )
    photoRef.current.setAttribute('src', data)
  }

  const takePicture = () => {
    console.log('Taking picture')
    const context = canvasRef.current.getContext(
      '2d'
    )
    if (width && height) {
      canvasRef.current.width = width
      canvasRef.current.height = height
      context.drawImage(
        videoRef.current,
        0,
        0,
        width,
        height
      )
      const data = canvasRef.current.toDataURL(
        'image/png'
      )
      photoRef.current.setAttribute('src', data)
    } else {
      clearPhoto()
    }
  }

  const handleMediaSettingsClick = (event) => {
    setAnchorEl(event.currentTarget)
    event.preventDefault()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick = (event) => {
    takePicture()

    event.preventDefault()
  }

  useEffect(async () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop()
      })
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        {
          video: {
            deviceId: cameraDevice
              ? { exact: cameraDevice }
              : undefined,
          },
          audio: {
            deviceId: microphoneDevice
              ? { exact: microphoneDevice }
              : undefined,
          },
        }
      )
      setStream(stream)
    } catch (err) {
      console.log('ERROR WHEN LOAD CAMERA ', err)
    }
  }, [cameraDevice, microphoneDevice])

  useEffect(() => {
    videoRef.current.srcObject = stream
    videoRef.current.play()
    videoRef.current.addEventListener(
      'canplay',
      (event) => {
        if (!streaming) {
          setHeight(
            videoRef.current.videoHeight /
              (videoRef.current.videoWidth /
                width)
          )
        }
      },
      false
    )

    clearPhoto()
  }, [stream])

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current
      .setSinkId(speakerDevice)
      .then(() => {
        console.log(
          'Success, audio device attached: ',
          speakerDevice
        )
      })
  }, [videoRef.current, speakerDevice])

  useEffect(() => {
    videoRef.current.setAttribute('width', width)
    videoRef.current.setAttribute(
      'height',
      height
    )
    canvasRef.current.setAttribute('width', width)
    canvasRef.current.setAttribute(
      'height',
      height
    )

    setStreaming(true)
  }, [height])

  useEffect(() => {
    if (streaming && width && height) {
      takePicture()
    }
  }, [streaming, width, height])

  useEffect(() => {
    if (!stream) return

    const audioStreamTracks = stream.getAudioTracks()

    console.log(
      'Audio Stream Tracks',
      audioStreamTracks
    )
    for (const audioStreamTrack of audioStreamTracks) {
      setMicrophoneDevice(
        audioStreamTrack.getSettings().deviceId
      )

      audioStreamTrack.enabled = microphoneIsOn
    }

    console.log(
      'Audio Stream Tracks',
      audioStreamTracks
    )
  }, [stream, microphoneIsOn])

  useEffect(() => {
    if (!stream) return

    const videoStreamTracks = stream.getVideoTracks()

    for (const videoStreamTrack of videoStreamTracks) {
      setCameraDevice(
        videoStreamTrack.getSettings().deviceId
      )
      videoStreamTrack.enabled = cameraIsOn
    }

    console.log(
      'video Stream Tracks',
      videoStreamTracks
    )
  }, [stream, cameraIsOn])

  console.log({ cameraDevice, microphoneDevice })
  return (
    <>
      <MenuSettings
        id="media-controls-menu-settings"
        anchorEl={anchorEl}
        handleClose={handleClose}
        toggleCamera={toggleCamera}
        toggleMicrophone={toggleMicrophone}
        microphoneIsOn={microphoneIsOn}
        camera={cameraDevice}
        microphone={microphoneDevice}
        speaker={speakerDevice}
        setMicrophone={setMicrophoneDevice}
        setSpeaker={setSpeakerDevice}
        setCamera={setCameraDevice}
        cameraIsOn={cameraIsOn}
      />
      <div className={classes.camera}>
        <div className={classes.cameraButtons}>
          <IconButton
            className={classes.cameraButton}
            aria-controls="media-controls-menu-settings"
            aria-haspopup="true"
            onClick={handleMediaSettingsClick}
          >
            <MoreIcon />
          </IconButton>
          <div className={classes.mediaButtons}>
            {!cameraIsOn && (
              <IconButton
                className={classes.cameraButton}
                onClick={toggleCamera}
              >
                <VideocamOffIcon color="error" />
              </IconButton>
            )}
            <IconButton
              className={classes.cameraButton}
              onClick={toggleMicrophone}
            >
              {microphoneIsOn ? (
                <MicIcon color="inherit" />
              ) : (
                <MicOffIcon color="error" />
              )}
            </IconButton>
          </div>
        </div>

        <video ref={videoRef} muted>
          Video stream not avalable
        </video>
      </div>
      <canvas ref={canvasRef}></canvas>
      <div className="output">
        <img
          ref={photoRef}
          alt="The screen capture will appear in this box."
        />
      </div>
    </>
  )
}

export default CameraPreview
