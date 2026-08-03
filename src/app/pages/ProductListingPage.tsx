import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  SlidersHorizontal,
  Grid,
  List,
  Package,
  Home,
  ChevronRight,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { ProductCard } from "../components/ProductCard";
import { StarDisplay } from "../components/StarDisplay";
import { PageTransition } from "../components/PageTransition";
import { fmt } from "../utils/formatters";

export function ProductListingPage() {
  const { products, searchQuery, addToCart } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState("Featured");
  const [priceMax, setPriceMax] = useState(800);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  let filtered = products;
  if (selectedCategory !== "All") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }
  if (searchQuery) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  filtered = filtered.filter((p) => p.price <= priceMax);

  if (sortBy === "Price: Low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }
  if (sortBy === "Price: High") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }
  if (sortBy === "Rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">
            <Home size={12} />
          </Link>
          <ChevronRight size={12} />
          <span>Products</span>
          {searchQuery && (
            <>
              <ChevronRight size={12} />
              <span>"{searchQuery}"</span>
            </>
          )}
        </div>

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-semibold"
            >
              {searchQuery
                ? `Results for "${searchQuery}"`
                : selectedCategory === "All"
                ? "All Products"
                : selectedCategory}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filtered.length} products
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md border transition-colors ${
                showFilters
                  ? "border-accent bg-accent text-accent-foreground font-semibold shadow-sm"
                  : "border-border hover:border-foreground text-foreground"
              }`}
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-secondary border border-border rounded-md px-3 py-1.5 outline-none cursor-pointer text-foreground"
            >
              {["Featured", "Price: Low", "Price: High", "Rating"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <div className="hidden sm:flex items-center border border-border rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                <Grid size={14} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 224, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden flex-shrink-0"
              >
                <div className="w-56 sticky top-24 space-y-8 pr-4">
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                      Category
                    </p>
                    <div className="space-y-1">
                      {categories.map((c) => (
                        <button
                          key={c}
                          onClick={() => handleCategoryChange(c)}
                          className={`block w-full text-left text-xs font-medium px-3 py-2 rounded-lg transition-all ${
                            selectedCategory === c
                              ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                              : "hover:bg-secondary text-foreground"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
                      Max Price
                    </p>
                    <input
                      type="range"
                      min={50}
                      max={800}
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      className="w-full accent-amber-600"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Up to {fmt(priceMax)}
                    </p>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid / List */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Package size={40} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <motion.div
                layout
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {filtered.map((p) =>
                  viewMode === "grid" ? (
                    <ProductCard key={p.id} product={p} />
                  ) : (
                    <div
                      key={p.id}
                      className="flex gap-5 bg-card rounded-md p-4 border border-border hover:border-stone-300 transition-colors"
                    >
                      <div className="w-28 h-36 rounded-md overflow-hidden bg-stone-100 flex-shrink-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {p.brand}
                          </p>
                          <Link
                            to={`/product/${p.id}`}
                            className="font-medium text-foreground hover:underline underline-offset-2 mt-0.5 block"
                          >
                            {p.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-1 mb-2">
                            <StarDisplay rating={p.rating} size={11} />
                            <span className="text-xs text-muted-foreground">
                              ({p.reviewCount})
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {p.description.slice(0, 120)}…
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{fmt(p.price)}</span>
                            {p.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {fmt(p.originalPrice)}
                              </span>
                            )}
                          </div>
                          {p.stock > 0 && (
                            <button
                               onClick={() => addToCart(p)}
                               className="px-4 py-2 text-xs font-semibold border border-border text-foreground bg-secondary hover:bg-accent hover:text-accent-foreground transition-all rounded-lg shadow-sm cursor-pointer"
                             >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
