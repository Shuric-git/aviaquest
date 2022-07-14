import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import './index.css';
import { Provider } from 'react-redux';

import { filterItems } from './utils/filterItems';
import App from './App/App';

const defaultState = new Array(filterItems.length).fill(false);

const reducer = (state: boolean[] = defaultState, action: { type: string; payload: number }) => {
  switch (action.type) {
    case 'clickCheck':
      if (action.payload === 0 && state[0]) {
        return defaultState;
      }
      if (action.payload === 0 && !state[0]) {
        return defaultState.map((item) => !item);
      }
      return state.map((item, index) => {
        return index === action.payload ? !item : item;
      });
    default:
      return state;
  }
};

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
