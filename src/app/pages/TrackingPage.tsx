import { Link } from "react-router";
import { ArrowLeft, CheckCircle, Package } from "lucide-react";
import { TRACKING_STEPS } from "../data/mockData";

export function TrackingPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <Link
        to="/account?tab=orders"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Orders
      </Link>
      <h1
        style={{ fontFamily: "var(--font-display)" }}
        className="text-3xl font-semibold mb-1"
      >
        Order Tracking
      </h1>
      <p
        style={{ fontFamily: "var(--font-mono)" }}
        className="text-sm text-muted-foreground mb-8"
      >
        ORD-2025-0042
      </p>

      <div className="bg-card rounded-md border border-border p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Status
            </p>
            <p className="font-semibold text-emerald-700 flex items-center gap-2">
              <CheckCircle size={16} /> Delivered
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Carrier
            </p>
            <p className="text-sm font-medium">DHL Express</p>
          </div>
        </div>
        <div
          style={{ fontFamily: "var(--font-mono)" }}
          className="text-xs bg-secondary rounded-md px-3 py-2 text-muted-foreground"
        >
          Tracking: 1Z999AA10123456784
        </div>
      </div>

      <div className="relative pl-6">
        <div className="absolute left-2.5 top-3 bottom-3 w-px bg-border" />
        {TRACKING_STEPS.map((step) => (
          <div
            key={step.label}
            className={`relative mb-6 last:mb-0 ${
              step.done ? "opacity-100" : "opacity-40"
            }`}
          >
            <div
              className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                step.done
                  ? "border-emerald-600 bg-emerald-50"
                  : "border-border bg-background"
              }`}
            >
              {step.done && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              )}
            </div>
            <p className="text-sm font-medium">{step.label}</p>
            <p
              style={{ fontFamily: "var(--font-mono)" }}
              className="text-xs text-muted-foreground mt-0.5"
            >
              {step.date}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-secondary rounded-md p-5">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Package size={16} /> Delivery Details
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {[
            ["Delivered to", "12 Rue de la Paix, Paris"],
            ["Signed by", "S. Chen"],
            ["Delivery date", "June 21, 2025"],
            ["Items", "2 parcels"],
          ].map(([k, v]) => (
            <div key={k as string}>
              <p className="text-xs text-muted-foreground">{k}</p>
              <p className="font-medium mt-0.5">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
