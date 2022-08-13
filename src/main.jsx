import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';

import { ToggleDark } from './utils/ToggleDark';

import App from './components/App';
import store from './app/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToggleDark>
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    </ToggleDark>
  </Provider>,
);
