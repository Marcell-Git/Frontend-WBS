import AppRouter from './router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'sonner'
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>  
      <Toaster richColors position="bottom-center"/>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>,
)