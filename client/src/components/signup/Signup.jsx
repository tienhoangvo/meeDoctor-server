import React, { useState, useEffect } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
  Paper,
  FormControl,
  FormHelperText,
  LinearProgress,
} from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { Link, Redirect } from 'react-router-dom'
import projectLogo from './../../Logo.png'
import useSignupStyles from './useSignupStyles'
import {
  Controller,
  useForm,
} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import signupValidationSchema from './signupValidationSchema'
import { useAuth } from '../../context/AuthContext'
import ReactHookFormSelect from '../pure/ReactHookFormSelect'
export default function SignUp() {
  const classes = useSignupStyles()
  const {
    register,
    handleSubmit,
    formState,
    setError,
    control,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(signupValidationSchema),
  })
  const [loading, setLoading] = useState(false)
  const {
    currentUser,
    signup,
    cancelRequest,
  } = useAuth()
  const formSubmitDisabled =
    !formState.isValid || loading

  const { errors } = formState

  const getErrorMessage = (fieldName) => {
    return errors[fieldName]?.message || ''
  }
  console.log('invalid', !formState.isValid)
  console.log({ formSubmitDisabled })
  console.dir(formState)

  console.log(errors)
  const onSubmit = (data) => {
    console.log(data)
    setLoading(true)
    signup(data)
      .catch((error) => {
        if (
          error.response.data.status === 'fail'
        ) {
          console.log(error.response.data)
          const { data } = error.response.data

          for (const err of data) {
            setError(err.fieldName, {
              type: 'manual',
              message: err.message,
            })
          }
        }
      })
      .then(() => setLoading(false))
  }
  useEffect(() => {
    return () => {
      cancelRequest('Cancel signup request')
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
      <CssBaseline />
      <Paper className={classes.paper}>
        {loading && (
          <LinearProgress
            className={classes.loader}
          />
        )}
        <Button
          startIcon={<ArrowBack />}
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
          Create meeDoctor Account
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ReactHookFormSelect
                id="provider-title-select"
                name="title"
                label="Title"
                control={control}
                fullWidth
                variant="filled"
                defaultValue="Dr"
              >
                {[
                  'Dr',
                  'Ms',
                  'Mrs',
                  'Miss',
                  'Other',
                ].map((title) => (
                  <MenuItem
                    value={title}
                    key={title}
                  >
                    {title}
                  </MenuItem>
                ))}
              </ReactHookFormSelect>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(errors.firstName)}
                disabled={loading}
                autoComplete="fname"
                name="firstName"
                variant="filled"
                fullWidth
                id="firstName"
                label="First Name"
                inputRef={register}
                helperText={getErrorMessage(
                  'firstName'
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={Boolean(errors.lastName)}
                helperText={getErrorMessage(
                  'lastName'
                )}
                disabled={loading}
                variant="filled"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                fullWidth
                id="roomName"
                label="Room name"
                name="roomName"
                inputRef={register}
                error={Boolean(errors.roomName)}
                helperText={getErrorMessage(
                  'roomName'
                )}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={register}
                error={Boolean(errors.email)}
                helperText={getErrorMessage(
                  'email'
                )}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="filled"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputRef={register}
                error={Boolean(errors.password)}
                helperText={getErrorMessage(
                  'password'
                )}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                error={Boolean(errors.isProvider)}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="isProvider"
                      inputRef={register}
                    />
                  }
                  label="I'm using meeDoctor as a provider not a patient"
                />
                <FormHelperText id="is-provider-helper-text">
                  {getErrorMessage('isProvider')}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                error={Boolean(
                  errors.termsOfService
                )}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      name="termsOfService"
                      inputRef={register}
                    />
                  }
                  label="I agree to the Terms and Conditions."
                />
                <FormHelperText id="terms-and-service-helper-text">
                  {getErrorMessage(
                    'termsOfService'
                  )}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                color="primary"
                component={Link}
                to="/login"
              >
                Log in instead
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              className={classes.right}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={formSubmitDisabled}
              >
                Sign up
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
            {`You're a Patient? Check in here `}
            <Link color="inherit" to="/check-in">
              Check in{' '}
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
