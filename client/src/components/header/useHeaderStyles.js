import {
  green,
  indigo,
} from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const useHeaderStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '2rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '1rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '.5rem',
    },
  },

  logo: {
    width: '5rem',
    height: '5rem',
    [theme.breakpoints.down('md')]: {
      width: '4rem',
      height: '4rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '3rem',
      height: '3rem',
    },
  },

  logoBtn: {
    fontSize: '1.43rem',
    letterSpacing: '2px',
    fontWeight: 400,
    opacity: 0.8,
    borderRadius: 0,

    [theme.breakpoints.down('md')]: {
      fontSize: '1.2rem',
      letterSpacing: '1px',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.1rem',
    },
  },

  tabsContainer: {
    marginLeft: 'auto',
  },

  tab: { textTransform: 'none' },

  btn: {
    marginLeft: '25px',
  },

  providerOpt: {
    color: theme.palette.getContrastText(
      green[600]
    ),
    backgroundColor: green[600],
  },
  patientOpt: {
    color: theme.palette.getContrastText(
      indigo[500]
    ),
    backgroundColor: indigo[500],
  },

  drawerIconContainer: {
    marginLeft: 'auto',
  },

  drawerIcon: {
    height: '2.2rem',
    width: '2.2rem',
  },

  drawer: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white,
  },

  ul: {
    padding: 0,
  },

  listItemIcon: {
    color: theme.palette.white,
  },
  listSectionHeader: {
    color: 'inherit',
    opacity: 0.5,
    fontSize: '.8rem',
  },
  listSectionDivider: {
    height: '2px',
    backgroundColor: `rgba(255, 255, 255, .2)`,
  },
}))

export default useHeaderStyles
