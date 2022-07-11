import React from 'react';

import { Filter, Header, TicketsList } from '../router';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
      <TicketsList />
    </div>
  );
}

export default App;
