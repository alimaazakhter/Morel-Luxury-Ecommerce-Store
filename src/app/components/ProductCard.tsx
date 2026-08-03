import { Link } from "react-router";
import { motion } from "motion/react";
import { Heart, Eye } from "lucide-react";
import { Product } from "../types/ecommerce";
import { useShop } from "../context/ShopContext";
import { StarDisplay } from "./StarDisplay";
import { fmt } from "../utils/formatters";

export function ProductCard({ product: p }: { product: Product }) {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const inWishlist = wishlist.includes(p.id);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex flex-col h-full bg-card rounded-md border border-border p-3 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative rounded-md overflow-hidden bg-stone-100 aspect-[3/4] mb-3">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {p.originalPrice && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded-sm shadow-sm">
            SALE
          </span>
        )}
        {p.stock === 0 && (
          <span className="absolute top-3 left-3 bg-stone-800 text-white text-xs font-semibold px-2 py-0.5 rounded-sm">
            SOLD OUT
          </span>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => toggleWishlist(p.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
              inWishlist
                ? "bg-accent text-white"
                : "bg-white/90 text-stone-700 hover:bg-white"
            }`}
          >
            <Heart size={14} className={inWishlist ? "fill-white" : ""} />
          </motion.button>
          <Link
            to={`/product/${p.id}`}
            className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-stone-700 hover:bg-white transition-colors"
          >
            <Eye size={14} />
          </Link>
        </div>
        {p.stock > 0 && p.stock <= 5 && (
          <div className="absolute bottom-3 left-3 right-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm rounded-sm px-2 py-1 text-xs text-amber-700 dark:text-amber-400 font-medium">
            Only {p.stock} left
          </div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <Link to={`/product/${p.id}`} className="text-left w-full block">
          <p className="text-xs text-muted-foreground mb-0.5">{p.brand}</p>
          <p className="text-sm font-medium text-foreground leading-snug mb-1 group-hover:underline underline-offset-2">
            {p.name}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <StarDisplay rating={p.rating} size={11} />
            <span className="text-xs text-muted-foreground">({p.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{fmt(p.price)}</span>
            {p.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {fmt(p.originalPrice)}
              </span>
            )}
          </div>
        </Link>
        {p.stock > 0 && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => addToCart(p)}
            className="mt-3 w-full py-2 text-xs font-semibold border border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors rounded-sm"
          >
            Add to Cart
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
