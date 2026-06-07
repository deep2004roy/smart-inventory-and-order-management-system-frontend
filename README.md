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

# Frontend Authentication, Authorization & Architecture Improvements

## Overview

This document summarizes the authentication, authorization, API architecture, validation, and user experience improvements implemented in the Smart Inventory & Order Management System frontend.

---

# Features Implemented

## Authentication

- JWT-based Authentication
- Login Integration with Backend
- Token Storage using Local Storage
- Logout Functionality
- Session Expiration Handling

## Authorization

- Protected Routes
- Admin Routes
- Role-Based UI Rendering
- Role-Based Route Access

## API Architecture

- Migration from Fetch API to Axios
- Centralized API Service Layer
- Axios Request Interceptors
- Axios Response Interceptors
- Automatic JWT Attachment
- Global 403 Handling

## User Experience

- Loading States
- Error States
- Empty States
- Toast Notifications
- Frontend Form Validation

---

# 1. Protected Routes

Implemented a custom `ProtectedRoute` component to restrict access to authenticated users.

## Protected Pages

- Products
- Product Details
- Add Product
- Edit Product
- Orders
- Order Details
- Cart

### Workflow

```text
User requests protected page
        ↓
Token exists?
   ↙         ↘
 Yes         No
  ↓           ↓
Access     Redirect Login
```

---

# 2. Role-Based Authorization

User roles are stored after login.

```javascript
localStorage.setItem("token", data.token);
localStorage.setItem("role", data.role);
```

## Supported Roles

- ADMIN
- USER

### ADMIN Permissions

- Add Product
- Edit Product
- Delete Product

### USER Permissions

- View Products
- View Orders
- Cart Operations

---

# 3. Admin Route Protection

Implemented `AdminRoute` to prevent unauthorized access.

## Example Routes

```text
/add
/products/edit/:id
```

### Workflow

```text
User accesses admin page
          ↓
Role == ADMIN ?
     ↙          ↘
   Yes          No
    ↓            ↓
Allow        Redirect
```

---

# 4. JWT Authentication Flow

```text
User Login
     ↓
Backend Authentication
     ↓
JWT Generated
     ↓
Token Stored
     ↓
Protected API Access
```

## Stored Data

```text
token
role
```

---

# 5. Logout Functionality

Implemented secure logout.

```javascript
localStorage.removeItem("token");
localStorage.removeItem("role");
```

### Workflow

```text
Logout
   ↓
Remove Token
   ↓
Remove Role
   ↓
Redirect Login
```

---

# 6. Session Expiration Handling

Automatic logout when JWT expires.

### Workflow

```text
JWT Expires
     ↓
Backend Returns 403
     ↓
Response Interceptor
     ↓
Clear Storage
     ↓
Redirect Login
     ↓
Show Expired Session Message
```

### Example Message

```text
Session expired. Please login again.
```

---

# 7. Migration from Fetch API to Axios

## Before

Each request required:

- Base URL
- Authorization Header
- Error Handling

```javascript
fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## After

Centralized API layer:

```javascript
api.get("/products");
api.post("/products", product);
api.put(`/products/${id}`, updatedProduct);
api.delete(`/products/${id}`);
```

### Benefits

- Cleaner code
- Reusable configuration
- Easier maintenance

---

# 8. Axios Request Interceptor

Automatically attaches JWT token to outgoing requests.

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

### Workflow

```text
Request Created
      ↓
Interceptor Runs
      ↓
JWT Attached
      ↓
Request Sent
```

---

# 9. Axios Response Interceptor

Handles authentication failures globally.

```javascript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      window.location.href = "/login?expired=true";
    }

    return Promise.reject(error);
  },
);
```

### Benefits

- Centralized 403 handling
- Automatic logout
- Consistent user experience

---

# 10. Loading States

Implemented loading indicators while data is being fetched.

### Example

```text
Loading...
```

### Benefits

- Better user feedback
- Improved UX

---

# 11. Error States

Implemented user-friendly error messages.

### Examples

```text
Unable to fetch products

Request failed
```

### Benefits

- Better debugging
- Improved user experience

---

# 12. Empty States

Implemented UI for empty datasets.

### Examples

```text
No products found

