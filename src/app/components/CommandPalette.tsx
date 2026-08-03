import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingBag, LayoutDashboard, Sun, Moon, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useTheme } from "../context/ThemeContext";
import { fmt } from "../utils/formatters";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { products } = useShop();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3 border-b border-border bg-secondary/50">
            <Search size={18} className="text-muted-foreground mr-3" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search products…"
              className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
            />
            <span className="text-[10px] font-mono border border-border px-1.5 py-0.5 rounded text-muted-foreground">
              ESC
            </span>
          </div>

          <div className="max-h-96 overflow-y-auto p-2 space-y-4">
            {/* Quick Actions */}
            {!query && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-1">
                  Quick Actions
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleSelect("/products")}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag size={14} className="text-accent" /> Browse All Products
                    </span>
                    <ArrowRight size={12} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => handleSelect("/admin")}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <LayoutDashboard size={14} className="text-emerald-600" /> Store Analytics & Admin Dashboard
                    </span>
                    <ArrowRight size={12} className="text-muted-foreground" />
                  </button>
                  <button
                    onClick={() => {
                      toggleTheme();
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-foreground"
                  >
                    <span className="flex items-center gap-2">
                      {theme === "light" ? <Moon size={14} /> : <Sun size={14} />} Switch to {theme === "light" ? "Dark" : "Light"} Mode
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Product Suggestions */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-1">
                {query ? "Matching Products" : "Suggested Products"}
              </p>
              {filteredProducts.length === 0 ? (
                <p className="text-xs text-muted-foreground p-3 text-center">
                  No matching products found.
                </p>
              ) : (
                <div className="space-y-1">
                  {filteredProducts.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(`/product/${p.id}`)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-secondary transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-8 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium text-foreground text-xs leading-tight">
                            {p.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {p.brand} · {p.category}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-foreground">
                        {fmt(p.price)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
