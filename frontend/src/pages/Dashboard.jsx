import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TicketCard from "../components/TicketCard";
import CreateTicketForm from "../components/CreateTicketForm";
import UserList from "../components/UserList";
import api from "../api";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("tickets");

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const userRes = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = userRes.data.data;
        setUserRole(user.role);
        setCurrentUser(user);

        if (user.role === "STAFF") {
          const ticketRes = await api.get("/tickets", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTickets(ticketRes.data.data || []);

          const usersRes = await api.get("/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsers(usersRes.data.data || []);
        } else {
          setTickets(user.Tickets || []);
        }
      } catch (err) {
        console.error("Error loading dashboard", err);
      }
    };

    fetchData();
  }, []);

  const tabClasses = (tab) =>
    `px-4 py-2 rounded-t-md font-medium transition ${
      activeTab === tab
        ? "bg-white border-t border-l border-r text-blue-600"
        : "bg-gray-100 text-gray-600 hover:text-blue-500"
    }`;

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Tab Header */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab("tickets")}
            className={tabClasses("tickets")}
          >
            {userRole === "STAFF" ? "All Tickets" : "My Tickets"}
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={tabClasses("create")}
          >
            Create Ticket
          </button>
          {userRole === "STAFF" && (
            <button
              onClick={() => setActiveTab("users")}
              className={tabClasses("users")}
            >
              Users
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === "create" && (
          <CreateTicketForm
            onTicketCreated={(newTicket) =>
              setTickets((prev) => [newTicket, ...prev])
            }
          />
        )}

        {activeTab === "users" && userRole === "STAFF" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Users</h2>
            <UserList users={users} />
          </>
        )}

        {activeTab === "tickets" && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {userRole === "STAFF" ? "All Tickets" : "My Tickets"}
            </h2>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  isStaff={userRole === "STAFF"}
                  onStatusUpdated={(id, newStatus) => {
                    setTickets((prev) =>
                      prev.map((t) =>
                        t.id === id ? { ...t, status: newStatus } : t
                      )
                    );
                  }}
                />
              ))
            ) : (
              <p className="text-gray-500">No tickets found.</p>
            )}
          </>
        )}
      </div>
    </>
  );
}
