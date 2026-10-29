# 💍 Shubh Muhurat Matrimonial - Backend API Server

A robust, production-ready RESTful API backend for the **Shubh Muhurat Matrimonial** platform. Built with **Node.js**, **Express**, and **MySQL / Sequelize ORM**, this server handles user registrations, marriage profile inquiries, dynamic CMS management, and automated email notifications.

---

## 🌟 Key Features

- **Profile Inquiries & Quick Lead Capture:**
  - Hero section quick inquiry submission with instant email alerts.
  - Comprehensive matrimonial registration modal handling full profile details (DOB, gender, marital status, contact).
- **Automated Email Notifications (Nodemailer):**
  - Instant SMTP-powered HTML emails sent for every contact form inquiry, hero lead, and user registration.
  - Background async verification ensures server never blocks during cold starts.
- **Dynamic Content Management (CMS):**
  - Admin panel endpoints to update home banners, success stories, testimonials, community profiles, membership tiers, and blog posts.
- **Enterprise-Grade Security & CORS:**
  - `helmet` protection with configured `crossOriginResourcePolicy` for Apple Safari/iOS compatibility.
  - Dynamic CORS whitelist supporting production domains, preview subdomains, mobile apps, and local networks.
  - Compression middleware for fast, low-latency API responses.
- **Production-Ready Multi-Platform Architecture:**
  - Fully compatible with cPanel / Apache via **Phusion Passenger**.
  - Compatible with standard Node.js VPS / Docker environments and serverless runtimes.

---

## 🛠️ Technology Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Email Service:** Nodemailer (SMTP / Gmail App Passwords)
- **Security:** Helmet, CORS, Express-Rate-Limit
- **Performance:** Compression

---

## 📂 Project Structure (MVC Architecture)

```
Matrimonial-server/
├── config/
│   └── db.js               # Sequelize MySQL connection pool & auto-sync
├── controllers/            # Controller layer handling business logic
│   ├── authController.js   # Admin authentication & login
│   ├── blogController.js   # Blog CRUD operations
│   ├── communityController.js # Community classification CRUD
│   ├── contentController.js # Dynamic CMS homepage content
│   ├── healthController.js # Health, system status, and CORS inspection
│   ├── inquiryController.js # Contact form, hero quick lead, registration
│   ├── planController.js   # Membership tiers CRUD
│   ├── storyController.js  # Success stories CRUD
│   ├── testimonialController.js # Testimonial CRUD
│   └── userController.js   # Matrimonial profiles CRUD
├── middlewares/            # Custom express middlewares
│   ├── corsMiddleware.js   # CORS with wildcard, LAN IPs, and domain whitelist
│   ├── dbMiddleware.js     # Lazy database connection
│   └── errorMiddleware.js  # Centralized error handler
├── models/                 # Sequelize database models
│   ├── Blog.js             # Blog post schema
│   ├── Community.js        # Community showcase schema
│   ├── Content.js          # Dynamic CMS content (LongText JSON)
│   ├── Plan.js             # Membership plans schema
│   ├── Story.js            # Success stories schema
│   ├── Testimonial.js      # Customer reviews schema
│   └── User.js             # Registered matrimonial profiles schema
├── routes/                 # Express route definitions
│   ├── authRoutes.js       # Admin authentication routes
│   ├── blogRoutes.js       # Blog routes
│   ├── communityRoutes.js  # Community showcase routes
│   ├── contentRoutes.js    # Dynamic CMS routes
│   ├── healthRoutes.js     # Health check & status routes
│   ├── index.js            # Master router aggregator
│   ├── inquiryRoutes.js    # Contact, hero lead, and registration routes
│   ├── planRoutes.js       # Membership plan routes
│   ├── storyRoutes.js      # Success story routes
│   ├── testimonialRoutes.js# Customer testimonial routes
│   └── userRoutes.js       # User profile routes
├── services/               # Background services
│   └── emailService.js     # Nodemailer SMTP transporter & templates
├── data/                   # Database backups
│   ├── db.json             # Seed records backup
│   └── mysql_import.sql    # Complete MySQL database dump
├── app.js                  # Modular Express application
├── server.js               # Server launcher entrypoint
├── package.json            # Node.js dependencies & scripts
├── .htaccess               # Apache / Phusion Passenger configuration
└── .env.example            # Sample environment variables
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.x or higher)
- MySQL Server (v8.0+ or MariaDB)
- Git

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/aurav2001/Matrimonial-server.git
cd Matrimonial-server
npm install
```

### 3. Environment Configuration
Copy the `.env.example` file to create your `.env`:
```bash
cp .env.example .env
```

Configure your `.env` with the following variables:
```env
# Server
PORT=5000
NODE_ENV=development

# MySQL Database
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=matrimonial_db
MYSQL_PORT=3306

# Admin Credentials
ADMIN_USER=admin
ADMIN_PASS=supersecretadminpassword

# Allowed Origins (CORS)
CORS_ORIGIN=https://shubhmuhurat.biz,http://localhost:5173

# Email SMTP Setup (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_char_gmail_app_password
```

### 4. Running the Server

#### Development Mode:
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/` or `/api` | Server health check & diagnostics | Public |
| `GET` | `/api/status` | Detailed database & memory status | Public |
| `POST` | `/api/admin/login` | Admin authentication | Public |
| `POST` | `/api/contact` | Submit contact form & trigger email | Public |
| `POST` | `/api/hero-inquiry` | Submit quick hero inquiry & email alert | Public |
| `POST` | `/api/registration` | Register user profile & notify admin | Public |
| `GET` | `/api/content` | Fetch dynamic CMS home & site content | Public |
| `POST` | `/api/content` | Update dynamic CMS content | Admin |
| `GET` | `/api/stories` | Get all success stories | Public |
| `POST` | `/api/stories` | Create a new success story | Admin |
| `PUT` | `/api/stories/:id` | Update an existing success story | Admin |
| `DELETE`| `/api/stories/:id` | Delete a success story | Admin |
| `GET` | `/api/testimonials` | Fetch customer testimonials | Public |
| `POST` | `/api/testimonials` | Add a new testimonial | Admin |
| `GET` | `/api/communities` | List all matrimonial communities | Public |
| `GET` | `/api/plans` | Fetch available membership plans | Public |
| `GET` | `/api/blogs` | Fetch published matrimonial blogs | Public |

---

## 🌐 Deployment (cPanel & VPS)

### cPanel Setup:
1. Upload backend files into your `public_html` or designated subdomain folder.
2. In cPanel, navigate to **Setup Node.js App**:
   - **Application root**: Path to your server folder
   - **Application startup file**: `app.js`
   - **Node.js version**: 18.x or 20.x
3. Click **Run NPM Install**.
4. Set environment variables in the cPanel Node.js interface or `.env`.
5. Restart the application.

---

## 📄 License
This project is licensed under the ISC License.
