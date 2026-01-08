# Judix Backend API

A scalable Node.js/Express backend application built with TypeScript, featuring JWT authentication, user management, and case management system designed for legal professionals.

## 🚀 Features

### ✅ Authentication & Authorization
- **JWT-based authentication** with secure token generation
- **Password hashing** using bcrypt for security
- **Protected routes** with authentication middleware
- **User registration and login** with validation

### ✅ User Management
- Complete CRUD operations for user profiles
- User profile fetching and updating
- Secure password handling
- Email-based user identification

### ✅ Case Management System
- **CRUD operations** for legal cases
- Case categorization (civil, criminal, contract, corporate, other)
- Status tracking (draft, active, closed)
- User-specific case management
- Client information management

### ✅ Security & Best Practices
- **Password hashing** with bcrypt
- **JWT token validation** middleware
- **Input validation** using express-validator
- **Error handling** with custom error classes
- **CORS configuration** for cross-origin requests
- **Structured logging** with Winston

## 🏗️ Project Structure

```
judix-backend/
├── src/
│   ├── config/             # Configuration files
│   │   ├── AppConfig.ts    # App & database connection
│   │   ├── CorsConfig.ts   # CORS configuration
│   │   ├── DotenvConfig.ts # Environment variables
│   │   └── Logger.ts       # Winston logger setup
│   ├── controllers/        # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── case.controller.ts
│   │   └── user.controller.ts
│   ├── db/                 # Database configuration
│   │   └── db.ts
│   ├── middlewares/        # Custom middleware
│   │   ├── auth.middleware.ts
│   │   ├── CustomErrorHandler.ts
│   │   └── validator.ts
│   ├── models/             # Mongoose models
│   │   ├── case.model.ts
│   │   └── user.model.ts
│   ├── routes/             # API routes
│   │   ├── authRouter.ts
│   │   ├── caseRouter.ts
│   │   ├── healthRouter.ts
│   │   └── userRouter.ts
│   ├── service/            # Business logic layer
│   │   ├── case.service.ts
│   │   └── user.service.ts
│   ├── types/              # TypeScript type definitions
│   │   ├── Case.type.ts
│   │   └── user.type.ts
│   ├── utils/              # Utility functions
│   │   ├── AppError.ts
│   │   ├── CustomTryCatch.ts
│   │   └── password.ts
│   ├── validators/         # Request validation schemas
│   │   ├── auth.validator.ts
│   │   ├── case.validator.ts
│   │   └── user.validator.ts
│   └── server.ts           # Application entry point
├── logs/                   # Application logs
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Logging**: Winston
- **CORS**: cors middleware

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/ShadowAdi/judix-backend.git
cd judix-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URL=mongodb://localhost:27017/judix-db

# JWT Configuration
JWT_KEY=your-super-secret-jwt-key

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### 4. Start the application

#### Development mode (with hot reload)
```bash
npm run dev
```

#### Production build
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Routes

#### POST `/auth/login`
Login user and get JWT token
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User Logged In Successfully",
  "token": "jwt-token-here"
}
```

### User Routes

#### POST `/user/register`
Create a new user account
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Optional bio"
}
```

#### GET `/user/profile`
Get user profile (requires authentication)
```
Headers: Authorization: Bearer <jwt-token>
```

#### GET `/user/all`
Get all users (requires authentication)

#### PUT `/user/update`
Update user profile (requires authentication)

### Case Management Routes

#### POST `/case/create`
Create a new case (requires authentication)
```json
{
  "title": "Contract Dispute Case",
  "description": "Description of the case",
  "clientName": "Client Name",
  "clientEmail": "client@example.com",
  "caseType": "contract",
  "status": "active"
}
```

#### GET `/case/all`
Get all cases

#### GET `/case/user`
Get cases created by authenticated user

#### GET `/case/:id`
Get specific case by ID

#### PUT `/case/update/:id`
Update case (requires authentication)

#### DELETE `/case/delete/:id`
Delete case (requires authentication)

### Health Check

#### GET `/health`
Check API health status

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 🗃️ Database Schema

### User Model
```typescript
{
  username: String (required, indexed)
  email: String (required, unique, lowercase)
  password: String (required, hashed)
  bio: String (optional)
  createdAt: Date
  updatedAt: Date
}
```

### Case Model
```typescript
{
  title: String (required, indexed)
  description: String
  clientName: String (required)
  clientEmail: String
  caseType: "civil" | "criminal" | "contract" | "corporate" | "other"
  status: "draft" | "active" | "closed"
  priority: "low" | "medium" | "high"
  assignedTo: ObjectId (User reference)
  createdAt: Date
  updatedAt: Date
}
```

## 🛡️ Security Features

- **Password Hashing**: All passwords are hashed using bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: All inputs are validated using express-validator
- **Error Handling**: Comprehensive error handling with custom error classes
- **CORS Protection**: Configured CORS for secure cross-origin requests
- **Request Logging**: All requests are logged for monitoring

## 📝 Logging

The application uses Winston for structured logging:
- **Log Files**: Stored in the `logs/` directory
- **Log Levels**: Error, Warning, Info, Debug
- **Log Rotation**: Automatic log file rotation

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (if configured)

### Code Structure Guidelines

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Models**: Database schema definitions
- **Middleware**: Custom middleware functions
- **Utils**: Helper functions and utilities
- **Validators**: Input validation schemas

## 🚀 Scaling for Production

### Recommended Scaling Strategies

1. **Database Optimization**
   - Add database indexes for frequently queried fields
   - Implement database connection pooling
   - Consider database replication for read scaling

2. **Caching**
   - Implement Redis for session storage
   - Add response caching for static data
   - Use CDN for static assets

3. **Security Enhancements**
   - Add rate limiting middleware
   - Implement request sanitization
   - Add security headers (helmet.js)
   - Set up SSL/TLS certificates

4. **Monitoring & Logging**
   - Implement application performance monitoring (APM)
   - Set up centralized logging
   - Add health check endpoints
   - Implement error tracking (Sentry)

5. **Deployment**
   - Containerize with Docker
   - Use process managers (PM2)
   - Implement CI/CD pipelines
   - Set up load balancing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Author

**ShadowAdi**

## 📞 Support

For support and questions, please contact: [shivam@judix.in](mailto:shivam@judix.in)

---

*This backend is part of the Judix Full-Stack Developer Intern Assignment, demonstrating modern backend development practices with security, scalability, and maintainability in mind.*