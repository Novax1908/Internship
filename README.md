

> **Backend Developer Internship Assignment** – A production-ready full-stack application demonstrating modern web development practices.

---

## 🗂 Project Structure

```
task-management-app/
│
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── .env
│
├── backend/                     # Node.js + Express backend
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── taskController.js    # Task management logic
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT verification & role checks
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Task.js              # Task schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── taskRoutes.js        # Task endpoints
│   ├── server.js                # Entry point
│   ├── package.json
│   └── .env
│
└── README.md                    # This file
```

---

## ⚡ Features

### 🎨 Frontend Features
- ✅ User authentication (Login/Register)
- ✅ Role-based UI display (User vs Admin)
- ✅ Interactive Dashboard with task management:
  - ➕ Add new tasks
  - 🗑️ Delete tasks
  - 👁️ View all tasks from backend
- ✅ Protected routes with navigation guards
- ✅ JWT token management via localStorage
- ✅ Clean, modern UI with dark theme
- ✅ Real-time task updates
- ✅ Secure logout functionality

### 🔧 Backend Features
- ✅ RESTful API architecture
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (User/Admin)
- ✅ MongoDB database with Mongoose ODM
- ✅ Input validation & error handling
- ✅ CORS enabled for frontend communication
- ✅ Modular code structure
- ✅ Environment variable configuration

### 🔐 API Endpoints

#### Authentication
- `POST /v1/api/auth/register` → Register new user
- `POST /v1/api/auth/login` → User login

#### Tasks (Protected)
- `GET /v1/api/tasks` → Get all tasks (role-based)
- `POST /v1/api/tasks/create` → Create new task
- `DELETE /v1/api/tasks/:id` → Delete task

#### Admin Only
- `GET /v1/api/users` → Get all users (admin only)

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| React Router | Navigation & routing |
| JavaScript (ES6+) | Programming language |
| CSS3 | Styling |
| Fetch API | HTTP requests |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| dotenv | Environment variables |
| cors | Cross-origin requests |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** (optional, for cloning)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd task-management-app
```

---

### 2️⃣ Backend Setup

#### Step 1: Navigate to backend folder
```bash
cd backend
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Configure environment variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/task-management
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/task-management

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# CORS (Optional)
CLIENT_URL=http://localhost:3000
```

#### Step 4: Start MongoDB

**If using local MongoDB:**
```bash
mongod
```

**If using MongoDB Atlas:**
- Ensure your connection string is correct in `.env`
- Whitelist your IP address in MongoDB Atlas

#### Step 5: Run the backend server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

✅ **Backend should now be running on:** `http://localhost:5000`

---

### 3️⃣ Frontend Setup

#### Step 1: Open a new terminal and navigate to frontend folder
```bash
cd frontend
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Configure environment variables

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/v1/api
```

#### Step 4: Start the frontend development server

```bash
npm start
```

✅ **Frontend should now be running on:** `http://localhost:3000`

The application will automatically open in your default browser!

---

## 📱 Using the Application

### First-Time Setup

1. **Register a New User**
   - Navigate to `http://localhost:3000`
   - Click on "Register" (or navigate to `/register`)
   - Fill in your details:
     - Name
     - Email
     - Password
     - Role (user/admin)
   - Click "Register"

2. **Login**
   - Use your registered credentials
   - Click "Login"
   - You'll be redirected to the Dashboard

3. **Manage Tasks**
   - **Add Task:** Type in the input box and click "Add"
   - **Delete Task:** Click the "✕" button next to any task
   - **View Tasks:** All your tasks are displayed automatically

4. **Logout**
   - Click the "Logout" button to end your session

---

## 🔒 User Roles & Permissions

### 👤 Regular User
- ✅ Can create tasks
- ✅ Can view their own tasks
- ✅ Can delete their own tasks
- ❌ Cannot view other users' tasks
- ❌ Cannot access admin routes

### 👑 Admin
- ✅ All user permissions
- ✅ Can view all users' tasks
- ✅ Can delete any task
- ✅ Can access user management endpoints

---

## 🧪 Testing the Application

### Testing with Sample Data

1. **Create a User Account:**
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123",
     "role": "user"
   }
   ```

2. **Create an Admin Account:**
   ```json
   {
     "name": "Admin User",
     "email": "admin@example.com",
     "password": "admin123",
     "role": "admin"
   }
   ```

3. **Test Task Operations:**
   - Login as a user
   - Create multiple tasks
   - Delete tasks
   - Logout and login as admin
   - Verify admin can see all tasks

### API Testing with Postman

Import these endpoints into Postman:

```
POST http://localhost:5000/v1/api/auth/register
POST http://localhost:5000/v1/api/auth/login
GET http://localhost:5000/v1/api/tasks
POST http://localhost:5000/v1/api/tasks/create
DELETE http://localhost:5000/v1/api/tasks/:id
```

Don't forget to add the JWT token in headers for protected routes:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### ❌ Backend won't start
- **Check if MongoDB is running:** `mongod` or verify Atlas connection
- **Verify `.env` file exists** in backend folder
- **Check if port 5000 is available:** Try changing PORT in `.env`

#### ❌ Frontend can't connect to backend
- **Verify backend is running** on `http://localhost:5000`
- **Check CORS configuration** in backend
- **Verify `REACT_APP_API_URL`** in frontend `.env` file
- **Clear browser cache** and restart frontend

#### ❌ Tasks not showing after creation
- **Open browser console** (F12) and check for errors
- **Verify API response structure** matches frontend expectations
- **Check network tab** to see API responses
- **Ensure JWT token is valid** and being sent in headers

#### ❌ "Network Error" or CORS issues
- **Install cors package** in backend: `npm install cors`
- **Enable CORS** in `server.js`:
  ```javascript
  const cors = require('cors');
  app.use(cors());
  ```

#### ❌ MongoDB Connection Failed
- **Local MongoDB:** Start with `mongod` command
- **Atlas:** Check connection string, username, password, and IP whitelist

---

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "nodemon": "^3.0.1"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0"
}
```

---

## 📄 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /v1/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
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

#### Login User
```http
POST /v1/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "status": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Task Endpoints (Protected)

#### Create Task
```http
POST /v1/api/tasks/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete internship assignment"
}
```

#### Get All Tasks
```http
GET /v1/api/tasks
Authorization: Bearer <token>
```

#### Delete Task
```http
DELETE /v1/api/tasks/:id
Authorization: Bearer <token>
```

---

## 🔐 Security Features

- ✅ **Password Hashing:** bcrypt with 10 salt rounds
- ✅ **JWT Authentication:** Secure token-based auth
- ✅ **Protected Routes:** Middleware validation
- ✅ **Role-Based Access:** User vs Admin permissions
- ✅ **Input Validation:** Request body validation
- ✅ **CORS Protection:** Controlled cross-origin requests
- ✅ **Environment Variables:** Sensitive data protection

---

