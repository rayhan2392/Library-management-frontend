import { createBrowserRouter } from "react-router";
import App from "../App";
import Books from "../pages/Books";
import AddBooks from "../component/AddBook";
import BookDetails from "../component/BookDetails";
import EditBook from "../component/EditBooks";

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
            }
        ]
    }
])