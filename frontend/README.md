Here's a complete `README.md` file for your **Frontend** (React + Vite + TailwindCSS) part of the Ticketing System:

---

```md
# 🎫 Ticketing System Frontend

This is the **frontend client** for the role-based Ticketing System built with **React**, **Vite**, **TailwindCSS**, and **React Router DOM**. It connects to the backend API to allow users to log in, create and view tickets, and for staff to manage tickets and user roles.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Login/Signup)
- 🧾 Create and view personal tickets
- 🛠️ Staff can:
  - View all tickets
  - Update ticket status (Open/Closed)
  - Reply to tickets
  - Manage users and their roles
- ⚡ TailwindCSS for sleek responsive UI
- 🗂️ React Router for navigation

---

## 🧱 Tech Stack

- **Framework**: React (via Vite)
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **API**: Axios

---

## 📁 Folder Structure
```

ticketing-app-frontend/
├── public/
├── src/
│ ├── components/ # Reusable UI components (Navbar, TicketCard, etc.)
│ ├── pages/ # Pages like Login, Signup, Dashboard
│ ├── api.js # Axios instance
│ ├── App.jsx # App entry with router
│ ├── main.jsx # Main render file
│
├── .env # Frontend env variables
├── index.html # Vite entry
├── package.json
└── README.md

````

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ticketing-app-frontend.git
cd ticketing-app-frontend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080/api
```

> Ensure it matches your backend CORS origin and runs on the correct port.

---

## 🧪 Running the App

```bash
npm run dev
```

Your frontend will be running on: `http://localhost:5173`

---

## 🧭 Routing Pages

| Path         | Description                          |
| ------------ | ------------------------------------ |
| `/login`     | Login screen                         |
| `/signup`    | Signup screen                        |
| `/dashboard` | Authenticated dashboard (role-based) |

---

## 📌 Key Components

### 🧩 `Login.jsx`

- Login form with JWT token storage
- Redirects to dashboard on success

### 🧩 `Signup.jsx`

- Signup form
- Redirects to login after success

### 🧩 `Dashboard.jsx`

- Shows different content for `USER` and `STAFF`
- Lists tickets, allows ticket creation, reply (STAFF), and user management

### 🧩 `TicketCard.jsx`

- Displays each ticket with:

  - Status badge
  - Replies list
  - Reply input (STAFF only)
  - Status toggle button (STAFF only)

---

## 🔒 Authentication

- Token stored in `localStorage`
- Sent via `Authorization: Bearer <token>` in headers using Axios

---

## ✨ Styling

TailwindCSS used across the app. You can easily customize styling inside `tailwind.config.js`.

---
