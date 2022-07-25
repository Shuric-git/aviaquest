import React from 'react';

import { getSearchId } from '../features/actionCreators';
import { Filter, Header, TicketsList, Sort } from '../router';
import { useAppDispatch } from '../hooks';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  dispatch(getSearchId());
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
