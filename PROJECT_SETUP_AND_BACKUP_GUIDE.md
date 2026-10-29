# 💍 Shubh Muhurat Matrimonial - Complete Project Backup & Restore Guide

Welcome to the **Shubh Muhurat Matrimonial** master documentation. This guide contains everything needed to restore, configure, develop, and deploy the entire platform (Frontend + Backend + Database) from scratch on any machine or server.

---

## 📌 Repository & Version Control Links

Both repositories are hosted on GitHub and synchronized with the latest `main` branch:

- **Backend Repository:** [https://github.com/aurav2001/Matrimonial-server.git](https://github.com/aurav2001/Matrimonial-server.git)
- **Frontend Repository:** [https://github.com/aurav2001/matrimonial-client.git](https://github.com/aurav2001/matrimonial-client.git)

---

## 📦 Backup Structure Overview

When you extract `Matrimonial_Full_Project_Backup.zip`, you get the complete clean source code without bloated `node_modules`:

```
Matrimonial/
├── matrimonial-client/               # React 19 + Vite Frontend Application
│   ├── src/                          # UI Components, Pages, State Context, CSS
│   ├── public/                       # Static assets, robots.txt, sitemap.xml, .htaccess
│   ├── .env.example                  # Environment configuration template
│   ├── .env.backup                   # Preserved working environment variables
│   ├── package.json                  # Frontend dependencies and build scripts
│   ├── vite.config.js                # Vite build config
│   └── tailwind.config.js            # Styling configurations
│
├── Matrimonial-server/               # Node.js + Express + Sequelize Backend Server
│   ├── app.js                        # API routes, middlewares & controllers
│   ├── server.js                     # Server entry point
│   ├── config/                       # Database connection configuration (db.js)
│   ├── models/                       # Sequelize schemas (User, Blog, Community, etc.)
│   ├── data/                         # CRITICAL DATABASE BACKUPS:
│   │   ├── mysql_import.sql          # Full MySQL database dump (schemas + seed records)
│   │   └── db.json                   # JSON dump of database data
│   ├── .env.example                  # Backend environment template
│   ├── .env.backup                   # Preserved working database & SMTP credentials
│   ├── .htaccess                     # Apache / Phusion Passenger server config
│   └── package.json                  # Server dependencies
│
└── PROJECT_SETUP_AND_BACKUP_GUIDE.md # This guide
```

---

## 🚀 How to Restore and Run the Project

### Prerequisites
- **Node.js**: v18.x or v20.x
- **MySQL**: v8.0+ or MariaDB (e.g., via XAMPP, Laragon, Docker, or cPanel MySQL)
- **Git** & **npm**

---

### Step 1: Database Setup & Restoration

1. Open your MySQL client (e.g., **phpMyAdmin**, **MySQL Workbench**, or MySQL CLI).
2. Create a database named `matrimonial_db` (or your preferred database name):
   ```sql
   CREATE DATABASE matrimonial_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Import the database dump:
   - **Using MySQL CLI:**
     ```bash
     mysql -u root -p matrimonial_db < Matrimonial-server/data/mysql_import.sql
     ```
   - **Using phpMyAdmin:**
     - Select `matrimonial_db`.
     - Click **Import** > Choose File: `Matrimonial-server/data/mysql_import.sql` > Click **Import / Go**.

---

### Step 2: Backend Setup & Execution

1. Navigate to the backend directory:
   ```bash
   cd Matrimonial-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` file:
   - Copy `.env.example` or use `.env.backup`:
     ```bash
     cp .env.example .env
     ```
   - Verify values in `.env`:
     ```env
     PORT=5000
     NODE_ENV=development

     # MySQL Database credentials
     MYSQL_HOST=localhost
     MYSQL_USER=root
     MYSQL_PASSWORD=your_password
     MYSQL_DATABASE=matrimonial_db
     MYSQL_PORT=3306

     # Admin Portal Credentials
     ADMIN_USER=admin
     ADMIN_PASS=admin123

     # CORS Allowed Origins
     CORS_ORIGIN=http://localhost:5173,http://localhost:3000,https://shubhmuhurat.biz

     # Email Notifications (Gmail SMTP / App Password)
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=465
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_gmail_app_password
     ```
4. Start the server:
   - Development mode (with auto-reload):
     ```bash
     npm run dev
     ```
   - Production / Standard mode:
     ```bash
     npm start
     ```
   - API will be accessible at: `http://localhost:5000` (Health check: `http://localhost:5000/api/health`)

---

### Step 3: Frontend Setup & Execution

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd matrimonial-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` file:
   - For local development:
     ```env
     VITE_API_URL=http://localhost:5000/api
     VITE_SITE_URL=http://localhost:5173
     ```
   - For production:
     ```env
     VITE_API_URL=https://api.shubhmuhurat.biz/api
     VITE_SITE_URL=https://shubhmuhurat.biz
     ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   - Frontend will open at: `http://localhost:5173`

---

## 🌐 Production Deployment Summary

### Frontend Deployment (cPanel / Apache / Vercel / Netlify):
- Run `npm run build` in `matrimonial-client`.
- The output folder is `dist/`.
- Upload the contents of `dist/` directly into `public_html` (or your subdomain folder).
- Ensure `.htaccess` (included in `public/` and copied to `dist/`) is present to route all SPA traffic to `index.html`.

### Backend Deployment (cPanel / Phusion Passenger / VPS):
- Upload `Matrimonial-server` source files (excluding `node_modules`).
- In cPanel **Setup Node.js App**:
  - Application root: `api` (or `Matrimonial-server`)
  - Application startup file: `app.js`
  - Node version: 18.x or 20.x
  - Run `npm install` via cPanel terminal or GUI.
  - Set Environment Variables or ensure `.env` is loaded.
  - Restart the application.

---

## 🔐 Key Credentials & Administrative Endpoints

- **Admin Login Page:** `/admin` on the frontend
- **Default Admin Username:** `admin` (or defined in `ADMIN_USER`)
- **Default Admin Password:** defined in `ADMIN_PASS`
- **Main API Routes:**
  - `GET /api/health` - Server health status
  - `POST /api/inquiry` - Contact & Hero leads
  - `POST /api/register` - Matrimonial user registration
  - `GET /api/content` - Dynamic CMS content
  - `POST /api/admin/content` - Update CMS content
  - `GET /api/blogs` - Blog listing
  - `GET /api/testimonials` - Testimonials listing
  - `GET /api/communities` - Community categories

---
*Created as a complete, reliable archive for Shubh Muhurat Matrimonial.*
