import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "../redux/api/bookApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const [createBook] = useCreateBookMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createBook(data).unwrap();
      toast.success("✅ Book added successfully!");
      reset();
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("❌ Failed to add book.");
    }
  };

  const genres = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ];

  return (
    <div className="max-w-xl mx-auto p-6 mt-8 bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        📚 Add a New Book
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Book Title"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {typeof errors.title?.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <input
            {...register("author", { required: "Author is required" })}
            type="text"
            placeholder="Author Name"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {typeof errors.author?.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* Genre */}
        <div>
          <select
            {...register("genre", { required: "Genre is required" })}
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-600"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre.replace("_", " ")}
              </option>
            ))}
          </select>
          {typeof errors.genre?.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>
          )}
        </div>

        {/* ISBN */}
        <div>
          <input
            {...register("isbn", { required: "ISBN is required" })}
            type="text"
            placeholder="ISBN Number"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {typeof errors.isbn?.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            {...register("description")}
            placeholder="Description (optional)"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
        </div>

        {/* Copies */}
        <div>
          <input
            {...register("copies", {
              required: "Copies is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message: "Copies cannot be negative",
              },
            })}
            type="number"
            min="0"
            placeholder="Number of Copies"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          {typeof errors.copies?.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.copies.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          ➕ Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBooks;