No orders found
```

### Benefits

- Prevents blank pages
- Improves usability

---

# 13. Frontend Form Validation

Added validation before form submission.

## Product Name

```text
Required
```

## Price

```text
Must be positive
```

## Quantity

```text
Must be greater than zero
```

### Example Validation Logic

```javascript
if (!name.trim()) {
  newErrors.name = "Name required";
}

if (price <= 0) {
  newErrors.price = "Price must be positive";
}

if (quantity <= 0) {
  newErrors.quantity = "Quantity required";
}
```

---

# 14. Toast Notifications

Implemented React Toastify for user feedback.

## Success Messages

```text
Product added successfully

Product updated successfully
```

## Error Messages

```text
Failed to add product

Login failed
```

### Benefits

- Immediate feedback
- Improved user experience
- More professional UI

---

# Architecture Overview

```text
Frontend
   ↓
Protected Routes
   ↓
Admin Routes
   ↓
Axios Service Layer
   ↓
Request Interceptor
   ↓
Backend API
   ↓
Response Interceptor
   ↓
Session Handling
```

---

# Technologies Used

- React
- React Router
- Axios
- React Toastify
- Spring Security
- JWT Authentication
- Local Storage

---

# Learning Outcomes

Through these implementations, the following concepts were learned and applied:

- Authentication vs Authorization
- JWT-Based Security
- Role-Based Access Control (RBAC)
- Protected Frontend Routing
- Axios Interceptors
- Session Management
- Client-Side Validation
- User Experience Improvements
- API Layer Architecture
- Real-World Frontend Security Practices
- Notification Systems

## 📤 Product Creation Updated to FormData

Updated the product creation workflow to use **FormData** instead of JSON, enabling support for image uploads.

### 🚀 Why the Change?

Previously, products were submitted as JSON objects:

```javascript id="y2z1p7"
const product = {
  name,
  description,
  price,
  quantity,
  category,
  active,
};
```

This worked for text-based data but could not handle image uploads.

To support product images, the request format was changed to **multipart/form-data** using the browser's FormData API.

---

### 🛠 Implementation

Created a FormData object and appended product fields:

```javascript id="yyr3sk"
const formData = new FormData();

formData.append("name", name);
formData.append("description", description);
formData.append("price", price);
formData.append("quantity", quantity);
formData.append("category", category);
formData.append("active", active);
```

---

### 📷 Image Upload Support

Added support for optional image uploads:

```javascript id="0h88up"
if (image) {
  formData.append("image", image);
}
```

The selected image file is now sent together with the product details in a single request.

---

### 🔄 API Request Updated

Product creation request:

```javascript id="13p9zb"
await api.post("/products", formData);
```

Axios automatically handles the `multipart/form-data` content type.

---

### 🎯 Benefits

- Supports image uploads
- Sends text fields and files in a single request
- Compatible with Spring Boot MultipartFile
- Enables product image previews and display features
- Provides a more realistic e-commerce style workflow

---

### ✅ Result

Administrators can now:

- Create products with images
- Create products without images
- Upload image files directly from the browser
- Integrate seamlessly with the backend image upload functionality

This update prepares the frontend for full product image management and enhanced product card UI.

## Add Product Form Enhancements

The Add Product page was updated to provide a more user-friendly interface for creating new products and uploading product images.

### Features Added

#### 1. Form State Management

Implemented React state management using `useState` for all product fields:

- Product Name
- Description
- Price
- Quantity
- Category
- Active Status
- Product Image

This allows the form to be fully controlled by React.

#### 2. Client-Side Validation

Basic validation was added before submitting the form:

- Product name cannot be empty.
- Price must be greater than 0.
- Quantity must be greater than 0.

Validation errors are displayed directly below the corresponding input fields.

#### 3. Image Upload Support

Added support for product image uploads using an HTML file input.

```javascript
<input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
/>
```

Selected images are stored in component state and sent to the backend during form submission.

#### 4. Image Preview

Implemented image preview functionality before submission using:

```javascript
URL.createObjectURL(image);
```

This allows users to verify the selected image before uploading.

#### 5. FormData Submission

The form now sends data as `multipart/form-data` instead of JSON.

```javascript
const formData = new FormData();

