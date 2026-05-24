# Inventory & Order Management System

A full-stack Inventory and Order Management System built using Spring Boot and React.

## 🚀 Frontend Development Progress

Currently working on the frontend part of the project using React.

Implemented features so far:

- Add Product
- View Products
- Product Details Page
- Edit Product
- Delete Product

## ⚛️ React Concepts Used

- React Components
- Props
- useState
- useEffect
- React Router DOM
- Dynamic Routing using `useParams`
- Navigation using `useNavigate`
- Fetch API for backend communication

## 🔗 Routing Structure

Used `react-router-dom` to connect components and pages together through routes.

Examples:

- `/products`
- `/products/:id`
- `/products/edit/:id`

This helped in creating:

- Product listing page
- Product details page
- Edit product page

## 🔄 Backend Integration

Connected React frontend with Spring Boot backend APIs using Fetch API.

Learned:

- Fetching data from backend
- Sending POST, PUT, DELETE requests
- Handling dynamic product IDs
- Updating UI based on backend responses

## 🛠 Backend Changes During Frontend Development

While implementing delete functionality, faced a foreign key constraint issue because products were connected with the `order_item` table.

Instead of permanently deleting products from the database, implemented an `active` property in Product.

### Current Logic

- `active = true` → Product visible
- `active = false` → Product hidden

Only active products are shown in the frontend.

This approach prevents breaking existing order history and maintains database integrity.

## 🧠 Learning Experience

This project helped me understand:

- How frontend and backend communicate
- How routing works in React
- CRUD operations in full-stack applications
- State management basics
- Real-world database relationship problems

## 🛠 Tech Stack

### Frontend

- React
- React Router DOM
- CSS

### Backend

- Spring Boot
- Spring Data JPA
- MySQL

## 📌 Project Status

Frontend development is currently in progress.
More features and UI improvements will be added soon.

# Smart Inventory & Order Management System – Feature Update

## Overview

This update introduces major e-commerce functionalities to the Smart Inventory & Order Management System, including direct product purchasing, cart management, backend cart summary calculations, checkout workflow, and admin order status management.

---

# Buy Now Feature

Implemented a **Buy Now** button inside the Product Details page.

This feature allows users to immediately purchase a product without adding it to the cart.

### Workflow

```text
Product Details
↓
Buy Now
↓
Checkout
↓
Order Created
```

---

# Add to Cart Feature

Implemented a complete cart functionality.

Users can:

- Add products to cart
- Remove products from cart
- Add multiple products
- Increase quantity of products
- Manage quantity-wise product addition

Example:

```text
Laptop × 2
Mouse × 1
Keyboard × 3
```

---

# Cart Summary Feature

Before placing an order, users can preview the complete purchase summary.

Displayed information:

- Product Name
- Product Price
- Quantity
- Subtotal of each product
- Total Items
- Total Amount

### Workflow

```text
Cart
↓
Backend Summary Calculation
↓
Summary DTO Response
↓
Display Total and Subtotals
```

---

# Backend DTO Design

To support cart summary calculations before checkout, two DTOs were introduced.

## CartSummaryItem

Stores product-level summary data.

Fields:

- productName
- price
- quantity
- subtotal

---

## CartSummaryResponse

Stores complete cart summary information.

Fields:

- List<CartSummaryItem>
- totalItems
- totalAmount

This design allows the backend to calculate cart totals and send structured JSON responses to the frontend.

---

# Checkout and Order Creation

Implemented Checkout functionality.

When the user clicks Checkout:

- Order is created
- OrderItems are created
- Total amount is calculated
- Inventory stock is automatically reduced
- Order is saved into database
- Default status is assigned

Default status:

```text
PENDING
```

---

# Admin Order Status Management

Implemented admin functionality for managing order lifecycle.

Admin can update order status directly from frontend using a dropdown.

Supported statuses:

```text
PENDING
CONFIRMED
SHIPPED
DELIVERED
CANCELLED
```

### Order Lifecycle

```text
Order Created
↓
PENDING
↓
CONFIRMED
↓
SHIPPED
↓
DELIVERED
```

---

# Frontend Implementation

Implemented:

- Order Details page
- Status dropdown
- API integration
- Dynamic status updates
- Cart summary display
- Quantity-wise cart management

---

# Backend Implementation

Implemented:

- OrderStatus Enum
- Status update API
- Cart summary APIs
- DTO-based responses
- Inventory updates
- Order management logic

---

# Technologies Used

## Backend

- Java
- Spring Boot
- Spring Data JPA
- MySQL
- Lombok
- REST APIs
- DTO Pattern
- Enum

## Frontend

- React
- React Router
- Fetch API
- React Hooks

---

# Outcome

This update transformed the project from basic CRUD operations into a more realistic inventory and order management workflow by introducing:

- Buy Now flow
- Cart functionality
- Checkout process
- Backend summary calculations
- DTO design
- Inventory updates
- Admin order management
- Order lifecycle handling

These features move the project closer to a real-world e-commerce application architecture.

# Product Module Progress Update

## Overview

In this phase of my **Inventory and Order Management System** project, I implemented several important product-related features:

- 🔍 Search Products
- 🗂️ Filter Products by Category
- ↕️ Sort Products by Price
- 📄 Pagination

This phase helped me move from basic CRUD functionality toward building more realistic product browsing features similar to real-world applications.

---

# 🔍 Search Products

I implemented a search feature that allows users to search products by keyword.

Initially, I implemented this feature by:

- Clicking a button
- Routing to a separate page
- Fetching search results on that page
- Rendering products on the new page

### Flow

```text
Products Page
      ↓
Search Button Clicked
      ↓
Route → /products/search
      ↓
Fetch Search Results
      ↓
Render Products
```

