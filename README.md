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
