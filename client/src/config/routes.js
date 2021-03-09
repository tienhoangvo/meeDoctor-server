import HomePage from './../Pages/HomePage'
import LoginPage from './../Pages/LoginPage'
import SigupPage from './../Pages/SignupPage'
import PageNotFoundPage from '../Pages/PageNotFoundPage'
import ForgotPasswordPage from '../Pages/ForgotPasswordPage'
import ResetPasswordPage from '../Pages/ResetPasswordPage'
import Profile from '../Components/ui/Profile'
import BookAppointmentPage from '../Pages/BookAppointmentPage'
import MedicalReport from '../Components/ui/MedicalReport'

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    path: '/doctors',
    component: DoctorsPage,
    exact: true,
    routes: [
      {
        path: '/doctors/:id',
        component: DoctorDetailPage,
      },
    ],
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/signup',
    component: SigupPage,
  },
  {
    path: '/forgot-password',
    component: ForgotPasswordPage,
  },
  {
    path: '/reset-password',
    component: ResetPasswordPage,
  },
  {
    path: '/help',
  },
  {
    path: '/contact',
    component: ContactPage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
  {
    path: '/book-appointment',
    component: BookAppointmentPage,
    private: true,
    exact: false,
  },
  {
    private: true,
    path: '/me',
    component: AccountPage,

    routes: [
      {
        path: '/me/profile',
        component: Profile,
      },
      {
        path: '/me/bookings',
        component: Profile,
      },
      {
        path: '/me/medical-reports',
        component: Profile,
      },
    ],
  },
  {
    path: '/*',
    component: PageNotFoundPage,
  },
]

export default routes
