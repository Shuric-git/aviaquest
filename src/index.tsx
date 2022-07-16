import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import './index.css';
import { Provider } from 'react-redux';

import { filterItems } from './utils/filterItems';
import App from './App/App';

const defaultState = {
  checkboxes: new Array(filterItems.length).fill(false),
};
const reducer = (
  state: {
    checkboxes: boolean[];
  } = defaultState,
  action: { type: string; payload: number }
): boolean[] => {
  console.log(state.checkboxes[0]);
  switch (action.type) {
    case 'clickCheck':
      if (action.payload === 0 && state.checkboxes[0]) {
        return defaultState.checkboxes;
      }
      if (action.payload === 0 && !state.checkboxes[0]) {
        return defaultState.checkboxes.map((item) => !item);
      }
      return state.checkboxes.map((item, index) => {
        return index === action.payload ? !item : item;
      });
    default:
      return state.checkboxes;
  }
};

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
