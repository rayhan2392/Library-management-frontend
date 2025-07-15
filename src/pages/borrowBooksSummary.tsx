import { useGetBorrowSummaryQuery } from "../redux/api/borrowBookApi";
import { BookOpen, PackageOpen } from "lucide-react";
import toast from "react-hot-toast";

const BorrowBookSummary = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery(undefined);
  console.log(data);

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
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-xl border border-indigo-100">
      <h2 className="text-3xl font-extrabold text-indigo-800 mb-8 flex items-center gap-2">
        <BookOpen size={30} /> Borrow Summary 📚
      </h2>

      {data?.length === 0 && (
        <p className="text-gray-600 text-center text-lg">
          No borrow data available.
        </p>
      )}

      <div className="space-y-5">
        {data?.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <PackageOpen className="text-indigo-600" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.book.title}
                </h3>
                <p className="text-sm text-gray-500">ISBN: {item.book.isbn}</p>
              </div>
            </div>

            <span className="text-indigo-700 font-bold text-xl flex items-center gap-1">
              📦 {item.totalQuantity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowBookSummary;
