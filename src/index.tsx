import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/order
import { setupStore } from './store/store';
import './index.css';

import App from './App/App';

export const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
