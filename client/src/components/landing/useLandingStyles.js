import {
  green,
  indigo,
} from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

const useLandingStyles = makeStyles((theme) => ({
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
}))

export default useLandingStyles
