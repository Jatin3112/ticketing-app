```markdown
# 🎫 Simplified Ticketing System

A full-stack, role‑based ticketing application with email‑to‑ticket support.

- **Backend**: Node.js, Express, Prisma, MySQL, JWT
- **Frontend**: React (Vite), TailwindCSS, React Router, Axios

---

## 🚀 Features

- **User Authentication**
  - Sign up & log in with JWT
  - Two roles: `USER` (can create & view own tickets) and `STAFF` (can view/update all tickets, reply, and manage users)
- **Ticket Management**
  - Create, list, delete tickets
  - `STAFF` can toggle ticket status (OPEN ↔ CLOSED)
  - Email‑to‑ticket webhook
- **Reply System**
  - `STAFF` can post replies on tickets
- **User Administration**
  - `STAFF` can view all users and promote/demote roles
- **Robust API** with centralized error handling and consistent `ApiResponse` format

---
```

---

## ⚙️ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your‐username/ticketing-app.git
cd ticketing-app/backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment

- **Backend** (`backend/.env`):

  ```env
  DATABASE_URL="mysql://username:password@localhost:3306/ticketing_app"
  PORT=8080
  JWT_SECRET=<your-secret>
  CORS_ORIGIN=http://localhost:5173
  EMAIL_WEBHOOK_TOKEN=<optional-token>
  ```

- **Frontend** (`frontend/.env`):

  ```env
  VITE_API_URL=http://localhost:8080/api
  ```

### 3. Initialize Database & Seed Admin

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
node seeding/createAdmin.js
```

### 4. Run Both Apps

```bash
# In one terminal
cd backend && npm run dev

# In another
cd frontend && npm run dev
```

- Backend: `http://localhost:8080`
- Frontend: `http://localhost:5173`

---

## 📬 Email‑to‑Ticket Webhook

1. **Expose** `POST /api/email-webhook`
2. **Secure** with `X-Webhook-Token` or provider signature
3. **Parse** payload: `{ from, subject, text }`
4. **Lookup/Create** user by `from` address
5. **Create** ticket in DB via Prisma

```js
await prisma.ticket.create({
  data: { title: subject, description: text, userId: user.id },
});
```

---

## 📮 API Overview

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Tickets

- `GET /api/tickets`
- `POST /api/tickets`
- `DELETE /api/tickets/:id`
- `PATCH /api/tickets/:id/status`

### Replies

- `POST /api/replyTickets/:ticketId/replies`

### Users

- `GET /api/users`
- `GET /api/users/me`
- `PATCH /api/users/:id/role`

### Webhook

- `POST /api/email-webhook`

---
