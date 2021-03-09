import React from 'react'
import useAppBarStyles from './useAppBarStyles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

const DashBoardHeader = ({
  handleDrawerToggle,
}) => {
  const classes = useAppBarStyles()

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      color="secondary"
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default DashBoardHeader
