# 📌 Smart Attendance Platform

## 🎯 Seamless, Secure & Effortless Attendance Tracking
A modern attendance tracking system with role-based authentication, dynamic dashboard, and CRUD operations for managing students, teachers, and subjects efficiently.

---

## 🚀 Features
✅ **Role-Based Authentication** (Admin, Class Incharge, Clerk)  
✅ **Dynamic Dashboard** with tabs for Overview, Reports, Students, Subjects, and Teachers  
✅ **CRUD Operations** for managing teachers, students, and subjects  
✅ **Secure JWT Authentication** with role-based routing  
✅ **ShadCN UI Components** for a clean and responsive design  
✅ **MongoDB Database** (Using a free-tier cluster)  
✅ **Server-Side & Client-Side Rendering** for optimized performance  

---

## 📁 Project Structure
```
📦 smart-attendance-platform
 ┣ 📂 backend (Express.js API)
 ┃ ┣ 📂 controllers
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┣ 📂 middleware
 ┃ ┣ 📜 server.js
 ┃ ┗ 📜 config.js
 ┃
 ┣ 📂 frontend (Next.js App Router)
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 (auth)
 ┃ ┃ ┃ ┗ 📜 login/page.jsx
 ┃ ┃ ┣ 📂 (dashboard)
 ┃ ┃ ┃ ┣ 📂 admin
 ┃ ┃ ┃ ┣ 📂 classincharge
 ┃ ┃ ┃ ┣ 📂 clerk
 ┃ ┃ ┃ ┗ 📜 layout.jsx
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 hooks
 ┃ ┃ ┣ 📂 utils
 ┃ ┃ ┗ 📜 page.jsx
 ┗ 📜 README.md
```

---

## 🛠️ Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, ShadCN UI
- **Backend**: Express.js, MongoDB, JWT Authentication
- **State Management**: URL params (query state management)
- **Database**: MongoDB (Mongoose ORM)

---

## 🚀 Installation & Setup
### 🔹 Backend (Express.js API)
```sh
cd backend
npm install
npm start
```
> Runs the backend server on `http://localhost:3002`

### 🔹 Frontend (Next.js App)
```sh
cd frontend
npm install
npm run dev
```
> Runs the frontend on `http://localhost:3000`

---

## 🔑 Role-Based Access
| Role         | Access Rights |
|-------------|--------------|
| **Admin** | Full access (Manage Teachers, Students, Subjects, Reports) |
| **Class Incharge** | Can manage students & view reports |
| **Clerk** | Can view attendance reports |

---

## 📌 API Endpoints (Backend)
### 🔹 Authentication
- `POST /api/v1/auth/login` → User Login (JWT Token)
- `GET /api/v1/user/profile` → Get user profile info

### 🔹 Teachers CRUD
- `GET /api/v1/teachers` → Fetch all teachers
- `POST /api/v1/teachers` → Add a new teacher
- `PUT /api/v1/teachers/:id` → Update teacher details
- `DELETE /api/v1/teachers/:id` → Remove teacher

---

## 🎨 UI Preview
![Dashboard Preview](https://via.placeholder.com/1000x500?text=Dashboard+Preview)

---

## 🤝 Contributing
Feel free to contribute! Open an issue or submit a pull request. 😊

---

## 📜 License
MIT License © 2025 Smart Attendance Platform

---

**🚀 Happy Coding!** 🎉

