import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { PageTransition } from "../components/PageTransition";

export function LoginPage() {
  const { login } = useShop();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/account";

  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: form.name || "Sarah Chen",
      email: form.email || "sarah@example.com",
    });
    navigate(redirect);
  };

  const handleSocialLogin = (provider: string) => {
    login({
      name: "Sarah Chen",
      email: `sarah.${provider.toLowerCase()}@example.com`,
    });
    navigate(redirect);
  };

  return (
    <PageTransition>
      <div className="min-h-[88vh] flex items-center justify-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-5xl bg-card rounded-2xl border border-border shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
          
          {/* Left Column: Editorial Mood & Brand Experience */}
          <div className="relative hidden lg:flex flex-col justify-between p-12 bg-stone-900 text-white overflow-hidden">
            {/* Background Image with Zoom & Dark Gradient Overlay */}
            <motion.img
              initial={{ scale: 1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&h=1200&fit=crop&auto=format"
              alt="Luxury Fashion Editorial"
              className="absolute inset-0 w-full h-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

            {/* Top Brand Header */}
            <div className="relative z-10">
              <Link to="/" style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold tracking-tight text-white">
                MØREL
              </Link>
              <p className="text-xs text-amber-400 font-medium tracking-widest uppercase mt-1">
                Luxury & Considered Goods
              </p>
            </div>

            {/* Middle Quote & Testimonial */}
            <div className="relative z-10 space-y-4 my-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-amber-300">
                <Sparkles size={13} /> Exclusive Member Perks
              </span>
              <h2 style={{ fontFamily: "var(--font-display)" }} className="text-3xl font-semibold leading-tight text-white">
                "Dressed for the long run. Quality over quantity, always."
              </h2>
              
              <div className="space-y-2 pt-2">
                {[
                  "Free Express Delivery on orders over $200",
                  "Early Access to Seasonal Capsule Collections",
                  "Hassle-free 30-Day Returns & Exchanges",
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 size={14} className="text-amber-400 flex-shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Footer Badges */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/15 pt-4 text-[11px] text-white/60">
              <span className="flex items-center gap-1"><Truck size={13} /> Global Shipping</span>
              <span className="flex items-center gap-1"><ShieldCheck size={13} /> 256-Bit SSL Encrypted</span>
            </div>
          </div>

          {/* Right Column: Modern Glassmorphic Auth Form */}
          <div className="p-8 sm:p-12 flex flex-col justify-center bg-card">
            
            {/* Tab Controls */}
            <div className="relative flex bg-secondary p-1 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setTab("login")}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all z-10 ${
                  tab === "login"
                    ? "text-foreground shadow-sm bg-card"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab("register")}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all z-10 ${
                  tab === "register"
                    ? "text-foreground shadow-sm bg-card"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Header Text */}
            <div className="mb-6">
              <h1 style={{ fontFamily: "var(--font-display)" }} className="text-2xl font-bold text-foreground">
                {tab === "login" ? "Welcome back" : "Create your account"}
              </h1>
              <p className="text-xs text-muted-foreground mt-1">
                {tab === "login"
                  ? "Enter your credentials to access your account & wishlist."
                  : "Join MØREL for exclusive access to curated seasonal drops."}
              </p>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Apple")}
                className="flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium border border-border rounded-lg hover:bg-secondary transition-colors text-foreground"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.96.99-3.1-.97.04-2.15.65-2.85 1.47-.62.72-1.16 1.88-1.01 3.01 1.09.08 2.2-.56 2.87-1.38z"/>
                </svg>
                Apple
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-border w-full" />
              <span className="absolute bg-card px-3 text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                Or continue with email
              </span>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {tab === "register" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1"
                  >
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-3 text-muted-foreground" />
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Sarah Chen"
                        className="w-full bg-input-background pl-10 pr-4 py-2.5 text-xs rounded-lg outline-none focus:ring-2 ring-accent/40 border border-border text-foreground transition-all"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3 text-muted-foreground" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="sarah@example.com"
                    className="w-full bg-input-background pl-10 pr-4 py-2.5 text-xs rounded-lg outline-none focus:ring-2 ring-accent/40 border border-border text-foreground transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-input-background pl-10 pr-10 py-2.5 text-xs rounded-lg outline-none focus:ring-2 ring-accent/40 border border-border text-foreground transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {tab === "login" && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
                    <input type="checkbox" className="accent-amber-600 rounded" /> Remember me
                  </label>
                  <button type="button" className="text-accent hover:underline font-medium">
                    Forgot password?
                  </button>
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-accent text-accent-foreground text-xs font-semibold rounded-lg hover:bg-amber-600 transition-colors shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                {tab === "login" ? "Sign In & Continue" : "Create Account"} <ArrowRight size={14} />
              </motion.button>
            </form>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-3 py-2.5 border border-border text-xs font-medium rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            >
              Continue as Guest
            </button>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