This approach worked and helped me understand routing and parameter passing.

---

# 🗂️ Filter Products by Category

I also implemented category-based filtering.

Users can select categories such as:

- Electronics
- Books
- Clothes

Initially, filtering followed the same architecture:

```text
Button Click
    ↓
Navigate to another page
    ↓
Fetch filtered products
    ↓
Render products
```

This helped me understand feature implementation step-by-step.

---

# ↕️ Sort Products by Price

I later added sorting functionality.

Users can choose:

- Price: Low → High
- Price: High → Low

Backend sorting was implemented using **Spring Data Sort**.

Examples:

```text
price,asc
price,desc
```

The backend processes sorting and returns products accordingly.

---

# 🚀 Architectural Improvement

After implementing search and filter separately using page routing, I realized there was a cleaner and more scalable approach.

Instead of:

```text
One feature
→ One page
→ One route
→ One fetch function
```

I integrated all features into:

- One URL
- One fetch function
- One useEffect
- One products state

### Example URL

```text
/products?search=&category=&sort=
```

Frontend updates query parameters dynamically.

Examples:

```text
/products?search=laptop

/products?category=Electronics

/products?sort=price,asc
```

### Single fetch function

```javascript
fetchProducts();
```

### Single useEffect

```javascript
useEffect(() => {
  fetchProducts();
}, [search, category, sort]);
```

Products update automatically:

```javascript
setProducts(data);
```

This approach is cleaner and closer to real-world frontend architecture.

---

# ⚠️ Current Limitation

Currently, I intentionally designed the logic to execute **one feature at a time**:

```text
Search
OR
Filter
OR
Sort
```

instead of:

```text
Search
↓
Filter
↓
Sort
↓
Final Result
```

Reason:

My current goal is learning feature implementation individually.

Later I plan to merge multiple functionalities together and support workflows such as:

```text
Search Product
      ↓
Filter Category
      ↓
Sort Price
      ↓
Return Result
```

This will make the application behave closer to production systems.

---

# 📄 Pagination

To make product browsing more scalable, I implemented pagination.

Without pagination:

```text
Return all products
```

Problems:

- Large response size
- Slow loading
- Poor user experience

With pagination:

```text
/products?page=0&size=5
```

Users can browse products page-by-page.

Example:

### Page 1

```text
Product 1
Product 2
Product 3
Product 4
Product 5
```

### Page 2

```text
Product 6
Product 7
Product 8
...
```

Pagination was integrated with:

- Normal product fetching
- Search
- Filter
- Sorting

using Spring Boot:

```java
Pageable pageable =
PageRequest.of(page,size);
```

This makes the product module more realistic and scalable.

---

# 📚 Learning Outcomes

Through this implementation I learned:

- Route-based feature rendering
- Query parameters
- Dynamic fetching
- useEffect dependencies
- State-driven UI updates
- Spring Boot sorting
- Pagination with Pageable
- Improving architecture gradually

This phase was an important step in moving from simple CRUD applications toward real-world full-stack application design.

# Authentication Module - Frontend

## Overview

In this phase of the project, I integrated the React frontend with the Spring Boot backend authentication system using **Spring Security** and **JWT (JSON Web Token)**.

The objective was to create a secure login flow where users authenticate through the frontend and gain access to protected backend APIs.

This was my first complete implementation of frontend authentication integrated with a secured backend.

---

## Login Page Implementation

A dedicated login page was created using React.

The page contains:

- Username field
- Password field
- Login button

Input values are managed using React state:

```js
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
```

Users enter credentials and submit them to the backend.

---

## Authentication Flow

The login process follows this sequence:

```text
User enters credentials
          ↓
Clicks Login
          ↓
POST request sent to backend
          ↓
Spring Security verifies user
          ↓
JWT token generated
          ↓
Token returned to frontend
          ↓
Store token in localStorage
```

Frontend request:

```js
const response = await fetch("http://localhost:8081/login", {
  method: "POST",

  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
    username,
    password,
  }),
});
```

---

## Storing JWT Token

After successful authentication, the backend returns a JWT token.

The token is stored in browser local storage:

```js
const token = await response.text();

localStorage.setItem("token", token);
```

This allows the application to remember authenticated users.

---

## Accessing Protected APIs

For protected APIs, the JWT token is retrieved from local storage and attached to requests.

Example:

```js
const token = localStorage.getItem("token");

const response = await fetch("http://localhost:8081/products", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

Flow:

```text
Login
    ↓
Store JWT
    ↓
Request products
    ↓
Attach token
    ↓
Backend validates JWT
    ↓
Access granted
```

---

## Issue Faced: CORS Problem

During implementation, protected API requests were failing because of a Cross-Origin issue.

Error:

```text
No 'Access-Control-Allow-Origin' header
```

Reason:

Frontend:

```text
localhost:5173
```

Backend:

```text
localhost:8081
```

Since the frontend and backend run on different ports, browser security triggered a CORS restriction.

The issue was resolved by configuring CORS inside Spring Security.

---

## Learning Outcomes

Through this implementation I learned:

- React login implementation
- Sending POST requests
- JWT authentication flow
- Browser local storage
- Authorization headers
- Protected API communication
- Spring Security integration
- React + JWT workflow
- Debugging CORS issues

---

## Current Status

Implemented:

- Login page
- JWT generation
- Token storage
- Protected API access
- React + Spring Security integration

Planned improvements:

- Logout functionality
- Protected frontend routes
- Role-based UI rendering
- Axios integration
- Authentication persistence improvements

---

This authentication module was an important step in transforming the project from a basic CRUD application into a real-world secured full-stack application.
