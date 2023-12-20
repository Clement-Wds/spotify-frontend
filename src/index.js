import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import './index.css';
import App from './App';
import {store} from './redux/store';

const root = document.getElementById('root');
createRoot(root).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
);
