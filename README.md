# Task Management Application

A full-stack Task Management Application built with React, Node.js, Express, MongoDB, and JWT Authentication.

Live Project Link : https://task-management-application-eojzwmewd.vercel.app/login
## Features

* User Registration & Login
* JWT Authentication
* Create, Read, Update, and Delete Tasks
* Task Status & Priority Management
* Protected Routes
* Responsive UI
* MongoDB Atlas Integration

## Tech Stack

### Frontend

* React
* React Router
* Axios
* Context API
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

## Project Structure

```text
task-management/
├── frontend/
│   ├── src/
│   └── public/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
└── README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd task-management
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication

* POST `/api/auth/register`
* POST `/api/auth/login`

### Tasks

* GET `/api/tasks`
* GET `/api/tasks/:id`
* POST `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`
