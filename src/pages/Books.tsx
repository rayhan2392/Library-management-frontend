import BookCard from "../component/BookCard";
import { useGetBooksQuery } from "../redux/api/bookApi";


const Books = () => {
  const { data=[], isLoading } = useGetBooksQuery(undefined);
  const books = data.data

  if (isLoading) return <div className="text-center mt-10">Loading books...</div>;

//   if (!data?.length) return <div className="text-center mt-10">No books available.</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Available Books 📚</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
