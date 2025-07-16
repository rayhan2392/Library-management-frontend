import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2, BookOpen } from "lucide-react";
import { useDeleteBookMutation } from "../redux/api/bookApi";
import toast from "react-hot-toast";

interface BookProps {
  book: {
    _id: string;
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description?: string;
    copies: number;
    available: boolean;
  };
}

const BookCard: React.FC<BookProps> = ({ book }) => {
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async () => {
    toast(
      (t) => (
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">
            Are you sure you want to delete?
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={async () => {
                try {
                  await deleteBook(book._id).unwrap();
                  toast.dismiss(t.id);
                  toast.success("✅ Book deleted successfully!");
                } catch (err) {
                  console.error("Delete failed", err);
                  toast.dismiss(t.id);
                  toast.error("❌ Failed to delete book.");
                }
              }}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="border border-gray-400 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 8000 }
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full border border-indigo-100">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] bg-repeat z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Book Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-1">{book.title}</h2>
        <p className="text-sm text-gray-600 mb-2">by {book.author}</p>

        {/* Genre */}
        <span className="text-xs inline-block bg-indigo-100 text-indigo-700 font-medium px-2 py-0.5 rounded-full mb-2 w-fit">
          {book.genre}
        </span>

        {/* Availability */}
        <p
          className={`text-xs font-semibold mb-4 ${
            book.available ? "text-green-600" : "text-red-500"
          }`}
        >
          {book.available ? `Available (${book.copies})` : "Unavailable"}
        </p>

        {/* Buttons */}
        <div className="mt-auto flex flex-wrap gap-2">
          <Link
            to={`/books/${book._id}`}
            className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded hover:bg-blue-200 transition"
          >
            <Eye size={14} /> View
          </Link>

          <Link
            to={`/edit-book/${book._id}`}
            className="flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded hover:bg-yellow-200 transition"
          >
            <Pencil size={14} /> Edit
          </Link>

          <button
            onClick={handleDelete}
            className="flex items-center gap-1 bg-red-100 text-red-700 text-xs px-3 py-1 rounded hover:bg-red-200 transition"
          >
            <Trash2 size={14} /> Delete
          </button>

          {book.available && (
            <Link
              to={`/borrow/${book._id}`}
              className="flex items-center gap-1 bg-green-100 text-green-700 text-xs px-3 py-1 rounded hover:bg-green-200 transition"
            >
              <BookOpen size={14} /> Borrow
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
