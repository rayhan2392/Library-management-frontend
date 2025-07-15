import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const borrowBookApi = createApi({
    reducerPath: 'borrowBookApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api'}),
    endpoints: (builder) => ({
        getBoroow: builder.query({
            query: () => '/borrow'
        })
    })
})


export const {useGetBoroowQuery}= borrowBookApi