formData.append("name", name);
formData.append("description", description);
formData.append("price", price);
formData.append("quantity", quantity);
formData.append("category", category);
formData.append("active", active);

if (image) {
  formData.append("image", image);
}
```

This enables simultaneous transmission of product information and image files.

#### 6. API Integration

Connected the form to the backend API using Axios:

```javascript
await api.post("/products", formData);
```

The backend receives the product details and uploaded image in a single request.

#### 7. Success and Error Notifications

Added toast notifications using React Toastify.

Success:

```javascript
toast.success("Product added successfully");
```

Failure:

```javascript
toast.error("Failed to add product");
```

This provides immediate feedback to users after form submission.

#### 8. Modern UI Styling

The form was redesigned using Tailwind CSS with:

- Responsive two-column layout
- Styled input fields
- Focus states
- Validation messages
- Product image preview
- Styled submit button
- Card-based design with shadow effects

### Result

Users can now:

1. Enter product details.
2. Upload a product image.
3. Preview the image before submission.
4. Validate input fields.
5. Submit product data and image together using `multipart/form-data`.
6. Receive success or failure feedback through toast notifications.

This significantly improves the product creation workflow and provides a better user experience.

# UI & Order Management Improvements

## Products Page Redesign

The Products page was redesigned using Tailwind CSS to provide a cleaner and more modern shopping experience.

### Features Implemented

- Responsive product grid layout.
- Search products by name.
- Filter products by category.
- Sort products by price (ascending/descending).
- Server-side pagination.
- Loading state while products are being fetched.
- Error handling UI.
- Empty state when no products are found.
- Consistent card-based design with shadows and hover effects.

### Pagination

Products are fetched using Spring Data pagination:

```http
GET /products?page=0&size=12
```

The frontend tracks:

- Current page
- Total pages returned by the backend

Navigation buttons are automatically enabled/disabled based on page boundaries.

---

## Product Card Redesign

Each product is displayed using a reusable Product Card component.

### Card Contents

- Product image
- Product name
- Category
- Short description
- Price badge
- Available stock badge

### Design Improvements

- Card hover animations
- Shadow elevation effects
- Consistent spacing and typography
- Responsive image display using `object-contain`
- Clickable card navigation to Product Details page

---

## Product Details Page

The Product Details page was designed to provide complete information about a product.

### Information Displayed

- Product image
- Product name
- Product description
- Category
- Price
- Available stock

### Additional Features

- Edit Product option for administrators
- Delete Product option for administrators
- Improved layout consistency with the Products page

---

# Orders Module Improvements

## Backend Pagination Support

Orders endpoint was updated to support pagination.

### Endpoint

```http
GET /orders?page=0&size=12
```

Returns:

```java
Page<Order>
```

This provides:

- content
- totalPages
- totalElements
- current page information

which allows proper frontend pagination.

---

## Order Status Filtering

The Orders endpoint was enhanced to support filtering by status.

### Endpoint

```http
GET /orders?status=SHIPPED&page=0&size=12
```

Supported statuses:

- PENDING
- CONFIRMED
- SHIPPED
- DELIVERED
- CANCELLED

This allows administrators to quickly locate specific groups of orders.

---

## Orders Page Redesign

The Orders page was redesigned using the same design language as the Products page.

### Features

- Status filtering
- Paginated order listing
- Loading state
- Error state
- Empty state
- Responsive card grid layout

### Additional Improvements

The page displays:

- Number of orders shown on the current page
- Current page indicator
- Total page count

Example:

```text
Page 2 of 5
```

Navigation buttons automatically disable when the first or last page is reached.

---

## Order Card Redesign

The Order Card component was redesigned to provide a concise order summary.

### Information Displayed

- Order ID
- Order Date
- Total Amount
- Current Status

### Design Improvements

- Clickable card navigation
- Status badge styling
- Hover animations
- Shadow effects
- Improved spacing and readability

The card acts as an entry point to the full Order Details page.

---

# Order Details Enhancement

## Problem

Initially, the Order Details page only displayed:

- Order ID
- Date
- Total Amount
- Status

This provided very little information beyond what was already visible in the Order Card.

---

## Backend Improvements

To provide complete order information, a dedicated response structure was introduced.

### New DTOs

#### OrderDetailsDTO

```java
public class OrderDetailsDTO {
    private int id;
    private Date date;
    private int totalAmount;
    private OrderStatus status;
    private List<OrderItemDTO> items;
}
```

#### OrderItemDTO

```java
public class OrderItemDTO {
    private Long productId;
    private String productName;
    private Double price;
    private int quantity;
    private Double subtotal;
}
```

---

## Repository Enhancement

A repository method was added to retrieve all items belonging to a specific order.

```java
List<OrderItem> findByOrder(Order order);
```

This allows the backend to fetch all products associated with an order.

---

## Service Layer Enhancement

The Order Details service now:

1. Retrieves the Order.
2. Retrieves all related OrderItems.
3. Converts OrderItems into OrderItemDTO objects.
4. Calculates item subtotals.
5. Returns a complete OrderDetailsDTO.

This transforms the endpoint from a simple order lookup into a complete order summary.

---

## Updated Endpoint

Before:

```java
@GetMapping("/orders/{id}")
public Order getOrderById(@PathVariable int id)
```

After:

```java
@GetMapping("/orders/{id}")
public OrderDetailsDTO getOrderById(@PathVariable int id)
```

The endpoint now returns both order metadata and purchased items.

---

## Order Details Page Redesign

The frontend was redesigned to consume the new OrderDetailsDTO.

### Sections

#### Order Information

Displays:

- Order ID
- Date
- Total Amount
- Status badge

---

#### Ordered Items

Displays every purchased item:

```text
Laptop
₹50000 × 2      ₹100000
```

Information shown:

- Product Name
- Unit Price
- Quantity
- Item Subtotal

---

#### Grand Total

Displays the final order amount.

Example:

```text
Grand Total
₹102500
```

---

#### Status Management

Administrators can update order status directly from the Order Details page.

Supported statuses:

- PENDING
- CONFIRMED
- SHIPPED
- DELIVERED
- CANCELLED

Includes:

- Loading state while updating
- Disabled controls during updates
- Automatic refresh after successful status change

---

## Result

The Order Details page evolved from a simple metadata view into a complete order management interface that provides:

- Full order visibility
- Purchased product information
- Quantity tracking
- Price breakdown
- Order status management
- Improved administrator workflow

# Frontend Updates

## Product Image Upload Support

### Features Implemented

- Switched product creation requests from JSON to FormData.
- Added image file selection support.
- Added image preview before upload.
- Integrated image upload with backend API.

---

## Product Display Improvements

### Features

- Display uploaded product images.
- Improved image rendering.
- Added proper image sizing using object-cover.
- Better visual presentation of products.

---

## Add Product Page Improvements

### UI Enhancements

- Modern Tailwind CSS form design.
- Responsive layout.
- Loading state during submission.
- Image preview support.

### Validation

- Product name required.
- Category required.
- Price must be greater than zero.
- Quantity must be greater than zero.

### Notifications

- Success notification after product creation.
- Error notification when creation fails.

---

## Edit Product Page

### Features

- Load existing product details.
- Update product information.
- Replace existing product image.
- Preview newly selected image.
- Loading state while fetching product data.
- Success and error toast notifications.

---

## Category Management

### Improvements

- Replaced text input with category dropdown.
- Standardized category values.
- Improved user experience.
- Prevented category spelling inconsistencies.

### Available Categories

- Electronics
- Books
- Clothes

---

## Cart Page Improvements

### Features

- Loading state while fetching cart summary.
- Empty cart screen.
- Continue Shopping button.
- Checkout confirmation prompt.
- Order summary section.

### Summary Information

- Total items
- Total amount

---

## Cart Card Redesign

### Features

- Product image display.
- Product name.
- Product price.
- Quantity display.
- Subtotal calculation.
- Remove item button.

### UI Improvements

- Modern card layout.
- Responsive design.
- Improved spacing and typography.
- Hover effects.

---

## User Feedback

Implemented React Toastify notifications for:

- Product creation success.
- Product creation failure.
- Product update success.
- Product update failure.
- Product loading failure.
