# MØREL — Luxury E-Commerce & Analytics Platform

[![React](https://img.shields.io/badge/React-18-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-purple.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Motion](https://img.shields.io/badge/Motion-v12-pink.svg)](https://motion.dev/)

MØREL is a modern, high-end luxury e-commerce platform built with React, Vite, Tailwind CSS v4, and Motion. Designed with an editorial aesthetic, it features an interactive storefront, real-time cart and wishlist state, dark/light theme switching, a 3D animated credit card checkout, a `Ctrl+K` Command Palette, and a full enterprise Sales Analytics Dashboard for store administrators.

---

## ✨ Features

### 🛍️ Storefront & Customer Experience
- **Editorial Design System**: Modern typography (`Playfair Display`, `DM Sans`, `DM Mono`), dark mode glassmorphism, and responsive layouts.
- **Dynamic Catalog & Filtering**: Category selection, real-time search, price range sliders, sorting (Price Low/High, Ratings), and Grid/List view toggles.
- **Product Details & Gallery**: Multi-image view switcher, stock alerts, size selectors, quantity controls, and customer reviews.
- **Shopping Cart & Wishlist**: Global state management with subtotal & free shipping calculator ($200 threshold).
- **Luxury 50/50 Split-Screen Auth**: Editorial brand showcase with social sign-in (Google/Apple) and interactive login/registration modes.

### 💳 Checkout & Security
- **3D Animated Credit Card Preview**: Live visual card preview that flips 180° when the user focuses on the CVV input field.
- **Multi-Step Checkout Workflow**: Progress tracker (Shipping → Payment → Order Review).
- **100% Functional Address Management**: Save, edit, set default, and remove shipping addresses.

### 📊 Enterprise Admin Dashboard & Tools
- **Sales Analytics Dashboard (`/admin`)**: Interactive revenue area charts (`recharts`), category distribution donut charts, key KPI cards, and low-stock alerts.
- **Admin Passcode Lock**: Restricted security gate requiring PIN authentication (`1234` / `admin123`) to unlock business reports.
- **Global Command Palette (`Ctrl+K` / `Cmd+K`)**: Keyboard-driven modal for instant product search, route navigation, and theme toggling.
- **Dark / Light Mode**: Seamless theme switcher with `localStorage` persistence.

---

## 🛠️ Tech Stack

- **Framework & Build Tool**: React 18, Vite 6
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4, CSS Custom Properties
- **Animations**: Motion (v12)
- **Data Visualization**: Recharts
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

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
This project is open source and available under the [MIT License](LICENSE).