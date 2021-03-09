import {
  Dashboard,
  MeetingRoom,
  PieChart,
  Settings,
  History,
} from '@material-ui/icons'

const providerDashboardRoutes = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <Dashboard />,
  },
  {
    name: 'Waiting Room',
    path: '/waiting-room',
    icon: <MeetingRoom />,
  },
  {
    name: 'Account Settings',
    path: '/settings',
    icon: <Settings />,
  },
  {
    name: 'Analytics',
    path: '/analytics',
    icon: <PieChart />,
  },
  {
    name: 'Meeting History',
    path: '/meeting-history',
    icon: <History />,
  },
]

export default providerDashboardRoutes
