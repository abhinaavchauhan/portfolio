# 🚀 Abhinav Chauhan | Full-Stack Portfolio

A high-performance, visually stunning portfolio built with a **modular micro-services architecture**. This project combines cutting-edge frontend design with a professional-grade Node.js backend to deliver an exceptional user experience.

---

## ✨ Full-Stack Features

### 🎨 Frontend Excellence
- **Progressive Web App (PWA)**: Fully installable like a native app on mobile and desktop devices.
- **Premium Visuals**: Features a unique, realistic 3D book-themed preloader and dynamic custom cursor.
- **Fluid Animations**: Smooth page transitions, scroll effects, and micro-interactions powered by Framer Motion.
- **Dark/Light Mode**: Complete, seamless thematic adaptation via Tailwind CSS.
- **Admin Dashboard**: Private authenticated section (`/admin`) for managing projects and incoming contact messages.
- **Optimized Performance**: Built with Vite & React 18, utilizing code splitting and rapid HMR for lightning-fast loads.

### ⚙️ Robust Backend
- **Automated Email Service**: Intelligent contact form with professional, automated NodeMailer responses and "Thank You" emails.
- **Security-First Approach**: Hardened with Helmet, Express Rate Limiting, CORS, and Cookie-Parser.
- **Secure Authentication**: JWT-based authentication and Bcrypt password hashing for the admin panel.

---

## 🌟 Featured Project: [DarkProbe](https://github.com/abhinaavchauhan/DarkProbe)
**Intelligent Attack Surface Analysis Engine**
- **Modular Scanner**: Production-ready vulnerability detection for XSS, SQLi, and more.
- **Web Dashboard**: Modern, lightweight alternative to Burp Suite/ZAP.
- **Advanced Reporting**: Generates branded HTML and JSON security reports.

---

## 🏗️ Advanced Modular Architecture

The project is split into two independent yet perfectly synced systems, allowing for seamless scaling and maintenance.

```bash
Portfolio/
├── backend/                     # 🔐 BACKEND SYSTEM (Express)
│   ├── src/
│   │   ├── config/              # App configurations & DB constants
│   │   ├── controllers/         # Business logic layer (Email handling, auth, etc.)
│   │   ├── middleware/          # Security (CORS, Rate Limiting, JSON parsing)
│   │   ├── routes/              # API Endpoint definitions
│   │   ├── services/            # Core reusable logic
│   │   ├── utils/               # Advanced helper functions
│   │   ├── app.js               # Application configuration
│   │   └── server.js            # Server entry & listener
│   ├── .env                     # Backend environment variables
│   └── package.json             # Backend dependencies
│
├── frontend/                   # 🎨 FRONTEND SYSTEM (React + Vite)
│   ├── public/                 # Static global assets (PWA manifest, icons)
│   ├── src/
│   │   ├── assets/             # Media & styling resources
│   │   ├── components/         # Atomic UI units (Preloader, CustomCursor, etc.)
│   │   ├── layouts/            # Page layouts (MainLayout, AdminLayout)
│   │   ├── pages/              # View-level routing (Home, AdminDashboard)
│   │   ├── hooks/              # Custom React logic hooks
│   │   ├── services/           # External API communication (Axios)
│   │   ├── App.jsx             # Root component assembly & Routing
│   │   └── main.jsx            # Vite entry point
│   ├── tailwind.config.js      # Custom design system tokens
│   ├── vite.config.js          # Vite build & PWA configuration
│   └── package.json            # Frontend build scripts
│
├── README.md                   # 📖 Master Documentation
└── package.json                # 🛠️ Root Monorepo Controller
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router v7, Tailwind CSS, Framer Motion, PWA, React-Toastify |
| **Backend** | Node.js, Express, Nodemailer, JWT, bcrypt, Helmet, Rate Limiting |
| **Design** | Premium Glassmorphism, Responsive Dark Mode, Custom Cursor, 3D Book Preloader |
| **Tools** | Concurrently (Parallel Execution), ESLint |

---

## 🚀 Getting Started

### 1. Global Start (Recommended)
You can start both systems simultaneously from the root directory using the monorepo controller:
```bash
npm install
npm run dev
```

### 2. Manual Start
If you prefer running them in separate terminals:
- **Backend**: `cd backend && npm install && npm run dev` (Runs on port 5000)
- **Frontend**: `cd frontend && npm install && npm run dev` (Runs on port 5173 / Local Network)

---

## 🔐 Environment Configuration

Create a `.env` file in the **backend** directory with the following keys:
```env
# Email Configuration (Nodemailer)
VITE_EMAIL_USER=your-email@gmail.com
VITE_EMAIL_PASS=your-app-password

# Server Settings
PORT=5000
NODE_ENV=development

# JWT Secret (for Admin Authentication)
JWT_SECRET=your_super_secret_jwt_key
```

---

## 🎨 Design Philosophy
- **Rich Aesthetics**: Vibrant gradients and glassmorphism for a premium feel.
- **Immersive Micro-Animations**: Uses Framer Motion for interactive, alive-feeling components.
- **Dynamic UX**: Features a custom smart cursor, realistic book loader animations, and snappy page transitions.
- **Accessibility & Speed**: Code splitting, lazy loading, and PWA capabilities ensure an immediate, fluid experience.

---
Developed with ❤️ by [Abhinav Chauhan](https://github.com/abhinaavchauhan)
