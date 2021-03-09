import React from 'react'
import useFooterStyles from './useFooterStyles'
import LogoAdornment from './../../LogoAdornment.svg'
import { Grid, Hidden } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
} from '@material-ui/icons'
const Footer = ({ selectedTab }) => {
  const classes = useFooterStyles()
  return (
    <footer className={classes.footer}>
      <Hidden mdDown>
        <Grid
          container
          justify="center"
          className={classes.mainContainer}
        >
          <Grid item className={classes.gridItem}>
            <Grid
              container
              direction="column"
              spacing={2}
            >
              <Grid
                item
                className={`${classes.link} ${
                  selectedTab === '/'
                    ? classes.active
                    : ''
                }`}
                component={Link}
                to="/"
              >
                Home
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid
              container
              direction="column"
              spacing={2}
            >
              <Grid
                item
                className={`${classes.link} ${
                  selectedTab === '/providers'
                    ? classes.active
                    : ''
                }`}
                component={Link}
                to="/providers"
              >
                For Providers
              </Grid>
              <Grid
                item
                className={`${classes.link} ${
                  selectedTab === '/patients'
                    ? classes.active
                    : ''
                }`}
                component={Link}
                to="/patients"
              >
                For Patients
              </Grid>
              <Grid
                item
                className={`${classes.link} ${
                  selectedTab === '/pricing'
                    ? classes.active
                    : ''
                }`}
                component={Link}
                to="/pricing"
              >
                Pricing
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Grid
              container
              direction="column"
              spacing={2}
            >
              <Grid
                item
                className={classes.link}
                component={Link}
                to="/login"
              >
                Log In
              </Grid>
              <Grid
                item
                className={classes.link}
                component={Link}
                to="/signup"
              >
                Signup for Providers
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>

      <img
        src={LogoAdornment}
        alt="meeDoctor Adornment Logo"
        className={classes.logoAdornment}
      />

      <Grid
        container
        className={classes.socialContainer}
        justify="flex-end"
        spacing={2}
      >
        <Grid
          item
          component={'a'}
          href="https://facebook.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <FacebookIcon
            className={classes.icon}
          />
        </Grid>
        <Grid
          item
          component={'a'}
          href="https://twitter.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <TwitterIcon className={classes.icon} />
        </Grid>
        <Grid
          item
          component={'a'}
          href="https://instagram.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <InstagramIcon
            className={classes.icon}
          />
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
