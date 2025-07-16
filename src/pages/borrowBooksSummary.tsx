import { useGetBorrowSummaryQuery } from "../redux/api/borrowBookApi";
import { BookOpen } from "lucide-react";
import toast from "react-hot-toast";

const BorrowBookSummary = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery(undefined);

  if (isLoading)
    return (
      <div className="text-center mt-10 text-indigo-600 font-semibold text-lg">
        📊 Loading borrow summary...
      </div>
    );

  if (error) {
    toast.error("Failed to load borrow summary.");
    return (
      <div className="text-red-500 text-center mt-10 text-lg">
        ❌ Failed to load data.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-xl border border-indigo-100">
      <h2 className="text-3xl font-extrabold text-indigo-800 mb-8 flex items-center gap-2">
        <BookOpen size={30} /> Borrow Summary 📚
      </h2>

      {data?.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">
          No borrow data available.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow border">
            <thead>
              <tr className="bg-indigo-100 text-indigo-800 text-left text-sm uppercase tracking-wider">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">ISBN</th>
                <th className="px-6 py-4 text-right">Total Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="border-t hover:bg-indigo-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {item.book.title}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item.book.isbn}
                  </td>
                  <td className="px-6 py-4 text-right text-indigo-700 font-bold">
                    📦 {item.totalQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BorrowBookSummary;
