Sure! Here's the **entire README as a single Markdown file** (`README.md`) for your **Ticketing System Backend** project:

---

```md
# 🎫 Ticketing System Backend

This is the backend server for a **role-based ticketing system**, built with **Node.js**, **Express**, **Prisma ORM**, and **MySQL**. It supports user authentication, ticket creation, ticket replies by staff, and role management.

---

## 🚀 Features

- ✅ User authentication (signup/login)
- 🧾 Ticket creation and listing (users see their own; staff sees all)
- 🎯 Ticket status updates (STAFF only)
- 💬 Staff can reply to tickets
- 🔐 Role-based access (USER / STAFF)
- 👤 Admin can view/update user roles
- 📄 Structured API responses and error handling

---

## 🧱 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Prisma
- **Auth**: JWT
- **Middleware**: Express Middlewares (Auth, RBAC)
- **Extras**: bcrypt, dotenv, CORS

---

## 📁 Folder Structure
```

ticketing-app-backend/
├── src/
│ ├── config/ # Prisma config
│ ├── controllers/ # Route handlers
│ ├── middlewares/ # Auth and role access
│ ├── routes/ # Route definitions
│ ├── utils/ # APIError and APIResponse classes
│
├── prisma/
│ └── schema.prisma # Prisma DB schema
│
├── seeding/
│ └── createAdmin.js # Seed a default admin user
│
├── .env # Environment variables
├── app.js # Express app instance
├── index.js # Entry point
└── README.md

````

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ticketing-app.git
cd ticketing-app/backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your `.env`

Create a `.env` file in the root directory and paste this:

```env
DATABASE_URL="mysql://username:password@localhost:3306/ticketing_app"
PORT=8080
JWT_SECRET=jwt_secret
CORS_ORIGIN=http://localhost:5173
```

### 4. Set up Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Seed the Admin User

```bash
node seeding/createAdmin.js
```

> This script creates a default `STAFF` admin user if not already present.

### 6. Run the backend

```bash
npm run dev
```

Backend will run on: `http://localhost:8080`

---

## 👤 Default Admin Credentials

| Username | Password   |
| -------- | ---------- |
| `admin`  | `admin123` |

---

## 🔑 Auth API Endpoints

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| POST   | `/api/auth/signup` | Register new user   |
| POST   | `/api/auth/login`  | Login and get token |

---

## 🎫 Ticket Endpoints

| Method | Endpoint                  | Access     | Description                        |
| ------ | ------------------------- | ---------- | ---------------------------------- |
| GET    | `/api/tickets`            | USER/STAFF | List tickets (own or all)          |
| POST   | `/api/tickets`            | USER/STAFF | Create a new ticket                |
| DELETE | `/api/tickets/:id`        | STAFF/user | Delete a ticket                    |
| PATCH  | `/api/tickets/:id/status` | STAFF      | Change ticket status (open/closed) |

---

## 💬 Replies Endpoints

| Method | Endpoint                              | Access | Description           |
| ------ | ------------------------------------- | ------ | --------------------- |
| POST   | `/api/replyTickets/:ticketId/replies` | STAFF  | Add reply to a ticket |

---

## 👥 Users API Endpoints

| Method | Endpoint              | Access | Description                |
| ------ | --------------------- | ------ | -------------------------- |
| GET    | `/api/users`          | STAFF  | List all users             |
| GET    | `/api/users/me`       | Auth   | Get current user + tickets |
| PATCH  | `/api/users/:id/role` | STAFF  | Promote/demote user role   |

---

## 🧪 Testing APIs with Postman

- Login → Get JWT token
- Use token in headers: `Authorization: Bearer <token>`
- Try ticket create, get, delete, reply endpoints
- Try updating user roles

---

## 📥 Seeding Admin

**File**: `seeding/createAdmin.js`

```js
// Run this with `node seeding/createAdmin.js`
```

> Ensures there's always a default STAFF/admin user in the system.

Sure! Here's a **simplified version** of the Email-to-Ticket feature for your README file:

---

### 📩 Email-to-Ticket Feature (Mock Setup for Assignment)

This project includes a mock feature where a support ticket can be created from an email.

#### 🔁 How It Works

1. A user sends an email (for example: to `support@example.com`).
2. A mock API endpoint receives this email as a POST request.
3. The backend reads the email sender, subject, and body.
4. It creates a ticket in the system with that info.

---

### 🔧 How to Test It (Manually)

You can simulate an incoming email using Postman or cURL.

#### ✅ Endpoint:

```
POST http://localhost:8080/api/email-webhook
```

#### 📨 Sample JSON body:

```json
{
  "from": "jatin@example.com",
  "subject": "Issue with login",
  "text": "I cannot log in to my account. Please help!"
}
```

#### 💡 What Happens:

- If the user doesn’t exist, they are created.
- A new ticket is added using the email's subject and body.

---

### 🚀 Note:

This is just a **mock setup for the assignment** — no actual email service is connected yet.

---
