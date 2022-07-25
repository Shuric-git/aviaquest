import { combineReducers, configureStore } from '@reduxjs/toolkit';

import checkboxesReducer from '../features/checkboxesReducer';
import ticketsReducer from '../features/ticketsReducer';
import sortReducer from '../features/sortReducer';
import { ticketsAPI } from '../ticketsDB/ticketsDB';

const rootReducer = combineReducers({
  checkboxesReducer,
  ticketsReducer,
  sortReducer,
  [ticketsAPI.reducerPath]: ticketsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ticketsAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
