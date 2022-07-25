import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export const ticketsAPI = createApi({
  reducerPath: 'ticketsAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://aviasales-test-api.kata.academy' }),
  endpoints: (build) => ({
    fetchSearchId: build.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const getSearchId: any = await fetchWithBQ('/search');
        if (getSearchId.error) return { error: getSearchId.error as FetchBaseQueryError };
        const searchId = getSearchId.data.searchId;
        return searchId ? { data: searchId } : { error: searchId.error };
      },
    }),
    fetchAllTickets: build.query({
      query: (searchIden) => ({
        url: '/tickets',
        params: { searchId: searchIden },
      }),
    }),
  }),
});
