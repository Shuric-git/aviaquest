import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const searchIDAPI = createApi({
  reducerPath: 'searchIDAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://aviasales-test-api.kata.academy' }),
  endpoints: (build) => ({
    fetchSearchId: build.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const getSearchId: any = await fetchWithBQ('/search');
        if (getSearchId.error) return { error: getSearchId.error as FetchBaseQueryError };
        const searchId = getSearchId.data.searchId;
        const tickets = await fetchWithBQ(`/tickets?searchId=${searchId}`);
        return tickets.data ? { data: tickets.data } : { error: tickets.error };
      },
    }),
  }),
});

// export const ticketsAPI = createApi({
//   reducerPath: 'ticketsAPI',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://aviasales-test-api.kata.academy' }),
//   endpoints: (build) => ({
//     fetchSearchId: build.query({
//       async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
//         const getSearchId = await fetchWithBQ('/search');
//         if (getSearchId.error) return { error: getSearchId.error as FetchBaseQueryError };
//         const searchId = getSearchId.data.searchId;
//         const tickets = await fetchWithBQ(`/tickets?searchId=${searchId}`);
//         return tickets.data ? { data: tickets.data } : { error: tickets.error };
//       },
//     }),
//   }),
// });

// export const ticketsAPI = createApi({
//   reducerPath: 'ticketsAPI',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://aviasales-test-api.kata.academy' }),
//   endpoints: (build) => ({
//     fetchSearchId: build.query({
//       query: () => ({
//         url: '/search',
//       }),
//     }),
//     fetchAllTickets: build.query({
//       query: (searchIden) => ({
//         url: '/tickets',
//         params: { searchId: searchIden },
//       }),
//     }),
//   }),
// });

export class TicketsDB {
  private static SEARCH_URL: string = 'https://aviasales-test-api.kata.academy/search';
  private static TICKETS_URL: string = 'https://aviasales-test-api.kata.academy/tickets';

  static async getSearchId(): Promise<() => string> {
    const request = await fetch(this.SEARCH_URL);
    const { searchId } = await request.json();
    if (!searchId) {
      throw new Error('searchId can not be null');
    }
    return searchId;
  }

  static async getTickets(): Promise<any> {
    let request = await fetch(`${this.TICKETS_URL}?searchId=${await this.getSearchId()}`);
    return request.json();
  }
}
