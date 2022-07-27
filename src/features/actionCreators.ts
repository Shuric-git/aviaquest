import { store } from '../index';
import { AppDispatch } from '../store/store';

import { ticketsSlice } from './ticketsReducer';
import { sortSlice } from './sortReducer';

export const sortByPrice = (id: string) => (dispatch: AppDispatch) => {
  dispatch(sortSlice.actions.sortState(id));
  dispatch(ticketsSlice.actions.ticketsSortByPrice());
};

export const sortByDuration = (id: string) => (dispatch: AppDispatch) => {
  dispatch(sortSlice.actions.sortState(id));
  dispatch(ticketsSlice.actions.ticketsSortByDuration());
};
export const sortByOverall = (id: string) => (dispatch: AppDispatch) => {
  dispatch(sortSlice.actions.sortState(id));
  dispatch(ticketsSlice.actions.ticketsSortByOverall());
};
export const func = () => {
  return (dispatch: AppDispatch) => {
    const checkboxState = store.getState().checkboxesReducer.checkboxes;
    dispatch(ticketsSlice.actions.filterByStops(checkboxState));
  };
};
