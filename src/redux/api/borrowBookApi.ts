import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const borrowBookApi = createApi({
  reducerPath: 'borrowBookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api'
  }),
  tagTypes: ['BorrowSummary'],
  endpoints: (builder) => ({
    //  Get all borrow summary
    getBorrowSummary: builder.query({
      query: () => '/borrow',
      transformResponse: (response) => response.data,
      providesTags: ['BorrowSummary'],
    }),

    //  Borrow a book
    borrowBook: builder.mutation({
      query: (data) => ({
        url: '/borrow',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['BorrowSummary'],
    }),
  }),
});

export const {
  useGetBorrowSummaryQuery,
  useBorrowBookMutation
} = borrowBookApi;
