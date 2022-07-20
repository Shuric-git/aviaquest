import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  loadedTickets: [],
  showedTickets: [],
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
  },
});

export default ticketsSlice.reducer;
