import { createBrowserRouter } from "react-router";
import App from "../App";
import Books from "../pages/Books";
import AddBooks from "../component/AddBook";
import BookDetails from "../component/BookDetails";
import EditBook from "../component/EditBooks";
import BorrowBook from "../component/BorrowBook";
import BorrowBookSummary from "../pages/borrowBooksSummary";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children:[
            {
               path:'books',
               Component: Books 
            },
            {
               Component: Books ,
               index:true
            },
            {
                path:'create-book',
                Component:AddBooks
            },
            {
                path:'books/:id',
                Component:BookDetails
            },
            {
                path:'edit-book/:id',
               Component:EditBook
            },
            {
                path:'/borrow/:bookId',
                Component: BorrowBook
            },
            {
                path:'/borrow-summary',
                Component:BorrowBookSummary
            }
        ]
    }
])