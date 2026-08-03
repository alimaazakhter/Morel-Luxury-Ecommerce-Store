import { useState } from "react";
import { useNavigate } from "react-router";
import {
  MapPin,
  CreditCard,
  Package,
  Check,
  ChevronRight,
  Truck,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { CheckoutStep } from "../types/ecommerce";
import { fmt } from "../utils/formatters";
import { CreditCardPreview } from "../components/CreditCardPreview";
import { PageTransition } from "../components/PageTransition";

export function CheckoutPage() {
  const { cart, user } = useShop();
  const navigate = useNavigate();

  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [paymentError, setPaymentError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const [shipping, setShipping] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
  });
  const [method, setMethod] = useState("standard");
  const [payment, setPayment] = useState({
    card: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost =
    method === "express" ? 25 : method === "overnight" ? 45 : 0;
  const total = subtotal + shippingCost;

  const METHODS = [
    { id: "standard", label: "Standard Delivery", eta: "5–7 business days", price: 0 },
    { id: "express", label: "Express Delivery", eta: "2–3 business days", price: 25 },
    { id: "overnight", label: "Overnight Delivery", eta: "Next business day", price: 45 },
  ];

  const STEPS: { id: CheckoutStep; label: string; icon: React.ReactNode }[] = [
    { id: "shipping", label: "Shipping", icon: <MapPin size={14} /> },
    { id: "payment", label: "Payment", icon: <CreditCard size={14} /> },
    { id: "review", label: "Review", icon: <Package size={14} /> },
  ];

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const handlePlaceOrder = () => {
    const success = Math.random() > 0.15;
    if (success) {
      navigate("/confirmation");
    } else {
      setPaymentError(true);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1
          style={{ fontFamily: "var(--font-display)" }}
          className="text-3xl font-semibold mb-8"
        >
          Checkout
        </h1>

        {/* Progress */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
                  step === s.id
                    ? "bg-foreground text-primary-foreground"
                    : i < stepIndex
                    ? "text-emerald-700"
                    : "text-muted-foreground"
                }`}
              >
                {i < stepIndex ? <Check size={14} /> : s.icon}
                <span className="hidden sm:block">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight size={16} className="text-border mx-1" />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Shipping Info */}
            {step === "shipping" && (
              <div className="space-y-5">
                <h2 className="font-semibold text-lg">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["Full Name", "name", "text", "Sarah Chen"],
                    ["Email", "email", "email", "sarah@example.com"],
                  ].map(([lbl, key, type, ph]) => (
                    <div key={key}>
                      <label className="text-xs font-semibold tracking-wide uppercase text-muted-foreground block mb-1.5">
                        {lbl}
                      </label>
                      <input
                        type={type}
                        value={(shipping as any)[key]}
                        onChange={(e) =>
                          setShipping({ ...shipping, [key]: e.target.value })
                        }
                        placeholder={ph}
                        className="w-full bg-input-background px-4 py-2.5 text-sm rounded-md outline-none focus:ring-2 ring-accent/30"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-wide uppercase text-muted-foreground block mb-1.5">
                    Address
                  </label>
                  <input
                    value={shipping.address}
                    onChange={(e) =>
                      setShipping({ ...shipping, address: e.target.value })
                    }
                    placeholder="12 Rue de la Paix"
                    className="w-full bg-input-background px-4 py-2.5 text-sm rounded-md outline-none focus:ring-2 ring-accent/30"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    ["City", "city", "Paris"],
                    ["ZIP Code", "zip", "75001"],
                    ["Country", "country", "United States"],
                  ].map(([lbl, key, ph]) => (
                    <div key={key}>
                      <label className="text-xs font-semibold tracking-wide uppercase text-muted-foreground block mb-1.5">
                        {lbl}
                      </label>
                      <input
                        value={(shipping as any)[key]}
                        onChange={(e) =>
                          setShipping({ ...shipping, [key]: e.target.value })
                        }
                        placeholder={ph}
                        className="w-full bg-input-background px-4 py-2.5 text-sm rounded-md outline-none focus:ring-2 ring-accent/30"
                      />
                    </div>
                  ))}
                </div>

                <h2 className="font-semibold text-lg mt-6 pt-6 border-t border-border">
                  Shipping Method
                </h2>
                <div className="space-y-3">
                  {METHODS.map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center justify-between p-4 rounded-md border cursor-pointer transition-colors ${
                        method === m.id
                          ? "border-foreground bg-secondary"
                          : "border-border hover:border-stone-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="method"
                          value={m.id}
                          checked={method === m.id}
                          onChange={() => setMethod(m.id)}
                          className="accent-stone-800"
                        />
                        <div>
                          <p className="text-sm font-medium">{m.label}</p>
                          <p className="text-xs text-muted-foreground">{m.eta}</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">
                        {m.price === 0 ? "Free" : fmt(m.price)}
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => setStep("payment")}
                  className="w-full py-3 bg-accent text-accent-foreground text-xs font-semibold rounded-lg hover:bg-amber-600 transition-colors mt-4 flex items-center justify-center gap-1 shadow-md cursor-pointer"
                >
                  Continue to Payment <ChevronRight size={14} />
                </button>
              </div>
            )}

            {/* Payment Step */}
            {step === "payment" && (
              <div className="space-y-5">
                <h2 className="font-semibold text-lg">Payment Information</h2>
                {paymentError && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                    <AlertCircle size={16} />
                    <span>
                      Payment declined. Please check your card details and try
                      again.
                    </span>
                  </div>
                )}

                {/* Animated Credit Card Widget */}
                <CreditCardPreview
                  card={payment.card}
                  name={payment.name}
                  expiry={payment.expiry}
                  cvv={payment.cvv}
                  isFlipped={isFlipped}
                />

                <div>
                  <label className="text-xs font-semibold tracking-wide uppercase text-muted-foreground block mb-1.5">
                    Card Number
                  </label>
                  <input
                    value={payment.card}
                    onChange={(e) =>
                      setPayment({ ...payment, card: e.target.value })
                    }
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    className="w-full bg-input-background px-4 py-2.5 text-sm rounded-md outline-none focus:ring-2 ring-accent/30 font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold tracking-wide uppercase text-muted-foreground block mb-1.5">
                    Name on Card
                  </label>
                  <input
                    value={payment.name}
                    onChange={(e) =>
                      setPayment({ ...payment, name: e.target.value })
                    }
                    placeholder="SARAH CHEN"
                    className="w-full bg-input-background px-4 py-2.5 text-sm rounded-md outline-none focus:ring-2 ring-accent/30"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold tracking-wide uppercase text-muted-foreground block mb-1.5">
                      Expiry
                    </label>
                    <input
                      value={payment.expiry}
                      onChange={(e) =>
                        setPayment({ ...payment, expiry: e.target.value })
                      }
                      placeholder="09/28"
                      className="w-full bg-input-background px-4 py-2.5 text-sm rounded-md outline-none focus:ring-2 ring-accent/30 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold tracking-wide uppercase text-muted-foreground block mb-1.5">
                      CVV
                    </label>
                    <input
                      value={payment.cvv}
                      onChange={(e) =>
                        setPayment({ ...payment, cvv: e.target.value })
                      }
                      onFocus={() => setIsFlipped(true)}
                      onBlur={() => setIsFlipped(false)}
                      placeholder="•••"
                      maxLength={4}
                      className="w-full bg-input-background px-4 py-2.5 text-sm rounded-md outline-none focus:ring-2 ring-accent/30 font-mono"
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep("shipping")}
                    className="px-5 py-3 border border-border text-sm font-medium rounded-sm hover:border-stone-400 transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    onClick={() => {
                      setPaymentError(false);
                      setStep("review");
                    }}
                    className="flex-1 py-3 bg-accent text-accent-foreground text-xs font-semibold rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-1 shadow-md cursor-pointer"
                  >
                    Review Order <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Review */}
            {step === "review" && (
              <div className="space-y-5">
                <h2 className="font-semibold text-lg">Review Your Order</h2>
                <div className="bg-secondary rounded-md p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin
                      size={14}
                      className="mt-0.5 text-muted-foreground flex-shrink-0"
                    />
                    <div className="text-sm">
                      <p className="font-medium">
                        {shipping.name || "Sarah Chen"}
                      </p>
                      <p className="text-muted-foreground">
                        {shipping.address || "12 Rue de la Paix"},{" "}
                        {shipping.city || "Paris"} {shipping.zip || "75001"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={14} className="text-muted-foreground" />
                    <p className="text-sm">
                      {METHODS.find((m) => m.id === method)?.label} —{" "}
                      {METHODS.find((m) => m.id === method)?.eta}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} className="text-muted-foreground" />
                    <p className="text-sm font-mono">
                      •••• •••• •••• {payment.card.slice(-4) || "4242"}
                    </p>
                  </div>
                </div>
                {cart.map(({ product: p, quantity }) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 py-3 border-b border-border"
                  >
                    <div className="w-14 h-18 rounded-md overflow-hidden bg-stone-100 flex-shrink-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">
                      {fmt(p.price * quantity)}
                    </p>
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setStep("payment")}
                    className="px-5 py-3 border border-border text-sm font-medium rounded-sm hover:border-stone-400 transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 py-3 bg-accent text-accent-foreground text-sm font-semibold rounded-sm hover:bg-amber-600 transition-colors"
                  >
                    Place Order — {fmt(total)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="self-start bg-card rounded-md border border-border p-6">
            <h3 className="font-semibold mb-4">Your Cart</h3>
            <div className="space-y-3 mb-5">
              {cart.map(({ product: p, quantity }) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="w-12 h-15 rounded-sm overflow-hidden bg-stone-100 flex-shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">× {quantity}</p>
                  </div>
                  <p className="text-xs font-semibold">
                    {fmt(p.price * quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingCost === 0 ? "Free" : fmt(shippingCost)}</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-border text-base">
                <span>Total</span>
                <span>{fmt(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
