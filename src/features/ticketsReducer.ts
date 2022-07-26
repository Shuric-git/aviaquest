import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ITicket, ITicketState } from '../interface';

const initialState: ITicketState = {
  loadedTickets: [],
  addedTickets: [],
  showedTickets: [],
  searchIdStore: '',
  stopFetching: false,
};

export const ticketsSlice = createSlice({
  name: 'ticketsArr',
  initialState,
  reducers: {
    loadTickets: (state, action: PayloadAction<{ tickets: [] }>) => {
      state.loadedTickets.push(...action.payload.tickets);
    },
    ticketsSortByPrice(state) {
      state.showedTickets.sort((a: ITicket, b: ITicket): number => {
        if (a.price < b.price) {
          return -1;
        }
        return 1;
      });
    },
    ticketsSortByDuration(state) {
      state.showedTickets.sort((a: ITicket, b: ITicket): number => {
        if (a.segments[0].duration < b.segments[0].duration) {
          return -1;
        }
        return 1;
      });
    },
    filterByStops(state, action: PayloadAction<boolean[]>) {
      let forFilter = [...state.loadedTickets];
      state.showedTickets = [];
      if (forFilter) {
        action.payload.forEach((item: boolean, index) => {
          if (item) {
            state.showedTickets.push(
              ...forFilter.filter((item: ITicket) => item.segments[0].stops.length === index - 1)
            );
          }
        });
      }
    },
    stopFetching(state) {
      state.stopFetching = true;
    },
    setSearchId(state, action: PayloadAction<string>) {
      state.searchIdStore = action.payload;
    },
  },
});

export default ticketsSlice.reducer;
