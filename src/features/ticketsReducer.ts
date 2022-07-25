import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ITicket } from '../interface';

const initialState: any = {
  loadedTickets: [],
  addedTickets: [],
  showedTickets: [],
  searchIdStore: '',
  stopFetching: false,
  // sort: {
  //   sortByPrice: true,
  //   sortByDuration: false,
  //   sortByOverall: false,
  // },
};

export const ticketsSlice = createSlice({
  name: 'ticketsArr',
  initialState,
  reducers: {
    loadTickets: (state, action: PayloadAction<any>) => {
      state.loadedTickets.push(...action.payload.tickets);
    },
    pushTickets: (state) => {
      state.addedTickets.push(...state.loadedTickets.splice(0, 5));
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
    // sortState(state, action: PayloadAction<string>) {
    //   for (let key of Object.keys(state.sort)) {
    //     state.sort[key] = false;
    //     if (key === action.payload) {
    //       state.sort[key] = true;
    //     }
    //   }
    // },
    filterByStops(state, action: PayloadAction<boolean[]>) {
      let forFilter = [...state.loadedTickets];
      state.showedTickets = [];
      if (forFilter) {
        action.payload.forEach((item: boolean, index) => {
          if (item) {
            state.showedTickets.push(...forFilter.filter((item: any) => item.segments[0].stops.length === index - 1));
          }
        });
      }
      // state.showedTickets = state.showedTickets.filter((item: ITicket) => item.segments[0].stops.length === 1);
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
