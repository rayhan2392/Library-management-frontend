import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useBorrowBookMutation } from "../redux/api/borrowBookApi";
import toast from "react-hot-toast";

const BorrowBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [borrowBook] = useBorrowBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      await borrowBook({
        book: bookId!,
        ...data,
      }).unwrap();
      toast.success("📚 Borrow request successful!");
      reset();
      navigate("/"); // go to home
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("❌ Failed to borrow book.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-extrabold text-indigo-800 mb-6 text-center">
        📖 Borrow Book
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Quantity */}
        <div>
          <input
            {...register("quantity", {
              required: "Quantity is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message: "Must borrow at least 1 copy",
              },
            })}
            type="number"
            min="1"
            placeholder="Quantity"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {typeof errors.quantity?.message === "string" && (
            <p className="text-red-500 text-sm mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <input
            {...register("dueDate", { required: "Due date is required" })}
            type="date"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {typeof errors.dueDate?.message === "string" && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          📚 Confirm Borrow
        </button>
      </form>
    </div>
  );
};

export default BorrowBook;
