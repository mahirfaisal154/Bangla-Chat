# 🛍️ Bengle Mart — Full-Stack MERN E-Commerce Application

A feature-rich, production-ready e-commerce platform built with the **MERN stack** (MongoDB, Express, React, Node.js). It supports secure user authentication, persistent cart management, product browsing by category, and an integrated admin panel for inventory and order management — all deployed as a single service on Render.

🌐 **Live Demo:** [https://bengle-mart.onrender.com](https://bengle-mart.onrender.com)
🛠️ **Admin Panel:** [https://bengle-mart.onrender.com/admin](https://bengle-mart.onrender.com/admin)

---

## ✨ Features

- **🔐 Secure Authentication & Authorization** — JWT-based auth with password hashing via bcrypt, protected API routes, and persistent login sessions.
- **🛒 Persistent Cart System** — Add and remove products with full backend sync. Cart data is saved to MongoDB and restored on every login.
- **📦 Product Management** — Browse products by category (Men, Women, Kids), view new collections, and explore popular items — all served from a live MongoDB database.
- **🖼️ Image Upload** — Admin can upload product images via Multer, stored and served directly from the backend.
- **🧑‍💼 Admin Panel** — A separate Vite-powered interface to add products, manage the product list, and view all customer orders with itemized totals.
- **📋 Customer Order Tracking** — Admin can see every customer's name, email, ordered items with images and prices, and total cost per order.
- **📱 Responsive Design** — Clean, modern UI that adapts across desktop and mobile devices.
- **🚀 Single-Service Deployment** — Frontend, Admin Panel, and Backend all served from one Render Web Service.

---

## 🛠️ Tech Stack

**Frontend** (`/frontend`)
- React 18 (Create React App)
- React Router v7 for navigation
- React Context API for global state (cart, products)
- CSS3 with responsive media queries

**Admin Panel** (`/admin`)
- React 19 + Vite
- React Router v7
- Served at the `/admin` route in production

**Backend** (`/backend`)
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for password hashing
- Multer for image file uploads
- CORS middleware

---

## 📂 Project Structure

```
bengle-mart/
├── frontend/                   # React customer-facing storefront
│   └── src/
│       ├── component/          # Hero, Navbar, CartItems, ProductDisplay, Footer, etc.
│       ├── context/            # ShopContext — global cart & product state
│       └── pages/              # Shop, ShopCategory, Product, Cart, LoginSignup
│
├── admin/                      # Vite-powered admin panel
│   └── src/
│       └── Components/         # AddProduct, ListProduct, SeeOrders, Navbar, Sidebar
│
└── backend/                    # Express REST API
    ├── index.js                # Main server, all routes & schemas
    └── uploads/images/         # Uploaded product images
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB database (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/mahirfaisal154/Bengle-Mart.git
cd Bengle-Mart
```

### 2. Configure environment variables

Create a `.env` file inside the `backend` directory:
```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
BACKEND_URL=http://localhost:4000
PORT=4000
```

Create a `.env` file inside the `frontend` directory:
```env
REACT_APP_BACKEND_URL=http://localhost:4000
```

Create a `.env` file inside the `admin` directory:
```env
VITE_BACKEND_URL=http://localhost:4000
```

### 3. Install dependencies & run

**Backend:**
```bash
cd backend
npm install
node index.js
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**Admin Panel:**
```bash
cd admin
npm install
npm run dev
```

| Service      | URL                     |
|--------------|-------------------------|
| Frontend     | http://localhost:3000   |
| Admin Panel  | http://localhost:5173   |
| Backend API  | http://localhost:4000   |

---

## 🔑 API Overview

| Method | Endpoint            | Description                        | Auth Required |
|--------|---------------------|------------------------------------|---------------|
| POST   | `/signup`           | Register a new user                | ❌            |
| POST   | `/login`            | Authenticate and receive JWT token | ❌            |
| GET    | `/allproducts`      | Get all products                   | ❌            |
| GET    | `/newcollection`    | Get latest 8 products              | ❌            |
| GET    | `/popularinwomen`   | Get top 4 women's products         | ❌            |
| POST   | `/addproduct`       | Add a new product (admin)          | ❌            |
| POST   | `/removeproduct`    | Delete a product by ID (admin)     | ❌            |
| POST   | `/upload`           | Upload a product image (admin)     | ❌            |
| POST   | `/addtocart`        | Add item to user's cart            | ✅            |
| POST   | `/removefromcart`   | Remove item from user's cart       | ✅            |
| GET    | `/getcart`          | Fetch user's saved cart            | ✅            |
| GET    | `/allorders`        | Get all users' orders (admin)      | ❌            |

Protected routes require a valid `auth-token` header containing the JWT.

---

## ☁️ Deployment

The project is deployed as a **single Web Service** on Render. The Express backend serves both the React frontend build and the Vite admin build as static files.

| Field              | Value                                                                                                                       |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------|
| **Type**           | Web Service                                                                                                                 |
| **Build Command**  | `cd frontend && npm install && npm run build && cd ../admin && npm install && npm run build && cd ../backend && npm install` |
| **Start Command**  | `node backend/index.js`                                                                                                     |
| **Root Directory** | *(empty — repo root)*                                                                                                       |

**Environment variables on Render:**
```
MONGO_URI              = <your-mongodb-uri>
JWT_SECRET             = <your-secret>
BACKEND_URL            = https://bengle-mart.onrender.com
REACT_APP_BACKEND_URL  = https://bengle-mart.onrender.com
VITE_BACKEND_URL       = https://bengle-mart.onrender.com
```

---

## 📸 Preview

### 🏠 Storefront
![Home](https://github.com/mahirfaisal154/Bengle-Mart/blob/main/Images/Screenshot%202026-07-14%20210523.png?raw=true)
![New Collections](https://github.com/mahirfaisal154/Bengle-Mart/blob/main/Images/Screenshot%202026-07-14%20210538.png?raw=true)
![Category Page](https://github.com/mahirfaisal154/Bengle-Mart/blob/main/Images/Screenshot%202026-07-14%20210625.png?raw=true)

### 🛒 Product & Cart
![Product Detail](https://github.com/mahirfaisal154/Bengle-Mart/blob/main/Images/Screenshot%202026-07-14%20210644.png?raw=true)
![Cart](https://github.com/mahirfaisal154/Bengle-Mart/blob/main/Images/Screenshot%202026-07-14%20210658.png?raw=true)
![Checkout](https://github.com/mahirfaisal154/Bengle-Mart/blob/main/Images/Screenshot%202026-07-14%20210711.png?raw=true)

### 🧑‍💼 Admin Panel
![Add Product](https://github.com/mahirfaisal154/Bengle-Mart/blob/main/Images/Screenshot%202026-07-14%20211728.png?raw=true)
![Product List](https://github.com/mahirfaisal154/Bengle-Mart/blob/main/Images/Screenshot%202026-07-14%20211748.png?raw=true)
![Customer Orders](https://github.com/mahirfaisal154/Bengle-Mart/blob/main/Images/Screenshot%202026-07-14%20211758.png?raw=true)

---

## 📄 License

This project is licensed under the ISC License.
