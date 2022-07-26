interface ITicket {
  price: number;
  carrier: string;
  segments: [
    { origin: string; destination: string; duration: number; date: string; stops: string[] },
    { origin: string; destination: string; duration: number; date: string; stops: string[] }
  ];
}

interface ITicketState {
  loadedTickets: [];
  addedTickets: [];
  showedTickets: [];
  searchIdStore: string;
  stopFetching: boolean;
}

interface ISortState {
  sort: {
    [key: string]: boolean;
    sortByPrice: boolean;
    sortByDuration: boolean;
    sortByOverall: boolean;
  };
}

export type { ITicket, ITicketState, ISortState };
