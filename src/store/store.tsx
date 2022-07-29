import { combineReducers, configureStore } from '@reduxjs/toolkit';

import ticketsReducer from '../features/ticketsReducer';
import { sortSlice, checkboxesSlice } from '../features/filterSortReducer';
import { ticketsAPI } from '../ticketsDB/ticketsDB';

const rootReducer = combineReducers({
  ticketsReducer,
  checkboxesReducer: checkboxesSlice.reducer,
  sortReducer: sortSlice.reducer,
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
