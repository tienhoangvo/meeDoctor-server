import { makeStyles } from '@material-ui/core'

const useProviderRoomStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'flex',
    },

    toolbar: theme.mixins.toolbar,

    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      position: 'relative',
    },
  })
)
export default useProviderRoomStyles
