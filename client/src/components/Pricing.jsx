import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'

const Pricing = () => {
  return (
    <div>
      {[...new Array(100)].map(() => (
        <Typography variant="h3">
          Pricing
        </Typography>
      ))}
    </div>
  )
}

export default Pricing
