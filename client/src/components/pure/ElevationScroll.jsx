import { useScrollTrigger } from '@material-ui/core'
import { cloneElement } from 'react'

const ElevationScroll = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return cloneElement(children, {
    elevation: trigger ? 3 : 0,
  })
}

export default ElevationScroll
