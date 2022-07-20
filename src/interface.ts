interface ITicket {
  price: number;
  carrier: string;
  segments: [
    { origin: string; destination: string; duration: number; date: string; stops: string[] },
    { origin: string; destination: string; duration: number; date: string; stops: string[] }
  ];
}

export type { ITicket };
