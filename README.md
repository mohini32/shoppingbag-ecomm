# ShoppingBag - E-commerce Platform

A full-stack e-commerce application built with Next.js, Node.js, Express, and MySQL.

## 🚀 Features

- **User Authentication** - JWT-based login/register system
- **Product Catalog** - Browse products with search, filters, and pagination
- **Shopping Cart** - Add, update, and remove items from cart
- **Responsive Design** - Works on desktop and mobile devices
- **Real-time Updates** - Cart count updates instantly

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Context** - Global state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **Sequelize** - ORM for database operations
- **JWT** - JSON Web Tokens for authentication
- **Joi** - Data validation

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Backend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create MySQL database:
   ```sql
   CREATE DATABASE shoppingbag;
   ```

3. Create `.env` file in root directory:
   ```bash
   JWT_SECRET=your-super-secret-jwt-key-here
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=shoppingbag
   DB_USER=root
   DB_PASSWORD=your-mysql-password
   ```

4. Run database setup:
   ```bash
   node scripts/setupDatabase.js
   node scripts/seedProducts.js
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env.local` file:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:5001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🌐 Usage

1. **Backend**: http://localhost:5001
2. **Frontend**: http://localhost:3000

### Default Test Account
- **Email**: test@example.com
- **Password**: password123

## 📁 Project Structure

```
ShoppingBag/
├── controllers/          # API controllers
├── middleware/          # Express middleware
├── models/             # Sequelize models
├── routes/             # API routes
├── scripts/            # Database setup scripts
├── frontend/           # Next.js application
│   ├── src/
│   │   ├── app/        # App Router pages
│   │   ├── components/ # React components
│   │   └── context/    # React Context providers
├── app.js             # Express server
└── package.json       # Backend dependencies
```

## 🚀 Deployment

This application can be deployed to platforms like:
- **Railway** (recommended for full-stack)
- **Vercel** (frontend) + **Railway** (backend)
- **Netlify** (frontend) + **Render** (backend)

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:id` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove cart item
- `DELETE /api/cart/clear` - Clear entire cart

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
