import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookByIdQuery, useUpdateBookMutation } from "../redux/api/bookApi";
import toast from "react-hot-toast";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useGetBookByIdQuery(id!);
  const [updateBook] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: book,
  });

  const onSubmit = async (data: any) => {
    try {
      await updateBook({ id: id!, data }).unwrap();
      toast.success("✅ Book updated successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Failed to update book:", error);
      toast.error("❌ Update failed.");
    }
  };

  if (isLoading)
    return <div className="text-center mt-20">📖 Loading book details...</div>;

  return (
    <div className="max-w-xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg border">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        ✏️ Edit Book
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full border p-3 rounded-lg"
            placeholder="Book Title"
          />
          {typeof errors.title?.message === "string" && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Author */}
        <div>
          <input
            {...register("author", { required: "Author is required" })}
            className="w-full border p-3 rounded-lg"
            placeholder="Author Name"
          />
          {typeof errors.author?.message === "string" && (
            <p className="text-red-500">{errors.author.message}</p>
          )}
        </div>

        {/* Genre */}
        <div>
          <select
            {...register("genre", { required: "Genre is required" })}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Genre</option>
            {[
              "FICTION",
              "NON_FICTION",
              "SCIENCE",
              "HISTORY",
              "BIOGRAPHY",
              "FANTASY",
            ].map((genre) => (
              <option key={genre} value={genre}>
                {genre.replace("_", " ")}
              </option>
            ))}
          </select>
          {typeof errors.genre?.message === "string" && (
            <p className="text-red-500">{errors.genre.message}</p>
          )}
        </div>

        {/* ISBN */}
        <div>
          <input
            {...register("isbn", { required: "ISBN is required" })}
            className="w-full border p-3 rounded-lg"
            placeholder="ISBN"
          />
          {typeof errors.isbn?.message === "string" && (
            <p className="text-red-500">{errors.isbn.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <textarea
            {...register("description")}
            className="w-full border p-3 rounded-lg"
            placeholder="Description"
          />
        </div>

        {/* Copies */}
        <div>
          <input
            {...register("copies", {
              required: "Copies is required",
              valueAsNumber: true,
              min: { value: 0, message: "Copies must be at least 0" },
            })}
            readOnly
            type="number"
            className="w-full border p-3 rounded-lg"
            placeholder="Copies"
          />
          {typeof errors.copies?.message === "string" && (
            <p className="text-red-500">{errors.copies.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          💾 Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
