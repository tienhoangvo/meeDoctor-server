import {
  FaceRounded as FaceRoundedIcon,
  Home as HomeIcon,
  LocalHospitalRounded as LocalHospitalRoundedIcon,
  Menu as MenuIcon,
  MonetizationOnRounded as MonetizationOnRoundedIcon,
} from '@material-ui/icons'

const landingRoutes = [
  {
    name: 'Home',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    name: 'For Patients',
    path: '/patients',
    icon: <FaceRoundedIcon />,
  },
  {
    name: 'For Providers',
    path: '/providers',
    icon: <LocalHospitalRoundedIcon />,
  },
  {
    name: 'Pricing',
    path: '/pricing',
    icon: <MonetizationOnRoundedIcon />,
  },
]

export default landingRoutes
