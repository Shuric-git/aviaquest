import axios from 'axios';

import { AppDispatch } from '../store/store';

import { ticketsSlice } from './ticketsReducer';

const SEARCH_URL: string = 'https://aviasales-test-api.kata.academy/search';
const TICKETS_URL: string = 'https://aviasales-test-api.kata.academy/tickets';

async function getSearchId(): Promise<() => string> {
  const request = await fetch(SEARCH_URL);
  const { searchId } = await request.json();
  if (!searchId) {
    throw new Error('searchId can not be null');
  }
  return searchId;
}

export const fetchTickets = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(ticketsSlice.actions.ticketsFetching());
    const response = await axios.get(`${TICKETS_URL}?searchId=${await getSearchId()}`);
    dispatch(ticketsSlice.actions.ticketsFetchingSuccess(response.data.tickets));
    dispatch(ticketsSlice.actions.shiftTickets());
  } catch (e: any) {
    dispatch(ticketsSlice.actions.ticketsFetchingSuccess(e.message));
  }
};

export const sortByPrice = (id: string) => (dispatch: AppDispatch) => {
  dispatch(ticketsSlice.actions.sortState(id));
  dispatch(ticketsSlice.actions.ticketsSortByPrice());
};

export const sortByDuration = (id: string) => (dispatch: AppDispatch) => {
  dispatch(ticketsSlice.actions.sortState(id));
  dispatch(ticketsSlice.actions.ticketsSortByDuration());
};
