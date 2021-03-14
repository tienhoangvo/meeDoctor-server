import { makeStyles } from '@material-ui/core/styles'

import { drawerWidth } from '../constants'

const useSideNavStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}))

export default useSideNavStyles
