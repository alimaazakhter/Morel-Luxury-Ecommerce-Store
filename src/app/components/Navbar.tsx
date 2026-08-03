import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  Sun,
  Moon,
  LayoutDashboard,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useTheme } from "../context/ThemeContext";
import { CATEGORIES } from "../data/mockData";
import { CommandPalette } from "./CommandPalette";

export function Navbar() {
  const { cartCount, wishlist, user, searchQuery, setSearchQuery } = useShop();
  const { theme, toggleTheme } = useTheme();
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--background)]/95 backdrop-blur-md border-b border-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span
              style={{ fontFamily: "var(--font-display)" }}
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              MØREL
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {CATEGORIES.map((c) => (
              <Link
                key={c.name}
                to={`/products?category=${c.name}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Command Palette Search Trigger */}
            <button
              onClick={() => setCmdPaletteOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-muted-foreground hover:text-foreground rounded-md text-xs transition-colors border border-border"
              title="Search products (Ctrl+K)"
            >
              <Search size={14} />
              <span className="hidden sm:inline">Search…</span>
              <kbd className="hidden sm:inline text-[10px] font-mono bg-background border border-border px-1.5 py-0.5 rounded text-muted-foreground ml-1">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link
              to="/account"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary relative"
              title="Account"
            >
              <User size={18} />
              {user && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent" />
              )}
            </Link>
            <Link
              to="/account?tab=wishlist"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary relative"
              title="Wishlist"
            >
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-medium">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary relative"
              title="Cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.name}
                to={`/products?category=${c.name}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-left py-1 text-foreground"
              >
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
      />
    </>
  );
}
