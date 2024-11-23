import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { LoadingProvider } from './contexts/LoadingContext';
import LoadingIndicator from './Components/LoadingIndicator'; // Ensure the path is correct
import { Provider } from 'react-redux';
import store from './store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <LoadingProvider>
      <Router>
        <LoadingIndicator />
        <App />
      </Router>
    </LoadingProvider>
  </StrictMode>
  </Provider>
)
