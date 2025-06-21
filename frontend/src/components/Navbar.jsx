// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between">
      <h1 className="text-xl font-bold">Simplified Ticketing System</h1>
      <div className="space-x-4">
        <button onClick={logout} className="hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
}
