import { Link, useNavigate } from "react-router";
import { ShoppingCart, X, Minus, Plus } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { fmt } from "../utils/formatters";

export function CartPage() {
  const { cart, updateCartQty, removeFromCart, user } = useShop();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= 200 ? 0 : 12;
  const total = subtotal + shipping;

  const handleProceedToCheckout = () => {
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1
        style={{ fontFamily: "var(--font-display)" }}
        className="text-3xl font-semibold mb-8"
      >
        Shopping Cart
      </h1>
      {cart.length === 0 ? (
        <div className="text-center py-24">
          <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium mb-2">Your cart is empty</p>
          <p className="text-sm text-muted-foreground mb-6">
            Add some products to get started.
          </p>
          <Link
            to="/products"
            className="inline-block bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold rounded-md hover:bg-amber-600 transition-colors shadow-md"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(({ product: p, quantity }) => (
              <div
                key={p.id}
                className="flex gap-5 bg-card rounded-md p-4 border border-border"
              >
                <div className="w-24 h-32 rounded-md overflow-hidden bg-stone-100 flex-shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">{p.brand}</p>
                      <p className="font-medium text-sm mt-0.5">{p.name}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(p.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="font-semibold mt-2">{fmt(p.price * quantity)}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() =>
                        updateCartQty(p.id, Math.max(0, quantity - 1))
                      }
                      className="w-7 h-7 border border-border rounded-md flex items-center justify-center hover:border-stone-400 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span
                      style={{ fontFamily: "var(--font-mono)" }}
                      className="text-sm w-5 text-center"
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartQty(p.id, Math.min(p.stock, quantity + 1))
                      }
                      className="w-7 h-7 border border-border rounded-md flex items-center justify-center hover:border-stone-400 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 self-start bg-card rounded-md border border-border p-6">
            <h2 className="font-semibold text-lg mb-5">Order Summary</h2>
            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-medium">Free</span>
                  ) : (
                    fmt(shipping)
                  )}
                </span>
              </div>
              {subtotal < 200 && (
                <p className="text-xs text-muted-foreground">
                  Add {fmt(200 - subtotal)} more for free shipping
                </p>
              )}
              <div className="flex justify-between font-semibold text-base pt-3 border-t border-border">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3 bg-accent text-accent-foreground text-sm font-semibold rounded-md hover:bg-amber-600 transition-colors mb-3 shadow-md cursor-pointer"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="block text-center w-full py-2.5 border border-border text-sm font-medium rounded-sm hover:border-stone-400 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
