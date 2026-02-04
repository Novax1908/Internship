# Task Management API

> **Backend Developer Internship Assignment** – Demonstrates secure authentication, role-based access control, and CRUD operations with a simple frontend integration.

---

## 🚀 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Token)
- **Security:** bcrypt for password hashing
- **Tools:** Postman, MongoDB Compass

### Frontend (Basic)
- **Framework:** React
- **Purpose:** API interaction and demonstration

---

## 📌 Features

### ✅ Backend (Primary Focus)
- 🔐 User Registration & Login
- 🔒 Password hashing using bcrypt
- 🎫 JWT-based authentication
- 👥 Role-based access control (User / Admin)
- ✏️ CRUD operations for Tasks
- ✔️ Input validation & error handling
- 📁 Modular project structure (routes, controllers, models, middleware)

### ✅ Frontend
- 📝 Register & Login UI
- 🛡️ Protected Dashboard
- ➕ Task creation & deletion
- 🔑 JWT stored and sent via headers

---

## 🔐 Authentication Flow

1. User registers via `/v1/api/auth/register`
2. User logs in via `/v1/api/auth/login`
3. Server returns a **JWT token**
4. Token must be sent in request headers for protected routes:
   ```
   Authorization: Bearer <JWT_TOKEN>
   ```

---

## 📂 Project Structure

```
backend/
│
├── controllers/
│   ├── authController.js      # Authentication logic
│   └── taskController.js      # Task management logic
│
├── middleware/
│   └── authMiddleware.js      # JWT verification & role checks
|   └── adminMiddleware.js      # Admin verification
│
├── models/
│   ├── User.js                # User schema
│   └── Task.js                # Task schema
│
├── routes/
│   ├── authRoutes.js          # Auth endpoints
│   └── taskRoutes.js          # Task endpoints
│
├── .env                       # Environment variables
├── server.js                  # Entry point
└── package.json               # Dependencies
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-management
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the server**
   ```bash
   # Development mode with nodemon
   nodemon server.js
   
   # Or production mode
   node server.js
   ```

6. **Server should be running on**
   ```
   http://localhost:5000
   ```

---

## 📦 API Endpoints

### 🔐 Authentication Routes

#### Register User
**POST** `/v1/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user"
}
```

**Response:**
```json
{
  "status": true,
  "message": "User registered successfully"
}
```

---

#### Login User
**POST** `/v1/api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Login successful",
  "token": "<JWT_TOKEN>",
  "role": "user"
}
```

---

### 📋 Task Routes (Protected)

> **Note:** All task routes require JWT token in headers.

#### Create Task
**POST** `/v1/api/tasks/create`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Complete internship assignment"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Task created successfully",
  "data": {
    "_id": "...",
    "title": "Complete internship assignment",
    "user": "...",
    "createdAt": "..."
  }
}
```

---

#### Get Tasks
**GET** `/v1/api/tasks`

**Headers:**
```
Authorization: Bearer <token>
```

**Role-based Behavior:**
- **User:** Can see only their own tasks
- **Admin:** Can see tasks of all users

**Response:**
```json
{
  "status": true,
  "message": "Tasks fetched successfully",
  "data": [
    {
      "_id": "...",
      "title": "Complete internship assignment",
      "user": "...",
      "createdAt": "..."
    }
  ]
}
```

---

#### Delete Task
**DELETE** `/v1/api/tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Rules:**
- User can delete only their own tasks
- Admin can delete any task

**Response:**
```json
{
  "status": true,
  "message": "Task deleted successfully"
}
```

---

## 🧪 Testing the API

### Using Postman

1. **Start MongoDB** (local or ensure Atlas connection is active)

2. **Run the backend server:**
   ```bash
   nodemon server.js
   ```

3. **Import the API endpoints into Postman** or test manually:
   - Register a new user
   - Login to get JWT token
   - Copy the token
   - Add token to Authorization header for protected routes
   - Test CRUD operations on tasks

### Sample Postman Collection Structure
```
Task Management API
├── Auth
│   ├── Register User
│   └── Login User
└── Tasks (Protected)
    ├── Create Task
    ├── Get All Tasks
    └── Delete Task
```

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Protected routes with middleware
- ✅ Role-based access control
- ✅ Input validation and sanitization
- ✅ Error handling and proper status codes

---

## 👥 User Roles

### User
- Can create tasks
- Can view their own tasks
- Can delete their own tasks

### Admin
- Can view all users' tasks
- Can delete any task
- Has full access to all resources

---

## 🐛 Error Handling

The API returns consistent error responses:

```json
{
  "status": false,
  "message": "Error description here"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/task-management` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `NODE_ENV` | Environment mode | `development` or `production` |

---

