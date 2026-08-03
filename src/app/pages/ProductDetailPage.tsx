import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  Home,
  ChevronRight,
  Minus,
  Plus,
  Heart,
  CheckCircle,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { StarDisplay } from "../components/StarDisplay";
import { fmt } from "../utils/formatters";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { products, wishlist, toggleWishlist, addToCart } = useShop();

  const p = products.find((product) => product.id === id);

  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("M");
  const [addedToast, setAddedToast] = useState(false);

  if (!p) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-accent hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const inWishlist = wishlist.includes(p.id);
  const SIZES = ["XS", "S", "M", "L", "XL"];

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({ ...p });
    }
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">
          <Home size={12} />
        </Link>
        <ChevronRight size={12} />
        <Link
          to={`/products?category=${p.category}`}
          className="hover:text-foreground"
        >
          {p.category}
        </Link>
        <ChevronRight size={12} />
        <span className="text-foreground">{p.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            {p.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={`w-16 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                  i === imgIdx ? "border-foreground" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${p.name} view ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] rounded-md overflow-hidden bg-stone-100">
            <img
              src={p.images[imgIdx]}
              alt={p.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="lg:pt-4">
          <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
            {p.brand}
          </p>
          <h1
            style={{ fontFamily: "var(--font-display)" }}
            className="text-3xl font-semibold leading-tight mb-3"
          >
            {p.name}
          </h1>
          <div className="flex items-center gap-3 mb-4">
            <StarDisplay rating={p.rating} size={14} />
            <span className="text-sm text-muted-foreground">
              {p.rating} · {p.reviewCount} reviews
            </span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-semibold">{fmt(p.price)}</span>
            {p.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {fmt(p.originalPrice)}
              </span>
            )}
            {p.originalPrice && (
              <span className="bg-accent/15 text-accent text-xs font-semibold px-2 py-0.5 rounded-sm">
                Save {fmt(p.originalPrice - p.price)}
              </span>
            )}
          </div>

          {/* Stock */}
          <div
            className={`flex items-center gap-2 text-sm mb-5 ${
              p.stock === 0
                ? "text-red-600"
                : p.stock <= 5
                ? "text-amber-600"
                : "text-emerald-700"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                p.stock === 0
                  ? "bg-red-500"
                  : p.stock <= 5
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              }`}
            />
            {p.stock === 0
              ? "Out of Stock"
              : p.stock <= 5
              ? `Only ${p.stock} left in stock`
              : "In Stock"}
          </div>

          {/* Size */}
          {(p.category === "Clothing" || p.category === "Accessories") && (
            <div className="mb-5">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                Size
              </p>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-10 h-10 text-sm font-medium rounded-md border transition-colors ${
                      size === s
                        ? "border-foreground bg-foreground text-primary-foreground"
                        : "border-border hover:border-stone-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          {p.stock > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 border border-border rounded-md flex items-center justify-center hover:border-stone-400 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span
                  style={{ fontFamily: "var(--font-mono)" }}
                  className="text-sm w-6 text-center font-medium"
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty(Math.min(p.stock, qty + 1))}
                  className="w-9 h-9 border border-border rounded-md flex items-center justify-center hover:border-stone-400 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAdd}
              disabled={p.stock === 0}
              className="flex-1 py-3 text-sm font-semibold bg-accent text-accent-foreground rounded-md hover:bg-amber-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md cursor-pointer"
            >
              {p.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
            <button
              onClick={() => toggleWishlist(p.id)}
              className={`w-12 border rounded-sm flex items-center justify-center transition-colors ${
                inWishlist
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border hover:border-stone-400"
              }`}
            >
              <Heart size={16} className={inWishlist ? "fill-accent" : ""} />
            </button>
          </div>

          {/* Toast */}
          {addedToast && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm px-4 py-2.5 rounded-md mb-6">
              <CheckCircle size={16} /> Added to cart!
            </div>
          )}

          <p className="text-sm leading-relaxed text-muted-foreground">
            {p.description}
          </p>

          <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4 text-center">
            {[
              ["Free Shipping", "On orders over $200"],
              ["Easy Returns", "Within 30 days"],
              ["Secure Payment", "Encrypted & safe"],
            ].map(([t, s]) => (
              <div key={t}>
                <p className="text-xs font-semibold text-foreground">{t}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-20 border-t border-border pt-12">
        <h2
          style={{ fontFamily: "var(--font-display)" }}
          className="text-2xl font-semibold mb-8"
        >
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="flex flex-col items-start gap-2">
            <p
              style={{ fontFamily: "var(--font-display)" }}
              className="text-6xl font-semibold"
            >
              {p.rating}
            </p>
            <StarDisplay rating={p.rating} size={20} />
            <p className="text-sm text-muted-foreground">
              {p.reviewCount} reviews
            </p>
            {[5, 4, 3, 2, 1].map((s) => {
              const count = p.reviews.filter(
                (r) => Math.round(r.rating) === s
              ).length;
              const pct = p.reviews.length
                ? (count / p.reviews.length) * 100
                : 0;
              return (
                <div key={s} className="flex items-center gap-2 w-full">
                  <span className="text-xs w-3">{s}</span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="lg:col-span-2 space-y-6">
            {p.reviews.map((r) => (
              <div key={r.id} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold">{r.author}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                  <StarDisplay rating={r.rating} size={13} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {r.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
