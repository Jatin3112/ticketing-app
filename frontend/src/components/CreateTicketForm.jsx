import { useState } from "react";
import api from "../api";

export default function CreateTicketForm({ onTicketCreated }) {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/tickets", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Ticket created!");
      setFormData({ title: "", description: "" });

      // notify dashboard to re-render
      if (onTicketCreated) onTicketCreated(res.data.data);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create ticket");
    }
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Create New Ticket
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Ticket Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded border px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded border px-4 py-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Submit Ticket
        </button>
        {message && (
          <p className="text-sm text-gray-600 text-center">{message}</p>
        )}
      </form>
    </div>
  );
}
