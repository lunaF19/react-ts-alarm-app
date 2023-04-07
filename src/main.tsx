import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
 
import App from './App'
import store, { } from "./store/index"

import './index.css'
import AuthProvider from "./auth/context/AuthProvider"
import MuiTheme from "./muiTheme"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename=''>
        <AuthProvider>
          <MuiTheme>
            <App />
          </MuiTheme>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
