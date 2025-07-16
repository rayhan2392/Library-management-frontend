
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://library-management-ochre-tau.vercel.app/api'
    }),
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        //get all books
        getBooks: builder.query({
            query: () => '/books',
            providesTags: ['Books'],
        }),
        //create a book
        createBook: builder.mutation({
            query: (newBook) => ({
                url: '/books',
                method: 'POST',
                body: newBook
            }),
            invalidatesTags: ['Books'],
        }),
        //get a single book
        getBookById: builder.query({
            query: (id) => `/books/${id}`,
            transformResponse: (response) => response.data
        }),

        //Edit a book
        updateBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Books'],
        }),
        //delete a book
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Books'], // auto refetch book list after deletion
        }),

    })

})


export const {
    useGetBooksQuery,
    useCreateBookMutation,
    useGetBookByIdQuery,
    useUpdateBookMutation,
    useDeleteBookMutation
} = bookApi