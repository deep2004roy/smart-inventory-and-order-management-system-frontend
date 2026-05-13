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
