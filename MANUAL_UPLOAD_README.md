# ShoppingBag - E-commerce Platform

A full-stack e-commerce application built with Next.js, Node.js, Express, and MySQL.

## 🚀 Features

- **User Authentication** - JWT-based login/register system with HTTP-only cookies
- **Product Catalog** - Browse products with search, filters, and pagination
- **Shopping Cart** - Add, update, and remove items with real-time updates
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Global State Management** - React Context for cart and authentication

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Context API** - Global state management

### Backend
- **Node.js & Express.js** - RESTful API server
- **MySQL & Sequelize** - Database and ORM
- **JWT Authentication** - Secure token-based auth
- **Joi Validation** - Request data validation
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- MySQL (v8+)
- npm or yarn

### Backend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file in root:
   ```env
   JWT_SECRET=your-super-secret-jwt-key-here
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=shoppingbag
   DB_USER=root
   DB_PASSWORD=your-mysql-password
   FRONTEND_URL=http://localhost:3000
   ```

3. Setup database:
   ```bash
   # Create database
   CREATE DATABASE shoppingbag;
   
   # Run setup scripts
   node scripts/setupDatabase.js
   node scripts/seedProducts.js
   ```

4. Start server:
   ```bash
   npm start  # Production
   # or
   node app.js  # Development
   ```

### Frontend Setup
1. Navigate to frontend:
   ```bash
   cd frontend
   npm install
   ```

2. Create `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **API Documentation**: Available via endpoints below

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get products (with filters, search, pagination)
- `GET /api/products/:id` - Get single product

### Cart Management
- `GET /api/cart` - Get user's cart items
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:id` - Update item quantity
- `DELETE /api/cart/remove/:id` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart

## 🏗️ Project Architecture

```
ShoppingBag/
├── Backend (Node.js/Express)
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, validation, CORS
│   ├── models/         # Sequelize database models
│   ├── routes/         # API route definitions
│   ├── scripts/        # Database setup utilities
│   └── app.js          # Express server entry point
│
└── Frontend (Next.js)
    ├── src/
    │   ├── app/        # App Router pages
    │   ├── components/ # Reusable UI components
    │   └── context/    # Global state management
    ├── public/         # Static assets
    └── package.json    # Frontend dependencies
```

## 🔐 Security Features

- **JWT Authentication** with HTTP-only cookies
- **Password Hashing** with bcrypt
- **Input Validation** with Joi schemas
- **CORS Protection** for cross-origin requests
- **SQL Injection Prevention** via Sequelize ORM

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages
- **Optimistic Updates** - Instant UI feedback
- **Real-time Cart Count** - Updates across all pages

## 🚀 Deployment Ready

This application is configured for deployment on:
- **Railway** (recommended for full-stack)
- **Vercel** (frontend) + **Railway/Render** (backend)
- **Netlify** (frontend) + **Heroku** (backend)

### Environment Variables for Production:
```env
# Backend
NODE_ENV=production
JWT_SECRET=production-secret-key
DB_HOST=production-db-host
DB_PORT=production-db-port
DB_NAME=production-db-name
DB_USER=production-db-user
DB_PASSWORD=production-db-password
FRONTEND_URL=https://your-frontend-domain.com

# Frontend
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

## 📝 Development Notes

- **Authentication Flow**: Login → JWT token in HTTP-only cookie → Protected routes
- **State Management**: React Context for cart and user state
- **Data Flow**: API calls → Context updates → Component re-renders
- **Error Handling**: Try-catch blocks with user-friendly messages
- **Database**: Sequelize models with associations and validations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

**Built with ❤️ using modern web technologies**
