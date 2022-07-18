import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { filterItems } from '../utils/filterItems';

export interface ICheckboxes {
  checkboxes: boolean[];
}

const initialState: ICheckboxes = {
  checkboxes: new Array(filterItems.length).fill(false),
};

export const checkboxesSlice = createSlice({
  name: 'checkboxes',
  initialState,
  reducers: {
    uncheckAll: (state) => {
      state.checkboxes = initialState.checkboxes;
    },
    checkAll: (state) => {
      state.checkboxes = initialState.checkboxes.map((item: boolean) => !item);
    },
    check: (state, action: PayloadAction<number>) => {
      state.checkboxes = state.checkboxes.map((item, index) => {
        return index === action.payload ? !item : item;
      });
    },
  },
});

export const { check } = checkboxesSlice.actions;

export default checkboxesSlice.reducer;
