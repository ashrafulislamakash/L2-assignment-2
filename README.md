
# Mongoose Express CRUD Mastery
Live Link:
https://l2assignment2.vercel.app/

## Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- MongoDB

## Getting Started
1. Clone the repository:

   ```bash
   git clone https://github.com/ashrafulislamakash/L2-assignment-2

   ```

2. Install dependencies:
   ```bash
   cd your-repo
   npm install
   ```
3. Set up environment variables:
   ```bash
   NODE_ENV= development
PORT=5000
DATABASE_URL= your mongo url
BCRYPT_SALT_ROUNDS=12
   ```
4. Start the application:

   ```bash
   npm run start: dev
   ```

   The application will be running at http://localhost:3000.

## User Management:

### 1. Create a new user

- Endpoint: **POST /api/users**
- Request Body:

- Api URL: http://localhost:5000/api/users



### 2. Retrieve a list of all users

- Endpoint: **GET /api/users**
- API URL http://localhost:5000/api/users
- Response: List of user objects. Each object should only contain `username`, `fullName`, `age`, `email`, and `address` . Apply suitable field filtering to retrieve the necessary information.



### 3. Retrieve a specific user by ID

- Endpoint: **GET /api/users/:userId**

 Api Url: http://localhost:5000/api/users/222



### 4. Update user information

- Endpoint: **PUT /api/users/:userId**

- Request Body: Updated user data (similar structure as in user creation).

 Api Url: http://localhost:5000/api/users/222


### 5. Delete a user

- Endpoint: **DELETE /api/users/:userId**

 Api Url: http://localhost:5000/api/users/222


### Order Management:

1. Add New Product in Order

- Endpoint: **PUT /api/users/:userId/orders**


 Api Url: http://localhost:5000/api/users/222/orders



### 2. Retrieve all orders for a specific user

- Endpoint: **GET /api/users/:userId/orders**

 Api Url: http://localhost:5000/api/users/222/orders



### 3. **Calculate Total Price of Orders for a Specific User**

- Endpoint: **GET /api/users/:userId/orders/total-price**

 API Url: http://localhost:5000/api/users/222/orders/total-price



