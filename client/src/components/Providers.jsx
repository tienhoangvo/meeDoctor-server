import { Typography } from '@material-ui/core'
import React from 'react'

const Providers = () => {
  return (
    <div>
      {[...new Array(100)].map(() => (
        <Typography variant="h3">
          Providers
        </Typography>
      ))}
    </div>
  )
}

export default Providers
