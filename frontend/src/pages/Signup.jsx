import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/auth/signup", formData);
      setMessage(res.data.message || "Signup successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1500); // brief delay before redirecting to login
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="w-full max-w-md space-y-6 p-8 rounded-xl bg-white shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-800">
          Create an Account
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Sign up to get started
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
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <div className="text-center text-sm text-blue-600">{message}</div>
        )}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
