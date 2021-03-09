import React from 'react'
import {
  Button,
  Grid,
  Typography,
} from '@material-ui/core'
import useHomeStyles from './useHomeStyles'
import Hero from './../../Hero.svg'
import { ChevronRight as ChevronRightIcon } from '@material-ui/icons'
const Home = ({ setOpenSignupOptions }) => {
  const classes = useHomeStyles()
  return (
    <Grid
      container
      direction="column"
      className={classes.mainContainer}
    >
      <Grid item>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="row"
        >
          <Grid
            sm
            item
            className={classes.heroTextContainer}
          >
            <Typography
              variant="h1"
              align="center"
              className={classes.heroText}
            >
              The simple, free, and secure <br />
              telemedicine solution
            </Typography>

            <Grid
              container
              justify="center"
              spacing={2}
              className={classes.btnContainer}
            >
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() =>
                    setOpenSignupOptions(true)
                  }
                >
                  Get Started For Free
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  endIcon={<ChevronRightIcon />}
                  size="large"
                >
                  Watch Demo Video
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md
            className={classes.heroContainer}
          >
            <img
              src={Hero}
              alt="meeDoctor hero"
              className={classes.hero}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home
