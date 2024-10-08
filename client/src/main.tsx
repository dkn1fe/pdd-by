import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './reset.css'
import { Provider } from 'react-redux'
import { store } from './app/store/store.ts'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
