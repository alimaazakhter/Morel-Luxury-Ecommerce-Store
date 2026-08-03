import { Link } from "react-router";
import { CheckCircle, Mail, Truck, Package } from "lucide-react";
import { useShop } from "../context/ShopContext";

export function ConfirmationPage() {
  const { user } = useShop();
  const orderNum = "ORD-2025-0051";

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={32} className="text-emerald-600" />
      </div>
      <h1
        style={{ fontFamily: "var(--font-display)" }}
        className="text-3xl font-semibold mb-3"
      >
        Order Confirmed!
      </h1>
      <p className="text-muted-foreground mb-2">
        Thank you{user ? `, ${user.name.split(" ")[0]}` : ""}. Your order has been
        received.
      </p>
      <p
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-sm bg-secondary inline-block px-4 py-2 rounded-md mb-8 text-foreground"
      >
        {orderNum}
      </p>

      <div className="bg-card rounded-md border border-border p-6 text-left mb-8 space-y-4">
        <div className="flex items-start gap-3">
          <Mail size={18} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Confirmation Email Sent</p>
            <p className="text-xs text-muted-foreground">
              Check your inbox at {user?.email || "sarah@example.com"} for full
              details.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Truck size={18} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">
              Estimated Delivery: June 26–28, 2025
            </p>
            <p className="text-xs text-muted-foreground">
              We will notify you when your order ships.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Package size={18} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Order Tracking Available</p>
            <Link
              to="/tracking"
              className="text-xs text-accent hover:underline underline-offset-2"
            >
              Track your order →
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          to="/tracking"
          className="px-6 py-2.5 bg-accent text-accent-foreground text-xs font-semibold rounded-lg hover:bg-amber-600 transition-colors shadow-md cursor-pointer"
        >
          Track Order
        </Link>
        <Link
          to="/products"
          className="px-6 py-2.5 border border-border text-sm font-medium rounded-sm hover:border-stone-400 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
