import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  Clock,
  Plus,
  Save,
  CheckCircle2,
  Edit2,
  Trash2,
  X,
  Check,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { AccountTab } from "../types/ecommerce";
import { ORDERS } from "../data/mockData";
import { fmt } from "../utils/formatters";
import { PageTransition } from "../components/PageTransition";
import { LoginPage } from "./LoginPage";

interface AddressItem {
  id: string;
  label: string;
  address: string;
  default: boolean;
}

export function AccountPage() {
  const { user, logout, wishlist, products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const tabParam = (searchParams.get("tab") as AccountTab) || "profile";
  const [tab, setTab] = useState<AccountTab>(tabParam);
  const [savedToast, setSavedToast] = useState(false);

  // Address State
  const [addresses, setAddresses] = useState<AddressItem[]>([
    {
      id: "1",
      label: "Home",
      address: "12 Rue de la Paix, Paris 75001, France",
      default: true,
    },
    {
      id: "2",
      label: "Work",
      address: "47 Bd Haussmann, Paris 75009, France",
      default: false,
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: "Home",
    address: "",
    default: false,
  });

  useEffect(() => {
    if (tabParam) setTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (t: AccountTab) => {
    setTab(t);
    setSearchParams({ tab: t });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  // Address Handlers
  const handleStartEdit = (addr: AddressItem) => {
    setEditingId(addr.id);
    setAddressForm({
      label: addr.label,
      address: addr.address,
      default: addr.default,
    });
    setShowAddForm(false);
  };

  const handleSaveEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setAddresses((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            label: addressForm.label,
            address: addressForm.address,
            default: addressForm.default,
          };
        }
        if (addressForm.default) return { ...item, default: false };
        return item;
      })
    );
    setEditingId(null);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.address.trim()) return;

    const newAddr: AddressItem = {
      id: Date.now().toString(),
      label: addressForm.label || "Other",
      address: addressForm.address,
      default: addressForm.default || addresses.length === 0,
    };

    setAddresses((prev) => {
      let updated = [...prev];
      if (newAddr.default) {
        updated = updated.map((a) => ({ ...a, default: false }));
      }
      return [...updated, newAddr];
    });

    setShowAddForm(false);
    setAddressForm({ label: "Home", address: "", default: false });
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, default: a.id === id }))
    );
  };

  if (!user) {
    return <LoginPage />;
  }

  const TABS: { id: AccountTab; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "orders", label: "Order History", icon: <Package size={16} /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart size={16} /> },
    { id: "addresses", label: "Addresses", icon: <MapPin size={16} /> },
  ];

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
          <div>
            <h1
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-bold tracking-tight text-foreground"
            >
              My Account
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Welcome back,{" "}
              <span className="font-semibold text-foreground">{user.name}</span>{" "}
              ({user.email})
            </p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border border-border bg-secondary hover:bg-muted text-foreground transition-colors shadow-sm cursor-pointer"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <aside className="lg:col-span-1">
            <nav className="space-y-1.5">
              {TABS.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleTabChange(t.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                      active
                        ? "bg-secondary text-foreground border-l-4 border-accent shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    }`}
                  >
                    <span
                      className={active ? "text-accent" : "text-muted-foreground"}
                    >
                      {t.icon}
                    </span>
                    {t.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Tab Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {tab === "profile" && (
              <form
                onSubmit={handleSaveProfile}
                className="bg-card rounded-2xl border border-border p-6 sm:p-8 space-y-6 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg text-foreground">
                    Personal Information
                  </h2>
                  {savedToast && (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full font-medium">
                      <CheckCircle2 size={13} /> Saved successfully!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground block mb-1.5">
                      Full Name
                    </label>
                    <input
                      defaultValue={user.name}
                      className="w-full bg-input-background px-4 py-2.5 text-xs rounded-lg border border-border text-foreground outline-none focus:ring-2 ring-accent/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground block mb-1.5">
                      Email Address
                    </label>
                    <input
                      defaultValue={user.email}
                      className="w-full bg-input-background px-4 py-2.5 text-xs rounded-lg border border-border text-foreground outline-none focus:ring-2 ring-accent/40 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-accent text-accent-foreground text-xs font-semibold rounded-lg hover:bg-amber-600 transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Save size={14} /> Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* Orders Tab */}
            {tab === "orders" && (
              <div className="space-y-4">
                <h2 className="font-semibold text-lg text-foreground">
                  Order History
                </h2>
                {ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p
                          style={{ fontFamily: "var(--font-mono)" }}
                          className="text-sm font-semibold text-foreground"
                        >
                          {order.id}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {order.date}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      {order.items.join(", ")}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <p className="font-semibold text-sm text-foreground">
                        {fmt(order.total)}
                      </p>
                      <Link
                        to="/tracking"
                        className="text-xs font-medium text-accent hover:underline flex items-center gap-1"
                      >
                        <Clock size={13} /> Track Order →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wishlist Tab */}
            {tab === "wishlist" && (
              <div>
                <h2 className="font-semibold text-lg text-foreground mb-5">
                  Wishlist ({wishlistProducts.length})
                </h2>
                {wishlistProducts.length === 0 ? (
                  <div className="bg-card rounded-2xl border border-border text-center py-16 text-muted-foreground">
                    <Heart size={40} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">Your wishlist is empty.</p>
                    <Link
                      to="/products"
                      className="text-xs text-accent hover:underline mt-2 block"
                    >
                      Browse products →
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                    {wishlistProducts.map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.id}`}
                        className="text-left group block bg-card rounded-xl border border-border p-3 hover:border-amber-500/30 transition-all"
                      >
                        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-900 mb-2">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {p.brand}
                        </p>
                        <p className="text-xs font-medium text-foreground mt-0.5 truncate">
                          {p.name}
                        </p>
                        <p className="text-xs font-semibold text-foreground mt-1">
                          {fmt(p.price)}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab (100% Functional) */}
            {tab === "addresses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg text-foreground">
                    Saved Addresses ({addresses.length})
                  </h2>
                  {!showAddForm && (
                    <button
                      onClick={() => {
                        setShowAddForm(true);
                        setEditingId(null);
                        setAddressForm({
                          label: "Home",
                          address: "",
                          default: addresses.length === 0,
                        });
                      }}
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-accent text-accent-foreground hover:bg-amber-600 transition-colors shadow-sm cursor-pointer"
                    >
                      <Plus size={14} /> Add New Address
                    </button>
                  )}
                </div>

                {/* Add New Address Form Modal / Card */}
                <AnimatePresence>
                  {showAddForm && (
                    <motion.form
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      onSubmit={handleCreateAddress}
                      className="bg-card rounded-2xl border-2 border-accent/40 p-6 space-y-4 shadow-lg"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-foreground">
                          Add New Shipping Address
                        </h3>
                        <button
                          type="button"
                          onClick={() => setShowAddForm(false)}
                          className="text-muted-foreground hover:text-foreground p-1"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                            Label
                          </label>
                          <select
                            value={addressForm.label}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                label: e.target.value,
                              })
                            }
                            className="w-full bg-input-background px-3 py-2 text-xs rounded-lg border border-border text-foreground outline-none focus:ring-2 ring-accent/40"
                          >
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Office">Office</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                            Full Street Address
                          </label>
                          <input
                            value={addressForm.address}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                address: e.target.value,
                              })
                            }
                            placeholder="e.g. 12 Rue de la Paix, Paris 75001, France"
                            className="w-full bg-input-background px-3 py-2 text-xs rounded-lg border border-border text-foreground outline-none focus:ring-2 ring-accent/40"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                          <input
                            type="checkbox"
                            checked={addressForm.default}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                default: e.target.checked,
                              })
                            }
                            className="accent-amber-600 rounded"
                          />
                          Set as default delivery address
                        </label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setShowAddForm(false)}
                            className="px-4 py-2 text-xs font-semibold border border-border rounded-lg hover:bg-secondary text-foreground"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 text-xs font-semibold bg-accent text-accent-foreground rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
                          >
                            Save Address
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* List of Saved Addresses */}
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-card rounded-2xl border border-border p-5 shadow-sm hover:border-amber-500/30 transition-all"
                    >
                      {editingId === addr.id ? (
                        /* Inline Edit Form */
                        <form
                          onSubmit={(e) => handleSaveEdit(e, addr.id)}
                          className="space-y-3"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <select
                              value={addressForm.label}
                              onChange={(e) =>
                                setAddressForm({
                                  ...addressForm,
                                  label: e.target.value,
                                })
                              }
                              className="bg-input-background px-3 py-1.5 text-xs rounded-lg border border-border text-foreground"
                            >
                              <option value="Home">Home</option>
                              <option value="Work">Work</option>
                              <option value="Office">Office</option>
                              <option value="Other">Other</option>
                            </select>
                            <input
                              value={addressForm.address}
                              onChange={(e) =>
                                setAddressForm({
                                  ...addressForm,
                                  address: e.target.value,
                                })
                              }
                              className="sm:col-span-2 bg-input-background px-3 py-1.5 text-xs rounded-lg border border-border text-foreground"
                              required
                            />
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2 text-xs text-muted-foreground">
                              <input
                                type="checkbox"
                                checked={addressForm.default}
                                onChange={(e) =>
                                  setAddressForm({
                                    ...addressForm,
                                    default: e.target.checked,
                                  })
                                }
                                className="accent-amber-600 rounded"
                              />
                              Set as default
                            </label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="px-3 py-1 text-xs border border-border rounded-lg text-foreground"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-1 text-xs font-semibold bg-accent text-accent-foreground rounded-lg"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </form>
                      ) : (
                        /* Address View Card */
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <MapPin
                              size={18}
                              className="text-accent mt-0.5 flex-shrink-0"
                            />
                            <div>
                              <p className="text-xs font-semibold text-foreground flex items-center gap-2">
                                {addr.label}{" "}
                                {addr.default ? (
                                  <span className="text-[10px] bg-accent/15 text-accent px-2 py-0.5 rounded font-medium border border-accent/20">
                                    Default
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleSetDefault(addr.id)}
                                    className="text-[10px] text-muted-foreground hover:text-accent underline font-normal"
                                  >
                                    Set as default
                                  </button>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                {addr.address}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleStartEdit(addr)}
                              className="p-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors flex items-center gap-1 font-medium"
                              title="Edit address"
                            >
                              <Edit2 size={13} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="p-1.5 text-xs text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                              title="Delete address"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
