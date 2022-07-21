import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ITicket } from '../interface';

const initialState: any = {
  loadedTickets: [],
  showedTickets: [],
  sort: {
    sortByPrice: true,
    sortByDuration: false,
    sortByOverall: false,
  },
};

export const ticketsSlice = createSlice({
  name: 'ticketsArr',
  initialState,
  reducers: {
    loadTickets: (state, action: PayloadAction<any>) => {
      state.loadedTickets.push(...action.payload.tickets);
    },
    shiftTickets: (state) => {
      state.showedTickets.push(...state.loadedTickets.splice(0, 5));
    },
    ticketsFetching(state: any): void {
      state.isLoading = true;
    },
    ticketsFetchingSuccess(state: any, action: PayloadAction<ITicket[]>) {
      state.isLoading = false;
      state.error = '';
      state.loadedTickets.push(...action.payload);
    },
    ticketsFetchingError(state: any, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    ticketsSortByPrice(state) {
      state.showedTickets.sort((a: any, b: any): number => {
        if (a.price < b.price) {
          return -1;
        }
        return 1;
      });
    },
    ticketsSortByDuration(state) {
      state.showedTickets.sort((a: any, b: any): number => {
        if (a.segments[0].duration < b.segments[0].duration) {
          return -1;
        }
        return 1;
      });
    },
    priceState(state) {
      state.sort.sortByPrice = true;
      state.sort.sortByDuration = false;
      state.sort.sortByOverall = false;
    },
    durationState(state) {
      state.sort.sortByDuration = true;
      state.sort.sortByPrice = false;
      state.sort.sortByOverall = false;
    },
  },
});

export default ticketsSlice.reducer;
