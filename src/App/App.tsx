import React, { useEffect } from 'react';

import { Filter, Header, TicketsList, Sort } from '../router';
import { useAppDispatch } from '../hooks';
import './App.css';
import { ticketsAPI } from '../ticketsDB/ticketsDB';
import { ticketsSlice } from '../features/ticketsReducer';

function App() {
  const dispatch = useAppDispatch();
  const { setSearchId } = ticketsSlice.actions;
  const { data: searchId } = ticketsAPI.useFetchSearchIdQuery('');
  useEffect(() => {
    dispatch(setSearchId(searchId));
  }, [searchId]);
  return (
    <div className="App">
      <Header />
      <Filter />
      <div className="rightSection">
        <Sort />
        <TicketsList />
      </div>
    </div>
  );
}

export default App;
