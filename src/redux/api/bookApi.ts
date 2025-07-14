import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://library-management-ochre-tau.vercel.app/api',
        credentials:'include' }),
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books'
        })
    })
})


export const {useGetBooksQuery}= bookApi