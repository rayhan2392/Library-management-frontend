import BookCard from "../component/BookCard";
import { useGetBooksQuery } from "../redux/api/bookApi";

const Books = () => {
  const { data = [], isLoading } = useGetBooksQuery(undefined);
  const books = data.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-indigo-600 text-lg font-semibold animate-pulse">
          📚 Loading books...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-800 tracking-tight">
          Available Books
        </h1>
        <span className="text-sm text-gray-500">
          Total: {books?.length ?? 0}
        </span>
      </div>

      {(!books || books.length === 0) ? (
        <div className="text-center text-gray-500 mt-20">
          ❌ No books found in the library.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
