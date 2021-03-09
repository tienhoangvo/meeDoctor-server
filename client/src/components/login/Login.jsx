import React, { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import useLoginStyles from './useLoginStyles'
import projectLogo from './../../Logo.png'
import {
  LinearProgress,
  Paper,
} from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import loginValidationSchema from './loginValidationSchema'
import { useAuth } from '../../context/AuthContext'

const Login = () => {
  const classes = useLoginStyles()
  const {
    register,
    handleSubmit,
    formState,
    setError,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(loginValidationSchema),
  })
  const emailErrorMsg =
    formState.errors.email?.message
  const passwordErrorMsg =
    formState.errors.password?.message

  const [loading, setLoading] = useState(false)

  const formSubmitDisabled =
    !formState.isValid || loading
  const {
    currentUser,
    login,
    cancelRequest,
  } = useAuth()

  const onSubmit = (data) => {
    setLoading(true)
    login(data)
      .catch((error) => {
        if (
          error.response.data.status === 'fail'
        ) {
          ;['email', 'password'].forEach(
            (field) =>
              setError(field, {
                type: 'manual',
                message:
                  error.response.data.message,
              })
          )
        }
      })
      .then(() => setLoading(false))
  }
  useEffect(() => {
    return () => {
      cancelRequest('Cancel login request')
    }
  }, [])
  if (currentUser)
    return <Redirect to="/account/dashboard" />

  return (
    <Container
      component="main"
      maxWidth="xs"
      className={classes.mainContainer}
    >
      <Paper
        variant="outlined"
        className={classes.paper}
      >
        {loading && (
          <LinearProgress
            className={classes.loader}
          />
        )}

        <Button
          startIcon={<ArrowBackIcon />}
          fullWidth
          color="secondary"
          component={Link}
          to="/"
        >
          Back to meeDoctor
        </Button>
        <Avatar
          className={classes.avatar}
          src={projectLogo}
        ></Avatar>
        <Typography
          component="h1"
          variant="h5"
          className={classes.title}
        >
          Log in as Provider
        </Typography>
        <form
          noValidate
          className={classes.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={Boolean(emailErrorMsg)}
                helperText={emailErrorMsg || ''}
                disabled={loading}
                variant="filled"
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={Boolean(passwordErrorMsg)}
                helperText={
                  passwordErrorMsg || ''
                }
                disabled={loading}
                variant="filled"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                type="submit"
                color="primary"
                component={Link}
                to="/forgot-password"
              >
                Forgot password?
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              className={classes.right}
            >
              <Button
                disabled={formSubmitDisabled}
                type="submit"
                color="primary"
                variant="contained"
              >
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>

        <Box mt={8}>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
          >
            {`Don't have an account? `}
            <Link color="inherit" to="/signup">
              Sign up{' '}
            </Link>
          </Typography>
        </Box>
      </Paper>
      <CssBaseline />
    </Container>
  )
}

export default Login
