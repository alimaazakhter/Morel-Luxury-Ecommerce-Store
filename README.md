# 🏛️ MØREL — Luxury E-Commerce & Business Analytics Platform

[![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple.svg?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-v12-pink.svg)](https://motion.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

MØREL is a production-grade, luxury e-commerce web application and business intelligence platform built using modern Web technologies including **React 18, TypeScript, Vite 6, Tailwind CSS v4, and Motion**. It delivers a high-end editorial shopping experience for customers alongside a password-protected analytics dashboard for store management.

---

## 🛠️ Tech Stack & Architectural Decisions

| Layer / Library | Technology | Architectural Purpose & Implementation |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** | Declarative, component-based UI model utilizing custom React Context for global state management. |
| **Type Safety** | **TypeScript 5.7** | Enforces strict interfaces (`Product`, `Order`, `User`, `CartItem`) to eliminate runtime errors and ensure reliable data flow. |
| **Build & Bundler** | **Vite 6** | Provides instantaneous Hot Module Replacement (HMR) and optimized production assets compilation. |
| **Styling Engine** | **Tailwind CSS v4** | Custom theme variables (`theme.css`), dark mode tokens, glassmorphism UI, and responsive grid layouts. |
| **Routing** | **React Router v7** | Client-side Single Page Application (SPA) routing with real-time URL search parameters synchronization (`useSearchParams`). |
| **Animation Engine** | **Motion (v12)** | Hardware-accelerated animations for route page transitions (`PageTransition`), hover elevation, and interactive 3D card flips. |
| **Data Visualization** | **Recharts** | Renders interactive, SVG-based Area Charts and Donut Pie Charts inside the Admin Portal. |

---

## 🛍️ Customer Storefront & UX Engineering

### **A. Global State Architecture (`ShopContext.tsx`)**
- **Cart & Subtotal Engine**: Real-time cart calculations including item quantities, subtotal, tax estimations, and a dynamic **$200 threshold free-shipping progress tracker**.
- **Wishlist Synchronization**: One-click product bookmarking saved directly to browser `localStorage`.
- **Session Management**: Authenticated user session persistence handling sign-in, user profile updates, and sign-out workflows.

### **B. Command Palette (`CommandPalette.tsx`)**
- Triggered globally via **`Ctrl + K`** (Windows) or **`Cmd + K`** (Mac).
- Enables instant keyboard-driven product search, direct page navigation, and one-click dark/light theme switching.

### **C. Luxury 50/50 Split-Screen Authentication (`LoginPage.tsx`)**
- Features an editorial brand showcase on the left with subtle pan/zoom background motion and perk highlights.
- Right-side glassmorphic form with single-click **Google** and **Apple** social logins, password visibility toggles, and smooth tab switching between *Sign In* and *Create Account*.

### **D. Interactive 3D Credit Card Checkout (`CheckoutPage.tsx`)**
- Features a visual 3D credit card preview that **automatically flips 180°** in 3D space when the user focuses on the CVV input field.

### **E. Interactive Address Management (`AccountPage.tsx`)**
- Full CRUD shipping address manager allowing users to add, edit, delete, and set default shipping locations.

---

## 🔒 Staff Admin & Analytics Portal (`/admin`)

To ensure a realistic shopper experience, administrative features are removed from public navbar headers and discreetly accessible via the footer as **"Staff Portal"**.

```
                        ┌─────────────────────────┐
                        │     /admin Access       │
                        └────────────┬────────────┘
                                     │
                         [ Passcode Lock Screen ]
                         (PIN: 1234 or admin123)
                                     │
                        ┌────────────┴────────────┐
                        ▼                         ▼
            [ Business Analytics ]       [ Inventory Alerts ]
            - Total Revenue              - Low-Stock Warnings
            - Order Count                - Active Customers
            - Category Sales %           - Time Range Filters
```

### **Security & Access Control**
- Protected by a security passcode lock screen requiring PIN authentication (`1234` or `admin123`) before rendering sensitive revenue reports.

### **Business Intelligence Metrics**
1. **Executive KPI Cards**: Real-time display of key financial metrics:
   - **Total Revenue**: $142,850 (+18.4% growth)
   - **Total Orders**: 1,248 orders fulfilled
   - **Active Customers**: 892 registered members
   - **Average Order Value (AOV)**: $114.46

2. **Revenue Trajectory Chart (`Recharts AreaChart`)**:
   - Visualizes sales performance over customizable timeframes (*7 Days, 30 Days, 90 Days, 1 Year*) with smooth gradient fills and hover tooltips.

3. **Category Breakdown (`Recharts PieChart`)**:
   - Donut chart displaying revenue distribution across product lines (*Bags, Clothing, Accessories, Home*).

4. **Inventory Control & Stock Warnings**:
   - Real-time stock alerts flagging products near depletion (e.g., *"Only 3 left in stock"*) to facilitate timely reordering.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/alimaazakhter/Morel-Luxury-Ecommerce-Store.git
   cd Morel-Luxury-Ecommerce-Store
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).