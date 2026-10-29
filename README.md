# 💍 Shubh Muhurat Matrimonial (शुभ मुहूर्त)
### *Next-Generation Vedic & Modern Matrimonial Matchmaking Platform*

[![React Version](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x%20|%2020.x-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21.0-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/Database-MySQL%20%7C%20Sequelize-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary%20%2F%20Private-red.svg)](#)

---

## 📖 Executive Summary

**Shubh Muhurat Matrimonial** is an enterprise-ready, full-stack matrimonial matchmaking portal engineered to unite timeless Vedic cultural values with cutting-edge digital experiences. Designed with a mobile-first, high-performance architecture, the platform empowers families and individuals to discover meaningful life partnerships within safe, verified, and community-centric networks.

The repository houses the complete source code for both the **Frontend Client** and **Backend API Server**, along with production-ready database schemas and comprehensive deployment documentation.

---

## ✨ Key Highlights & Features

### 👤 User Experience & Matchmaking
- **Rich Profile Exploration**: Multi-attribute search and filtration by religion, community, education, profession, and astrological parameters (Kundali, Manglik dosha, Rashi, Nakshatra).
- **Privacy-First Security**: Protected user photos, privacy controls, blur-photo options, and watermarked assets to protect candidate confidentiality.
- **Vedic Match Insights**: Gothra, Horoscope, and Nakshatra compatibility indicators.
- **Fast Registration Flow**: Multi-step intuitive onboarding modal with instant client-side validation.
- **Direct Engagement**: WhatsApp direct messaging integration, instant lead inquiry forms, and contact modals.

### 🛡️ Administrative Portal (`/admin`)
- **Centralized Dashboard**: Real-time management of registered member profiles and verification statuses.
- **Dynamic Content Management (CMS)**: Modify Hero headlines, subtext, call-to-actions, and statistics in real-time without modifying code.
- **Community Categories**: Add, edit, or toggle religious and regional community listings.
- **Editorial & Success Stories**: Publish and edit wedding stories, blogs, and authentic testimonials.
- **Lead Capture & Inquiry Tracking**: Inspect user consultation requests and contact submissions.

### ⚡ Architectural & Performance Engineering
- **React 19 & Vite**: Ultra-fast build pipeline, hydration, and fluid UI interactions with Framer Motion and Lucide icons.
- **Secure Backend API**: Node.js & Express REST endpoints safeguarded with Helmet security headers, rate limiting (`express-rate-limit`), CORS protection, and compression.
- **Sequelize ORM & MySQL**: Strongly-typed schemas with relational integrity, indexing, and seamless migration capability.
- **Automated Communication**: Nodemailer SMTP engine for dispatching administrative alerts and transactional notifications.
- **SEO & Social Optimization**: Dynamic sitemap generator (`generate-sitemap.js`), OpenGraph meta tags, prerendering script, and search engine directives (`robots.txt`).

---

## 🏗️ Repository Architecture

This repository is organized as a clean full-stack monorepo:

```text
Shubh_Muhurat/
│
├── matrimonial-client/               # Frontend Application (React 19 + Vite)
│   ├── src/
│   │   ├── assets/                   # Logos, brand badges, and static vector graphics
│   │   ├── components/               # Navbar, Hero, AdminPanel, RegistrationModal, etc.
│   │   ├── context/                  # ContentContext (CMS state management)
│   │   ├── pages/                    # Home, About, Blogs, SuccessStories, Legal pages
│   │   ├── App.jsx                   # Master layout and client routes
│   │   └── main.jsx                  # React application entry point
│   ├── public/                       # Static public assets, robots.txt, sitemap.xml, .htaccess
│   ├── .env.example                  # Frontend environment configuration template
│   ├── package.json                  # Frontend dependencies and build scripts
│   ├── vite.config.js                # Vite build and development configuration
│   └── tailwind.config.js            # Design tokens, color palette, and styling rules
│
├── Matrimonial-server/               # Backend API Server (Node.js + Express + Sequelize MVC)
│   ├── config/                       # Database connection setup (db.js)
│   ├── controllers/                  # Business logic (auth, blogs, users, communities, stories, etc.)
│   ├── middlewares/                  # Custom middlewares (CORS whitelist, DB lazy connection, errors)
│   ├── models/                       # Sequelize Data Models (User, Blog, Community, Story, Plan, etc.)
│   ├── routes/                       # Modular Express routes & index aggregator
│   ├── services/                     # Email service & Nodemailer SMTP transporter
│   ├── data/                         # Production Database Backups
│   │   ├── mysql_import.sql          # Ready-to-import full MySQL database dump
│   │   └── db.json                   # JSON dump of database seed records
│   ├── app.js                        # Express app configuration & middleware pipeline
│   ├── server.js                     # Server launcher
│   ├── .env.example                  # Backend environment configuration template
│   ├── .htaccess                     # LiteSpeed / Apache Passenger deployment rules
│   └── package.json                  # Server dependencies
│
├── PROJECT_SETUP_AND_BACKUP_GUIDE.md # Comprehensive restoration and disaster recovery guide
├── .gitignore                        # Git ignore rules for node_modules, build, and credentials
└── README.md                         # Master repository documentation (this file)
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: `v18.x` or `v20.x` (LTS recommended)
- **Database**: **MySQL 8.0+** or **MariaDB** (via XAMPP, Laragon, Docker, or Cloud MySQL)
- **Git** & **npm**

---

### 1. Database Restoration
1. Create a fresh MySQL database:
   ```sql
   CREATE DATABASE matrimonial_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Import the included database dump:
   - **Via MySQL CLI**:
     ```bash
     mysql -u root -p matrimonial_db < Matrimonial-server/data/mysql_import.sql
     ```
   - **Via phpMyAdmin**:
     Select `matrimonial_db` ➔ Click **Import** ➔ Choose `Matrimonial-server/data/mysql_import.sql` ➔ Click **Go**.

---

### 2. Backend Server Setup
1. Navigate to the server folder:
   ```bash
   cd Matrimonial-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` configuration file from the template:
   ```bash
   cp .env.example .env
   ```
4. Configure your `.env` parameters:
   ```env
   PORT=5000
   NODE_ENV=development

   # Database Settings
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=matrimonial_db
   MYSQL_PORT=3306

   # Administrative Access
   ADMIN_USER=admin
   ADMIN_PASS=admin123

   # Allowed CORS Origins
   CORS_ORIGIN=http://localhost:5173,http://localhost:3000

   # Email Alerts (SMTP)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```
5. Launch the backend:
   - Development Mode (with auto-reload):
     ```bash
     npm run dev
     ```
   - Standard Mode:
     ```bash
     npm start
     ```
   - Verified Endpoint: `http://localhost:5000/api/health`

---

### 3. Frontend Client Setup
1. In a separate terminal, navigate to the client folder:
   ```bash
   cd matrimonial-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Set the API URL:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_SITE_URL=http://localhost:5173
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser at: **`http://localhost:5173`**

---

## 📡 Key REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint returning server and DB status |
| `POST` | `/api/register` | Submit new user profile registration |
| `POST` | `/api/inquiry` | Submit contact inquiry or consultation request |
| `GET` | `/api/content` | Retrieve dynamic CMS content (Hero, stats, banners) |
| `POST` | `/api/admin/content` | Update dynamic CMS content (Admin auth required) |
| `GET` | `/api/blogs` | Fetch all published matrimonial guidance articles |
| `GET` | `/api/communities` | Retrieve list of active religious & regional communities |
| `GET` | `/api/testimonials` | Retrieve verified member testimonials |
| `GET` | `/api/stories` | Retrieve successful marriage stories |

---

## 🌐 Production Deployment Guidelines

### Frontend Deployment (cPanel / Apache / Vercel / Netlify)
- Execute the production build:
  ```bash
  cd matrimonial-client
  npm run build
  ```
- Upload the contents of the generated `dist/` directory directly to `public_html` or your domain document root.
- The included `.htaccess` file inside `public/` automatically handles Single Page Application (SPA) routing, ensuring smooth navigation without 404 errors on page refresh.

### Backend Deployment (cPanel / Phusion Passenger / VPS)
- Upload the `Matrimonial-server/` files (excluding `node_modules`).
- In cPanel **Setup Node.js App**:
  - **Application Root**: `api` (or folder name)
  - **Application Startup File**: `app.js`
  - **Node.js Version**: `18.x` or `20.x`
- Run `npm install` and define production environment variables in the cPanel interface.
- Restart the Node.js application.

---

## 🔒 Security Best Practices
- **No Secrets in Version Control**: `.env` files are strictly excluded via `.gitignore`. Always maintain configuration using `.env.example` templates.
- **SQL Sanitization**: All database communications are handled through Sequelize parameterized queries, mitigating SQL injection risks.
- **Cross-Site Scripting (XSS) & Header Protections**: Express uses Helmet and CORS origin whitelisting.

---

## 👥 Credits & Contact
- **Author & Maintainer**: Aurav Pandey ([@aurav2001](https://github.com/aurav2001))
- **Project**: Shubh Muhurat Matrimonial (शुभ मुहूर्त)
- **Repository**: [https://github.com/aurav2001/Shubh_Muhurat](https://github.com/aurav2001/Shubh_Muhurat)
