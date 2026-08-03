import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import { ShopProvider } from "./context/ShopContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { HomePage } from "./pages/HomePage";
import { ProductListingPage } from "./pages/ProductListingPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";
import { AccountPage } from "./pages/AccountPage";
import { TrackingPage } from "./pages/TrackingPage";
import { AdminPage } from "./pages/AdminPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const location = useLocation();
  const hideFooter = ["/login", "/checkout", "/confirmation"].includes(
    location.pathname
  );

  return (
    <div
      className="min-h-screen bg-background text-foreground flex flex-col justify-between transition-colors duration-300"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ShopProvider>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </ShopProvider>
    </ThemeProvider>
  );
}
