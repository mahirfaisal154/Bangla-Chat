# 💬 ChitChat — Real-Time MERN Chat Application

A full-stack real-time messaging application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO**. It supports secure authentication, instant one-on-one messaging, image sharing, live online-user presence, and a fully themeable UI.

---

## ✨ Features

- **🔐 Secure Authentication & Authorization** — JWT-based auth stored in HTTP-only cookies, with password hashing via bcrypt and protected API routes.
- **⚡ Real-Time Messaging** — Instant message delivery powered by Socket.IO, with no page refresh required.
- **🟢 Live Online Presence** — See which contacts are currently online, updated in real time as users connect and disconnect.
- **🖼️ Image Sharing** — Upload and send images in chat, hosted via Cloudinary.
- **👤 User Profiles** — Update profile details and profile picture.
- **🎨 Theme Switching** — Choose from a wide range of UI themes (powered by TailwindCSS + DaisyUI), with the preference persisted across sessions.
- **📱 Responsive UI** — Clean, modern interface that works smoothly across devices, complete with loading skeletons and toast notifications.

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + Vite
- Zustand for state management
- TailwindCSS + DaisyUI for styling and theming
- React Router for navigation
- Axios for API requests
- Socket.IO Client for real-time communication
- React Hot Toast for notifications
- Lucide React for icons

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- Socket.IO for WebSocket communication
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for password hashing
- Cloudinary for image storage
- Cookie-parser & CORS middleware

---

## 📂 Project Structure

```
chat application/
├── Client/          # React frontend (Vite)
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Route-level pages (Home, Login, SignUp, Profile, Settings)
│       ├── store/        # Zustand stores (auth, chat, theme)
│       └── lib/          # Axios instance & helper utilities
└── Server/          # Express + Socket.IO backend
    └── src/
        ├── controllers/  # Route handlers (auth, messages)
        ├── models/       # Mongoose schemas (User, Message)
        ├── routes/       # API route definitions
        ├── middleware/   # Auth middleware (JWT verification)
        └── lib/          # DB connection, Socket.IO setup, Cloudinary, utils
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB database (local or Atlas)
- A Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone <repository-url>
cd "chat application"
```

### 2. Configure environment variables
Create a `.env` file inside the `Server` directory with the following keys:

```
PORT=5001
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
NODE_ENV=development
```

### 3. Install dependencies
```bash
npm run build
```
*(installs dependencies for both Client and Server, and builds the client for production)*

Or install separately for development:
```bash
cd Server && npm install
cd ../Client && npm install
```

### 4. Run the application

**Backend** (from the `Server` directory):
```bash
npm run dev
```

**Frontend** (from the `Client` directory):
```bash
npm run dev
```

The client runs on `http://localhost:5173` and connects to the API/Socket.IO server on the configured `PORT`.

---

## 🔑 API Overview

| Method | Endpoint                          | Description                          |
|--------|-----------------------------------|--------------------------------------|
| POST   | `/api/auth/signup`                | Register a new user                  |
| POST   | `/api/auth/login`                 | Authenticate and receive a session   |
| POST   | `/api/auth/logout`                | End the current session              |
| PUT    | `/api/auth/update-profile`        | Update profile picture / details     |
| GET    | `/api/auth/check`                 | Verify current authentication status |
| GET    | `/api/messages/users`             | Get list of chat contacts            |
| GET    | `/api/messages/:id`               | Get conversation with a user         |
| POST   | `/api/messages/send/:id`          | Send a text/image message            |

All `/api/messages/*` routes are protected and require a valid authenticated session.

---

## 🌐 Real-Time Communication

The app uses **Socket.IO** to:
- Broadcast new messages to the recipient instantly
- Track and emit the list of currently online users (`getOnlineUsers`)
- Maintain a live `userId → socketId` mapping for targeted message delivery

---

## 📸 Preview

> _Add screenshots or a demo GIF of the login page, chat interface, and theme switcher here to showcase the UI._

---

## 📄 License

This project is licensed under the ISC License.
