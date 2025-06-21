import { useState } from "react";
import api from "../api";

export default function UserList({ users: initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  const handleRoleChange = async (userId, newRole) => {
    const token = localStorage.getItem("token");

    try {
      setUpdatingUserId(userId);
      const res = await api.patch(
        `/users/${userId}/role`,
        { role: newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state after successful change
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: res.data.data.role } : u
        )
      );
    } catch (err) {
      console.error("Error updating role", err);
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <ul className="grid gap-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="bg-gray-50 border p-4 rounded-md flex justify-between items-center"
          >
            <div>
              <div className="font-medium">{user.username}</div>
              <div className="text-sm text-gray-500">ID: {user.id}</div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                disabled={updatingUserId === user.id}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="USER">USER</option>
                <option value="STAFF">STAFF</option>
              </select>
              {updatingUserId === user.id && (
                <span className="text-xs text-gray-500">Updating...</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
