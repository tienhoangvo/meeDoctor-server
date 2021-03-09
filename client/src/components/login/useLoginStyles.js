import { makeStyles } from '@material-ui/core/styles'

const useLoginStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  loader: {
    width: '100%',
    position: 'absolute',
    top: '0',
    borderRadius: '25px',
  },
  avatar: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  right: {
    textAlign: 'right',
  },
  errorMessage: {
    '&:first-letter': {
      textTransform: 'capitalize',
    },
  },
}))

export default useLoginStyles
