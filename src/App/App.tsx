import React, { useEffect } from 'react';

import { Filter, Header, TicketsList, Sort } from '../router';
import { useAppDispatch } from '../hooks';
import { ticketsAPI } from '../ticketsDB/ticketsDB';
import { ticketsSlice } from '../features/ticketsReducer';

// @ts-ignore
import classes from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const { setSearchId } = ticketsSlice.actions;
  const { data: searchId } = ticketsAPI.useFetchSearchIdQuery('');
  useEffect(() => {
    dispatch(setSearchId(searchId));
  }, [searchId]);
  return (
    <div className={classes.App}>
      <Header />
      <Filter />
      <div className={classes.rightSection}>
        <Sort />
        <TicketsList />
      </div>
    </div>
  );
}

export default App;
