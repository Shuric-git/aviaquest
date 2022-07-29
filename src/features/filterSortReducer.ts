import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { store } from '../index';
import { AppDispatch } from '../store/store';
import { ISortState } from '../interface';
import { filterItems } from '../model/filterItems';

import { ticketsSlice } from './ticketsReducer';

const { filterByStops } = ticketsSlice.actions;

const checkboxesInitialState: { checkboxes: boolean[] } = {
  checkboxes: new Array(filterItems.length).fill(true),
};

export const checkboxesSlice = createSlice({
  name: 'checkboxes',
  initialState: checkboxesInitialState,
  reducers: {
    checkAll: (state) => {
      state.checkboxes = checkboxesInitialState.checkboxes;
    },
    uncheckAll: (state) => {
      state.checkboxes = checkboxesInitialState.checkboxes.map((item: boolean) => !item);
    },
    check: (state, action: PayloadAction<number>) => {
      state.checkboxes = state.checkboxes.map((item, index) => {
        return index === action.payload ? !item : item;
      });
    },
    autoCheck: (state) => {
      state.checkboxes[0] = true;
    },
    autoUncheck: (state) => {
      state.checkboxes[0] = false;
    },
    filterByStopsHandler: (state) => {
      filterByStops(state.checkboxes);
    },
  },
});

const sortInitialState: ISortState = {
  sort: {
    sortByPrice: true,
    sortByDuration: false,
    sortByOverall: false,
  },
};

export const sortSlice = createSlice({
  initialState: sortInitialState,
  name: 'sort',
  reducers: {
    sortState(state, action: PayloadAction<string>) {
      for (let key of Object.keys(state.sort)) {
        state.sort[key] = false;
        if (key === action.payload) {
          state.sort[key] = true;
        }
      }
    },
  },
});

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
export const filterTickets = () => {
  return (dispatch: AppDispatch) => {
    const checkboxState = store.getState().checkboxesReducer.checkboxes;
    dispatch(ticketsSlice.actions.filterByStops(checkboxState));
  };
};
