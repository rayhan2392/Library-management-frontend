import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookByIdQuery, useUpdateBookMutation } from "../redux/api/bookApi";


const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useGetBookByIdQuery(id!);
  const [updateBook] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: book , // populate form when data is loaded
  });

  const onSubmit = async (data) => {
    try {
      await updateBook({ id: id!, data }).unwrap();
      alert("✅ Book updated successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Failed to update book:", error);
      alert("Update failed.");
    }
  };

  if (isLoading) return <div className="text-center mt-20">📖 Loading book details...</div>;

  return (
    <div className="max-w-xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">✏️ Edit Book</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <input
          {...register("title", { required: "Title is required" })}
          className="w-full border p-3 rounded-lg"
          placeholder="Book Title"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        {/* Author */}
        <input
          {...register("author", { required: "Author is required" })}
          className="w-full border p-3 rounded-lg"
          placeholder="Author Name"
        />
        {errors.author && <p className="text-red-500">{errors.author.message}</p>}

        {/* Genre */}
        <select {...register("genre", { required: "Genre is required" })} className="w-full border p-3 rounded-lg">
          <option value="">Select Genre</option>
          {["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"].map((genre) => (
            <option key={genre} value={genre}>
              {genre.replace("_", " ")}
            </option>
          ))}
        </select>
        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}

        {/* ISBN */}
        <input
          {...register("isbn", { required: "ISBN is required" })}
          className="w-full border p-3 rounded-lg"
          placeholder="ISBN"
        />
        {errors.isbn && <p className="text-red-500">{errors.isbn.message}</p>}

        {/* Description */}
        <textarea {...register("description")} className="w-full border p-3 rounded-lg" placeholder="Description" />

        {/* Copies */}
        <input
          {...register("copies", { required: "Copies is required", valueAsNumber: true, min: 0 })}
          type="number"
          className="w-full border p-3 rounded-lg"
          placeholder="Copies"
        />
        {errors.copies && <p className="text-red-500">{errors.copies.message}</p>}

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
