import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { filterItems } from '../utils/filterItems';

export interface ICheckboxes {
  checkboxes: boolean[];
}

const initialState = {
  checkboxes: new Array(filterItems.length).fill(false),
};

export const checkboxesSlice = createSlice({
  name: 'checkboxes',
  initialState,
  reducers: {
    check: (state) => {
      if (state.checkboxes[0]) {
        state = initialState;
      }
      if (!state.checkboxes[0]) {
        return {
          ...state,
          checkboxes: defaultState.checkboxes.map((item) => !item),
        };
      }
      return {
        ...state,
        checkboxes: state.checkboxes.map((item, index) => {
          return index === action.payload ? !item : item;
        }),
      };
    }
  }
});
