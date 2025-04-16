import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { BrowserRouter } from 'react-router-dom'
import { App } from './app/App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
