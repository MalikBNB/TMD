import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `pb-1 border-b-2 ${
                isActive
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `pb-1 border-b-2 ${
                isActive
                  ? "border-blue-600 text-blue-600 font-semibold"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`
            }
          >
            Tasks
          </NavLink>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-600 hidden sm:block">{user?.email}</span>
          <button
            onClick={logout}
            className="cursor-pointer bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
