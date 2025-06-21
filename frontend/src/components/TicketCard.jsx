import { useState } from "react";
import api from "../api";

export default function TicketCard({ ticket, isStaff, onStatusUpdated }) {
  const [replyContent, setReplyContent] = useState("");
  const [replies, setReplies] = useState(ticket.Replies || []);
  const [status, setStatus] = useState(ticket.status);
  const [submitting, setSubmitting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const token = localStorage.getItem("token");

  const handleAddReply = async () => {
    if (!replyContent.trim()) return;

    try {
      setSubmitting(true);
      const res = await api.post(
        `/replyTickets/${ticket.id}/replies`,
        { content: replyContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReplies((prev) => [...prev, res.data.data]);
      setReplyContent("");
    } catch (err) {
      console.error("Error adding reply:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async () => {
    const newStatus = status === "OPEN" ? "CLOSED" : "OPEN";
    try {
      setUpdatingStatus(true);
      const res = await api.patch(
        `/tickets/${ticket.id}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStatus(newStatus);
      if (onStatusUpdated) {
        onStatusUpdated(ticket.id, newStatus);
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{ticket.title}</h3>
        {ticket.user?.username && (
          <span className="text-sm text-gray-500 italic">
            by {ticket.user.username}
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-2">{ticket.description}</p>

      <div className="mb-2 flex items-center gap-3">
        <span
          className={`inline-block px-3 py-1 text-sm rounded-full ${
            status === "OPEN"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status}
        </span>

        {isStaff && (
          <button
            onClick={toggleStatus}
            disabled={updatingStatus}
            className="text-xs px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            {updatingStatus
              ? "Updating..."
              : `Mark as ${status === "OPEN" ? "Closed" : "Open"}`}
          </button>
        )}
      </div>

      {/* Replies */}
      <div className="mt-4">
        <h4 className="font-semibold mb-2 text-sm text-gray-600">Replies:</h4>
        {replies.length > 0 ? (
          <ul className="space-y-2">
            {replies.map((reply) => (
              <li
                key={reply.id}
                className="bg-gray-100 px-3 py-2 rounded text-sm"
              >
                <div className="text-gray-800">{reply.content}</div>
                {reply.user?.username && (
                  <div className="text-xs text-gray-500 mt-1">
                    — {reply.user.username}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No replies yet.</p>
        )}
      </div>

      {/* STAFF reply input */}
      {isStaff && (
        <div className="mt-4">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            rows={2}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddReply}
            disabled={submitting}
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded text-sm"
          >
            {submitting ? "Posting..." : "Post Reply"}
          </button>
        </div>
      )}
    </div>
  );
}
