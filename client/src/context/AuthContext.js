import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    )
  }

  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()

  const source = axios.CancelToken.source()

  const cancelRequest = (message) => {
    source.cancel(message)
  }
  const fetchMe = () =>
    axios
      .get('/api/users/me', {
        cancelToken: source.token,
      })
      .then((res) => setCurrentUser(res.data))

  const login = ({ email, password }) => {
    console.log({ email, password })
    return axios
      .post(
        '/api/auth/login',
        {
          email,
          password,
        },
        {
          cancelToken: source.token,
        }
      )
      .then((res) => setCurrentUser(res.data))
  }

  const signup = (data) => {
    return axios
      .post('/api/auth/signup', data, {
        cancelToken: source.token,
      })
      .then((res) => setCurrentUser(res.data))
  }

  useEffect(() => {
    fetchMe()
    return () => {
      cancelRequest(
        'Cancel fetch current user request'
      )
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        cancelRequest,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
