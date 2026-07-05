# 🛒 Retail Inventory Management System

A full-stack Retail Inventory Management System built using **React, Node.js, Express, PostgreSQL, Drizzle ORM, and JWT Authentication**. The application helps manage customers, inventory items, billing, and invoice generation with a modern user interface.

---

## 📌 Features

### 🔐 Authentication
- JWT-based Login Authentication
- Protected Routes
- Secure API Access
- Logout Functionality

### 👥 Customer Management
- Add Customer
- View Customers
- Update Customer
- Delete Customer
- Search Customers

### 📦 Item Management
- Add Item
- View Items
- Update Item
- Delete Item
- Search Items
- Stock Management

### 🧾 Billing
- Generate Bills
- Select Customer
- Add Multiple Items
- Automatic Total Calculation
- Stock Validation
- Stock Auto Update after Billing

### 📄 Bill History
- View Billing History
- Search Bills
- Invoice Preview
- Print Invoice
- Delete Bills

### 📊 Dashboard
- Total Customers
- Total Items
- Total Bills
- Total Revenue
- Latest Bills Overview

---

# 🛠 Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Ant Design
- Axios
- React Router

## Backend
- Node.js
- Express.js
- TypeScript
- Drizzle ORM
- PostgreSQL
- JWT Authentication
- bcrypt

---

# 📂 Project Structure

```
Retail-Inventory-Management-System
│
├── client
│   ├── src
│   ├── public
│   ├── package.json
│
├── server
│   ├── src
│   ├── drizzle
│   ├── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/PurnachandT/Retail-Inventory-Management-System.git
```

```
cd Retail-Inventory-Management-System
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Install Backend

```bash
cd ../server
npm install
```

---

# ⚙ Environment Variables

Create a `.env` file inside the **server** directory.

Example:

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_jwt_secret
```

---

# ▶ Run Backend

```bash
cd server
npm run dev
```

Backend runs at:

```
http://localhost:5000
```

---

# ▶ Run Frontend

```bash
cd client
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# 🗄 Database

Database used:

- PostgreSQL

ORM:

- Drizzle ORM

---

# 🔑 Authentication

The application uses JWT Authentication.

After successful login:

- JWT Token is generated.
- Token is stored in Local Storage.
- Protected APIs validate the token before processing requests.

---

# 📷 Screens

- Login
- Dashboard
- Customer Management
- Item Management
- Billing
- Bill History

---
