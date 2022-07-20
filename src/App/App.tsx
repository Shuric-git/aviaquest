import React from 'react';

import { Filter, Header, TicketsList, Sort } from '../router';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
      <div className="rightSection">
        <Sort />
        <TicketsList />
        {/*<ShowMoreButton />*/}
      </div>
    </div>
  );
}

export default App;
