# Turbo Shine Back-end
[Live LINK ](https://turbo-shine-server-backend.vercel.app)
```
Live Deployment Link
Client: https://turbo-shine-client-frontend.vercel.app
Server: https://turbo-shine-server-backend.vercel.app
GitHub Repository Links
Client: https://github.com/sabilar-rahman/Turbo-Shine-Client-Frontend
Server: https://github.com/sabilar-rahman/Turbo-Shine-Server-Backend
(LOGIN) ADMIN credentials
user: Sabilar@admin.com
pass: 12345678
(LOGIN)USER credentials
user: Sabilar@user.com
pass: 12345678
```
This Car wash booking system project is a comprehensive booking management system that allows users to create, view, and manage their bookings. It offers real-time slot availability checks, role-based access control, and secure password management, making it ideal for managing appointments or service bookings efficiently.

## Introduction 
Turbo Shine is a user-friendly car wash system website designed to streamline the car cleaning experience for users while providing efficient management tools for service providers.


## Features

### 1. **Authentication & Role-Based Access**

- Users authenticate using secure JWT tokens, and the system differentiates access based on user roles (Admin or User).

### 2. **Dynamic Role-Specific Authorization**

- Admins can manage services, slots, and bookings, while users are limited to interacting with their own bookings and available services.

### 3. **Efficient Booking Management**

- Users can seamlessly create, view, and manage bookings, with real-time availability checks to prevent overbooking.

### 4. **Service & Slot Management**

- Admins have full control over service and slot creation, deletion, and status updates, with instant visibility of slot availability for users.

### 5. **Real-Time Slot Availability Check**

- The system ensures real-time slot verification during the booking process to avoid conflicts and ensure up-to-date availability.

### 6. **Secure Password Hashing**

- User passwords are securely hashed and stored, adhering to best security practices for sensitive data protection.

## Technologies Used

- **Backend**: Node.js, Express,TypeScript
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Zod
- **Password Security**: bcrypt

## Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18.x or above)
- [npm](https://www.npmjs.com/) (Node package manager)
- [Express.Js](https://expressjs.com/) (Node.js framework)
- [Mongoose](https://mongoosejs.com/) (Object Data Modeling for node.js)
- [TypeScript](https://www.typescriptlang.org/) (Object Data Modeling for node.js)

## Getting Started Locally Setup.

### Installation

1. **Clone the repository:**

   ```sh
   git clone  https://github.com/sabilar-rahman/Turbo-Shine-Server-Backend.git

   cd your-repo-name
   ```

2. **Install dependencies:**
   ```sh
   npm install or npm i
   ```

### Configuration

1. **Environment Variables:**
   Create a `.env` file in the root of the project and add the following variables:
   ```env
   NODE_ENV= development
   PORT=5000
   DB_URL=your-database-url from mongodb
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_SECRET= your_jwt_access_secret
   JWT_ACCESS_EXPIRES_IN= 
   JWT_REFRESH_SECRET=
   JWT_REFRESH_EXPIRES_IN=
   STORE_ID ="aamarpaytest"
   SIGNATURE_KEY="dbb74894e82415a2f7ff0ec3a97e4183"
   PAYMENT_URL=" https://sandbox.aamarpay.com/jsonpost.php"
   PAYMENT_VERIFY_URL="https://sandbox.aamarpay.com/api/v1/trxcheck/request.php"     
   ```

### Running the Application Locally

1. **Start the server:**

```sh
 npm run start:dev
```

## Project Description
Turbo Shine aims to simplify the process of booking car wash services. Users can easily schedule appointments, select their preferred services, and manage their bookings online. The platform also provides service providers with tools to track and manage appointments effectively.


## Features
- Responsive Design: Optimized for both desktop and mobile devices.
- Advanced Search & Filtering: Quickly find products by name, category, brand, or price.
- Service Sorting: Sort products by popularity, price, or newest arrivals.
- Detailed Product Listings: Comprehensive service information and high-quality visuals.
- Interactive Shopping Cart: Enhanced with Tailwind CSS and AOS animations.

- Customer Gallery: Showcases satisfied customers using Max Fit products
-    User registration and login.
-   Service selection with detailed descriptions.
-   Booking management (view, cancel, and reschedule).
-   Payment processing and status tracking.
-   User profile management.
-   Admin panel for service management.
-   Responsive design for mobile and desktop users.

## Technology Stack
- Frontend: React, Redux, TypeScript, Tailwind CSS, AOS (Animate on Scroll)
- Backend:  Express.js ,Node.js, TypeScript
- Database: MongoDB
- Others: Zod for schema validation

## Installation Guideline
### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- npm 
- MongoDB (running locally or a cloud instance)



### Steps

1. Clone the repository:
   ```
   git clone https://github.com/sabilar-rahman/Turbo-Shine-Client-Frontend.git 
   cd your-repo-name
   ```
2. Install dependencies::
   ```
   npm install
   
   ```

3. Start the development server:
   ```
   npm run start:dev
   
   ```
