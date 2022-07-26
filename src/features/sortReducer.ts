import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { ISortState } from '../interface';

const initialState: ISortState = {
  sort: {
    sortByPrice: true,
    sortByDuration: false,
    sortByOverall: false,
  },
};

export const sortSlice = createSlice({
  name: 'sort',
  initialState,
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

export default sortSlice.reducer;
