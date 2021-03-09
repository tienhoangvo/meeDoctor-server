import { Typography } from '@material-ui/core'
import React from 'react'

const Patients = () => {
  return (
    <div>
      {[...new Array(100)].map(() => (
        <Typography variant="h3">
          Patients
        </Typography>
      ))}
    </div>
  )
}

export default Patients
