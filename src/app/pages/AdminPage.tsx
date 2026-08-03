import { useState } from "react";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Users,
  Package,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  LogOut,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { PageTransition } from "../components/PageTransition";
import {
  MONTHLY_SALES_DATA,
  CATEGORY_SHARE_DATA,
  ADMIN_METRICS,
} from "../data/adminData";
import { PRODUCTS, ORDERS } from "../data/mockData";
import { fmt } from "../utils/formatters";

export function AdminPage() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem("morel_admin_unlocked") === "true";
  });
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [timeRange, setTimeRange] = useState("7m");

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "1234" || passcode === "admin123" || passcode.toLowerCase() === "admin") {
      setIsUnlocked(true);
      sessionStorage.setItem("morel_admin_unlocked", "true");
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem("morel_admin_unlocked");
    setPasscode("");
  };

  const lowStockProducts = PRODUCTS.filter((p) => p.stock <= 5);

  // Lock Screen
  if (!isUnlocked) {
    return (
      <PageTransition>
        <div className="min-h-[75vh] flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-card rounded-xl border border-border p-8 shadow-xl text-center">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
              <ShieldCheck size={28} />
            </div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-2xl font-semibold mb-2 text-foreground"
            >
              Restricted Admin Access
            </h1>
            <p className="text-xs text-muted-foreground mb-6">
              Enter your store security passcode to access business analytics & revenue reports.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              {error && (
                <div className="flex items-center justify-center gap-2 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs py-2 px-3 rounded-md">
                  <AlertCircle size={14} /> Incorrect security passcode.
                </div>
              )}
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. 1234)"
                  className="w-full text-center tracking-widest font-mono bg-input-background px-4 py-3 text-sm rounded-md outline-none focus:ring-2 ring-accent/30 text-foreground"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-foreground text-primary-foreground text-sm font-semibold rounded-md hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
              >
                <Lock size={14} /> Unlock Admin Portal
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-[11px] text-muted-foreground">
                <span className="font-semibold text-accent">Demo Access Note:</span> Use PIN <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-foreground">1234</code> or <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-foreground">admin123</code> to test.
              </p>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <ShieldCheck size={12} /> Authorized Admin
              </span>
            </div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-semibold"
            >
              Store Analytics & Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Overview of revenue, order fulfillment, and inventory health.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 border border-border rounded-md p-1 bg-secondary">
              {["30d", "7m", "1y"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                    timeRange === range
                      ? "bg-foreground text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={handleLock}
              className="px-3 py-1.5 text-xs font-semibold border border-border rounded-md hover:bg-secondary transition-colors flex items-center gap-1 text-muted-foreground hover:text-foreground"
              title="Lock Admin Portal"
            >
              <LogOut size={13} /> Lock Portal
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            {
              title: "Total Revenue",
              value: fmt(ADMIN_METRICS.totalRevenue),
              change: ADMIN_METRICS.revenueGrowth,
              icon: <DollarSign className="text-amber-600" size={20} />,
            },
            {
              title: "Total Orders",
              value: ADMIN_METRICS.totalOrders.toLocaleString(),
              change: ADMIN_METRICS.ordersGrowth,
              icon: <ShoppingBag className="text-emerald-600" size={20} />,
            },
            {
              title: "Avg. Order Value",
              value: fmt(ADMIN_METRICS.avgOrderValue),
              change: "+4.2%",
              icon: <TrendingUp className="text-blue-600" size={20} />,
            },
            {
              title: "Conversion Rate",
              value: `${ADMIN_METRICS.conversionRate}%`,
              change: "+0.8%",
              icon: <Users className="text-purple-600" size={20} />,
            },
          ].map((metric) => (
            <div
              key={metric.title}
              className="bg-card rounded-md border border-border p-5 flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {metric.title}
                </span>
                <div className="p-2 bg-secondary rounded-md">{metric.icon}</div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className="text-xs font-medium text-emerald-600 flex items-center">
                  {metric.change} <ArrowUpRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-card rounded-md border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Revenue Trend</h2>
              <span className="text-xs text-muted-foreground font-mono">
                USD ($)
              </span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_SALES_DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C8933A" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#C8933A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "6px",
                    }}
                    formatter={(val: any) => [fmt(val), "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#C8933A"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Pie Chart */}
          <div className="bg-card rounded-md border border-border p-6 shadow-sm flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
            <div className="h-56 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_SHARE_DATA}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {CATEGORY_SHARE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => [`${val}%`, "Share"]}
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "6px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
              {CATEGORY_SHARE_DATA.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-muted-foreground">{cat.name}</span>
                  <span className="font-semibold ml-auto">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Low Stock Alerts & Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Low Stock Alerts */}
          <div className="bg-card rounded-md border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="text-amber-500" size={18} /> Low Stock
                Alerts
              </h2>
              <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-semibold px-2 py-0.5 rounded-full">
                {lowStockProducts.length} items
              </span>
            </div>
            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-secondary rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Category: {p.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-amber-600">
                      {p.stock} left
                    </span>
                    <button className="block text-xs text-accent hover:underline mt-0.5">
                      Restock →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-card rounded-md border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Package size={18} /> Recent Orders
              </h2>
              <span className="text-xs text-muted-foreground">
                Showing latest 3
              </span>
            </div>
            <div className="space-y-3">
              {ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="p-3 border border-border rounded-md flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-mono font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.items.join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{fmt(order.total)}</p>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
