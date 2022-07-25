import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { filterItems } from '../utils/filterItems';

import { ticketsSlice } from './ticketsReducer';

const { filterByStops } = ticketsSlice.actions;

const initialState: { checkboxes: boolean[] } = {
  checkboxes: new Array(filterItems.length).fill(true),
};

export const checkboxesSlice = createSlice({
  name: 'checkboxes',
  initialState,
  reducers: {
    checkAll: (state) => {
      state.checkboxes = initialState.checkboxes;
    },
    uncheckAll: (state) => {
      state.checkboxes = initialState.checkboxes.map((item: boolean) => !item);
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

export default checkboxesSlice.reducer;
