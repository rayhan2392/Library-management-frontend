import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold">
          📚 Library Manager
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-200 transition"
            }
          >
            All Books
          </NavLink>

          <NavLink
            to="/create-book"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-200 transition"
            }
          >
            Add Book
          </NavLink>

          <NavLink
            to="/borrow-summary"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-300 font-semibold"
                : "hover:text-yellow-200 transition"
            }
          >
            Borrow Summary
          </NavLink>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button className="text-white text-2xl">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
