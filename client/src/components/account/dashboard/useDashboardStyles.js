import { makeStyles } from '@material-ui/core'

const useDashboardStyles = makeStyles(
  (theme) => ({
    container: {
      padding: theme.spacing(2),
    },
    copyBtn: {
      width: theme.spacing(10),
    },
    camera: {
      position: 'fixed',
      right: theme.spacing(3),
    },

    cameraButtons: {
      display: 'flex',
      position: 'absolute',
      zIndex: '20',
      width: '100%',
      justifyContent: 'space-between',
    },

    cameraButton: {
      color: theme.palette.white,
      backgroundColor: theme.palette.error,
    },
  })
)

export default useDashboardStyles
