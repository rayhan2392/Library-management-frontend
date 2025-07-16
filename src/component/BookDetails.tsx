import { useParams } from 'react-router-dom';
import { useGetBookByIdQuery } from '../redux/api/bookApi';

const BookDetails = () => {
  const { id } = useParams();
  const { data: book, isLoading, error } = useGetBookByIdQuery(id!);

  if (isLoading)
    return <div className="text-center mt-20 text-xl font-medium">📖 Loading book details...</div>;

  if (error)
    return <div className="text-center mt-20 text-red-600 font-semibold">Failed to load book details.</div>;

  if (!book)
    return <div className="text-center mt-20 text-gray-600">No book found!</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-xl border border-gray-200">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-4 text-center">{book.title}</h2>
      <p className="text-lg text-gray-800 mb-1 text-center">by <span className="font-semibold">{book.author}</span></p>
      <p className="text-sm text-gray-500 mb-6 text-center">ISBN: {book.isbn}</p>

      <div className="flex justify-center mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-600">
          {book.genre}
        </span>
      </div>

      <p className="text-gray-700 leading-relaxed mb-8 text-center">{book.description}</p>

      <div className="flex items-center justify-between mt-6">
        <div>
          <p className={`text-sm font-semibold ${book.available ? 'text-green-600' : 'text-red-500'}`}>
            {book.available ? `Available (${book.copies} copies)` : 'Unavailable'}
          </p>
        </div>

        <div className="space-x-3">
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
