# 💍 Shubh Muhurat Matrimonial - Frontend Web Application

A modern, responsive, and high-performance matrimonial web application built with **React 18**, **Vite**, and **Modern CSS**. Designed specifically for matrimonial and matchmaking services, **Shubh Muhurat** offers an intuitive, visually stunning experience across mobile, tablet, and desktop devices.

---

## 🌟 Key Features

- **📱 Fully Responsive & Mobile-Optimized:**
  - Tailored layout for all screen sizes (Smartphones, iPads, Laptops, 4K displays).
  - Smooth mobile navigation drawer, touch-friendly cards, and responsive forms.
- **✨ Dynamic Hero Section & Lead Capture:**
  - Interactive partner search filter (Looking for Bride/Groom, Mother Tongue, Age, Location).
  - Quick inquiry form with instant backend email dispatch.
- **📝 Comprehensive Profile Registration Modal:**
  - Multi-attribute registration flow (Full Name, Date of Birth, Gender, Marital Status, Phone, Email).
  - Real-time client-side validation and feedback notifications.
- **⚙️ Live Admin CMS Panel:**
  - Built-in secure administration portal (`/admin`).
  - Manage hero banners, success stories, customer testimonials, community cards, pricing plans, and blogs with instant live updates.
- **🔍 Advanced SEO & Pre-rendering:**
  - Automated XML sitemap generation (`generate-sitemap.js`).
  - Static HTML pre-rendering (`prerender.js`) for lightning-fast First Contentful Paint (FCP) and optimal Google/Bing indexing.
- **⚖️ Complete Legal & Policy Suite:**
  - Dedicated pages for Privacy Policy, Terms of Use, Refund Policy, and Cookie Policy.
- **🎨 Premium Visual Identity:**
  - Traditional yet modern Indian wedding aesthetics using royal burgundy (`#C62828`), gold accents (`#C5963A`), and clean typography.

---

## 🛠️ Technology Stack

- **Framework:** [React 18](https://react.dev/)
- **Build Tool & Bundler:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router DOM v6](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Modern Vanilla CSS with CSS Variables & Responsive Media Queries
- **SEO Tools:** Custom Node.js Pre-renderer & Sitemap Generator

---

## 📂 Project Structure

```
matrimonial-client/
├── public/
│   ├── .htaccess             # Apache rewrite rules for Single Page Application (SPA)
│   ├── logomt.png            # Application logo
│   ├── robots.txt            # Search crawler directives
│   └── sitemap.xml           # Dynamic SEO sitemap
├── src/
│   ├── assets/               # Brand logos and static images
│   ├── components/           # Reusable UI components
│   │   ├── AdminPanel.jsx    # Complete CMS dashboard
│   │   ├── CommunitySection.jsx # Communities & matchmaking sectors
│   │   ├── ConnectSection.jsx# Steps to connect & find matches
│   │   ├── Footer.jsx        # Site footer with quick links & policies
│   │   ├── Hero.jsx          # Interactive hero banner & search form
│   │   ├── LoadingScreen.jsx # Initial preloader animation
│   │   ├── Navbar.jsx        # Navigation bar & mobile menu
│   │   ├── RegistrationModal.jsx # Profile registration pop-up
│   │   ├── Testimonials.jsx  # Client reviews & ratings
│   │   └── TrustSection.jsx  # Safety, verification & security badges
│   ├── context/
│   │   └── ContentContext.jsx# React Context for global CMS data state
│   ├── pages/                # Route views
│   │   ├── About.jsx         # About Us page
│   │   ├── BlogDetail.jsx    # Individual blog post reader
│   │   ├── Blogs.jsx         # Articles & matrimonial guides
│   │   ├── Contact.jsx       # Contact us & inquiry form
│   │   ├── CookiePolicy.jsx  # Cookie policy disclosure
│   │   ├── Membership.jsx    # Subscription tiers & benefits
│   │   ├── PrivacyPolicy.jsx # Privacy policy compliance
│   │   ├── RefundPolicy.jsx  # Cancellation & refund terms
│   │   ├── SuccessStories.jsx# Real wedding success stories
│   │   └── TermsOfUse.jsx    # User terms and conditions
│   ├── App.jsx               # Root router & layout wrapper
│   ├── index.css             # Design system & global styles
│   └── main.jsx              # React application entry point
├── generate-sitemap.js       # Dynamic sitemap build script
├── prerender.js              # Build-time SEO prerendering script
├── vite.config.js            # Vite build configuration
├── package.json              # Dependencies & npm scripts
└── .env.example              # Environment variables template
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/aurav2001/matrimonial-client.git
cd matrimonial-client
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root of `matrimonial-client`:
```bash
cp .env.example .env
```

Configure your API endpoints:
```env
# Backend API Base URL
VITE_API_URL=https://api.shubhmuhurat.biz/api

# Site Canonical URL
VITE_SITE_URL=https://shubhmuhurat.biz
```

### 4. Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Builds the optimized production bundle inside `dist/`. |
| `npm run preview` | Previews the production build locally. |
| `node prerender.js` | Generates static HTML for public routes for enhanced SEO. |
| `node generate-sitemap.js` | Refreshes `sitemap.xml` with all site routes. |

---

## 🌐 Production Deployment

### 1. Build the Application:
```bash
npm run build
```

### 2. Deploy to cPanel / Apache:
- Upload the contents of the `dist/` folder into your hosting `public_html` directory.
- Ensure `public_html/.htaccess` contains SPA rewrite rules so client-side routing works on page refreshes:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 📄 License
This project is licensed under the MIT License.
