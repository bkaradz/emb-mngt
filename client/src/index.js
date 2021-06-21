import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider } from '@material-ui/core/styles'
// import theme from 'src/theme'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

ReactDOM.render(
  //  theme={theme}
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
