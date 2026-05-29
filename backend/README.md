# Task Management Application Backend

This is the production-ready REST API backend for the **Task Management Application**. Built with **Node.js**, **Express.js**, **MongoDB Atlas (via Mongoose)**, and **JSON Web Token (JWT) Authentication**.

It uses modern ES Modules (`"type": "module"`) for clean JavaScript syntax and a modular, scalable architecture.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database ORM**: Mongoose
- **Database**: MongoDB Atlas
- **Authentication**: JWT & `bcryptjs` for secure password hashing
- **Environment**: `dotenv` for configuration
- **CORS Support**: `cors` package enabled for seamless frontend integration

---

## Folder Structure

```text
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # User Register & Login controllers
│   └── taskController.js     # Task CRUD controllers with ownership check
├── middleware/
│   ├── authMiddleware.js     # JWT extraction & authentication check
│   └── errorMiddleware.js    # Centralized Express error handler
├── models/
│   ├── User.js               # Mongoose schema for User + password pre-save hash
│   └── Task.js               # Mongoose schema for Task + field bounds
├── routes/
│   ├── authRoutes.js         # Routes under /api/auth
│   └── taskRoutes.js         # Protected routes under /api/tasks
├── .env.example              # Template environmental configuration
├── package.json              # Project dependencies & scripts
├── server.js                 # App entry point
└── README.md                 # Setup and documentation
```

---

## Prerequisites

- **Node.js** (v16.x or higher recommended)
- **npm** (v7.x or higher)
- **MongoDB Atlas Connection URI**

---

## Quick Start

### 1. Install Dependencies
Navigate into the `backend` directory and run:
```bash
npm install
```

### 2. Configure Environment Variables
Create a file named `.env` in the root of the `backend/` folder:
```bash
cp .env.example .env
```
Open `.env` and fill in your connection details:
```ini
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_signing_key_here
```

### 3. Start Development Server
To launch with `nodemon` (hot-reloading enabled):
```bash
npm run dev
```

### 4. Start Production Server
```bash
npm start
```

---

## API Design Specifications

All response payloads conform strictly to the following standards:

### Standard Success Response Format
```json
{
  "success": true,
  "message": "Operation description string",
  "data": {} // or [] for arrays
}
```

### Standard Error Response Format
```json
{
  "success": false,
  "message": "Detailed error message"
}
```

---

## API Endpoints

### 1. Authentication (`/api/auth`)

#### Register User
* **URL**: `/api/auth/register`
* **Method**: `POST`
* **Access**: Public
* **Payload**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "supersecurepassword"
  }
  ```
* **Success Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "_id": "64bf87ad7e7...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5..."
    }
  }
  ```

#### Login User
* **URL**: `/api/auth/login`
* **Method**: `POST`
* **Access**: Public
* **Payload**:
  ```json
  {
    "email": "jane@example.com",
    "password": "supersecurepassword"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "_id": "64bf87ad7e7...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5..."
    }
  }
  ```

---

### 2. Task Management (`/api/tasks`)

> **Note**: All routes listed below are **Private** and require the HTTP header:
> `Authorization: Bearer <your_jwt_token>`

#### Get All Tasks
* **URL**: `/api/tasks`
* **Method**: `GET`
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Tasks retrieved successfully",
    "data": [
      {
        "_id": "64bf8bc17e7...",
        "title": "Complete project documentation",
        "description": "Write and structure detailed README file",
        "status": "In Progress",
        "priority": "High",
        "dueDate": "2026-06-15T00:00:00.000Z",
        "user": "64bf87ad7e7...",
        "createdAt": "2026-05-29T11:00:00.000Z",
        "updatedAt": "2026-05-29T11:00:00.000Z"
      }
    ]
  }
  ```

#### Get Task By ID
* **URL**: `/api/tasks/:id`
* **Method**: `GET`
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Task retrieved successfully",
    "data": {
      "_id": "64bf8bc17e7...",
      "title": "Complete project documentation",
      "description": "Write and structure detailed README file",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2026-06-15T00:00:00.000Z",
      "user": "64bf87ad7e7..."
    }
  }
  ```

#### Create a Task
* **URL**: `/api/tasks`
* **Method**: `POST`
* **Payload**:
  ```json
  {
    "title": "Build backend endpoints",
    "description": "Establish auth and task controllers",
    "status": "Pending",
    "priority": "High",
    "dueDate": "2026-06-10T00:00:00.000Z"
  }
  ```
* **Success Response (210 Created)**:
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": {
      "_id": "64bf8de97e7...",
      "title": "Build backend endpoints",
      "description": "Establish auth and task controllers",
      "status": "Pending",
      "priority": "High",
      "dueDate": "2026-06-10T00:00:00.000Z",
      "user": "64bf87ad7e7..."
    }
  }
  ```

#### Update Task
* **URL**: `/api/tasks/:id`
* **Method**: `PUT`
* **Payload** (Any combination of fields):
  ```json
  {
    "status": "Completed",
    "priority": "Medium"
  }
  ```
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Task updated successfully",
    "data": {
      "_id": "64bf8de97e7...",
      "title": "Build backend endpoints",
      "description": "Establish auth and task controllers",
      "status": "Completed",
      "priority": "Medium",
      "dueDate": "2026-06-10T00:00:00.000Z",
      "user": "64bf87ad7e7..."
    }
  }
  ```

#### Delete Task
* **URL**: `/api/tasks/:id`
* **Method**: `DELETE`
* **Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Task deleted successfully",
    "data": null
  }
  ```

---

## Authorization & Security

1. **Password Hashing**: Done transparently within the Mongoose pre-save hooks using `bcryptjs` salts.
2. **Access Control**: Users can only request, modify, or delete tasks belonging directly to their own account. Attempting to retrieve, edit, or delete another user's task yields a `403 Forbidden` or `404 Not Found` response.
