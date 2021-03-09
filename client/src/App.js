import { ThemeProvider } from '@material-ui/core'
import React from 'react'
import AppRouter from './AppRouter'
import { AuthProvider } from './context/AuthContext'
import theme from './theme/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
