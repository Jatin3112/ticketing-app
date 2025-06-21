import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/auth/login", formData);

      const token = res.data?.data?.user?.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setMessage("Invalid response from server");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8 space-y-6">
        <h2 className="text-center text-3xl font-extrabold text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Login to access your dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              name="username"
              type="text"
              placeholder="e.g. johndoe"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        {message && (
          <div className="text-center text-sm text-red-500">{message}</div>
        )}

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-700 font-semibold hover:underline"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
