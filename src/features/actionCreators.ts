import axios from 'axios';

import { store } from '../index';
import { AppDispatch } from '../store/store';

import { ticketsSlice } from './ticketsReducer';
import { sortSlice } from './sortReducer';

const SEARCH_URL: string = 'https://aviasales-test-api.kata.academy/search';
const TICKETS_URL: string = 'https://aviasales-test-api.kata.academy/tickets';

export const getSearchId = () => async (dispatch: AppDispatch) => {
  // const request = await fetch(SEARCH_URL);
  // const { searchId } = await request.json();
  fetch(SEARCH_URL)
    .then((res) => res.json())
    .then((res) => {
      // console.log('res:', res.searchId);
      dispatch(ticketsSlice.actions.setSearchId(res.searchId));
    });
};
export const fetchTickets = (searchId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(ticketsSlice.actions.ticketsFetching());
    const response = await axios.get(`${TICKETS_URL}?searchId=${searchId}`);
    dispatch(ticketsSlice.actions.ticketsFetchingSuccess(response.data.tickets));
    dispatch(ticketsSlice.actions.ticketsSortByPrice());
    console.log(store.getState().ticketsReducer.stopFetching);
    if (!store.getState().ticketsReducer.stopFetching) {
      // console.log('yay');
      await fetchTickets(searchId);
    }
    if (response.data.stop) {
      dispatch(ticketsSlice.actions.stopFetching());
      return;
    }
    // await fetchTickets(searchId);
    // dispatch(ticketsSlice.actions.pushTickets());
  } catch (e: any) {
    dispatch(ticketsSlice.actions.ticketsFetchingError(e.message));
  }
};

export const sortByPrice = (id: string) => (dispatch: AppDispatch) => {
  dispatch(sortSlice.actions.sortState(id));
  dispatch(ticketsSlice.actions.ticketsSortByPrice());
};

export const sortByDuration = (id: string) => (dispatch: AppDispatch) => {
  dispatch(sortSlice.actions.sortState(id));
  dispatch(ticketsSlice.actions.ticketsSortByDuration());
};
export const func = () => {
  return (dispatch: AppDispatch) => {
    const checkboxState = store.getState().checkboxesReducer.checkboxes;
    dispatch(ticketsSlice.actions.filterByStops(checkboxState));
  };
};
