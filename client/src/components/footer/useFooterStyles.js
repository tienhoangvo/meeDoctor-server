import { makeStyles } from '@material-ui/core'
import React from 'react'

const useFooterStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
  },
  logoAdornment: {
    width: '20rem',
    verticalAlign: 'bottom',
    [theme.breakpoints.down('md')]: {
      width: '15rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '10rem',
    },
  },
  mainContainer: {
    position: 'absolute',
  },
  link: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.white,
    textDecoration: 'none',
    letterSpacing: '1px',
    opacity: 0.6,
    transition:
      'transform .1s ease, opacity .1s ease',
    '&:focus': {
      opacity: 1,
      transform: `translateY(-3px)`,
    },
  },
  gridItem: {
    margin: '3rem',
  },
  active: {
    opacity: 1,
    transform: `translateY(-3px)`,
  },

  icon: {
    color: theme.palette.white,
    transition:
      'transform .1s ease, opacity .1s ease',
    '&:hover': {
      opacity: 1,
      transform: `translateY(-3px)`,
    },
  },
  socialContainer: {
    position: 'absolute',
    marginTop: '-3rem',
    right: '2rem',
  },
}))

export default useFooterStyles
