import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import ListContextProvider from './contexts/ListContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ListContextProvider>
      <Suspense fallback={'...loading'}>
        <App />
      </Suspense>
      <ToastContainer hideProgressBar={true} />
    </ListContextProvider>
  </StrictMode>,
)
