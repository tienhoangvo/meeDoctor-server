import { makeStyles } from '@material-ui/core'
import React from 'react'

const useHomeStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: '3rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '2rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '2rem',
    },
  },
  hero: {
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '20rem',
    },
  },
  heroContainer: {
    padding: '5%',
    [theme.breakpoints.down('sm')]: {
      padding: '2%',
    },
  },
  btnContainer: {
    marginTop: '1rem',
  },
  heroText: {
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  heroTextContainer: {
    minWidth: '21.5rem',
    marginLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
    },
  },
}))

export default useHomeStyles
