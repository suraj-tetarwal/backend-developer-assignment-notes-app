# Role-Based Notes Management System

A scalable REST API with JWT authentication and role-based access control, along with a simple React frontend to demonstrate full CRUD operations.

---

## 🚀 Features

### Backend
- User Registration & Login (JWT Authentication)
- Password Hashing using bcrypt
- Role-Based Access Control (USER / ADMIN)
- Full CRUD for Notes
- API Versioning (`/api/v1`)
- Centralized Error Handling
- Input Validation
- MySQL Database with Sequelize ORM

### Frontend
- Register & Login UI
- Protected Dashboard (JWT Required)
- Create, View, Update, Delete Notes
- Modal View for Note Details
- Logout Functionality

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT
- bcrypt

### Frontend
- React (Class Components)
- Fetch API
- CSS

---

## 📂 Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd backend
```

### 2. Install Backend Dependencies

```
npm install
```

### 3. Create .env File in Backend

```
PORT=3000
DB_NAME=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_DIALECT=mysql
JWT_SECRET_KEY=your_secret_key
JWT_EXPIRES_IN=1d
```

### 4. Run Migrations

```
npx sequelize db:migrate
```

### 5. Start Backend

```
npm start
```

### 6. Start Frontend

```
cd ../frontend
npm install
npm start
```

## API Endpoints

### Auth

- POST /api/v1/auth/register

- POST /api/v1/auth/login

### Notes

- GET /api/v1/notes

- GET /api/v1/notes/:id

- POST /api/v1/notes

- PUT /api/v1/notes/:id

- DELETE /api/v1/notes/:id

## API Documentation

Postman collection is included in:
```
Notes App.postman_collection.json
```

## Scalability Considerations

- Modular architecture for easy expansion

- Stateless JWT authentication supports horizontal scaling

- Database indexing improves query performance

- Can integrate Redis for caching

- Suitable for containerization (Docker)

- Can be extended into microservices (Auth Service + Notes Service)

- Ready for deployment behind load balancer
