import { combineReducers, configureStore } from '@reduxjs/toolkit';

import checkboxesReducer from '../features/checkboxes';

const rootReducer = combineReducers({
  checkboxesReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
