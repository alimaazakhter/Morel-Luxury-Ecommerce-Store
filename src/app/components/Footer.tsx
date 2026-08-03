import { Link } from "react-router";
import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p
            style={{ fontFamily: "var(--font-display)" }}
            className="text-2xl font-semibold mb-4"
          >
            MØREL
          </p>
          <p className="text-sm opacity-60 leading-relaxed">
            Curated goods for considered living. Quality over quantity, always.
          </p>
          <div className="flex gap-4 mt-6">
            {[Instagram, Twitter, Facebook].map((Icon, i) => (
              <button
                key={i}
                className="opacity-50 hover:opacity-100 transition-opacity"
              >
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>
        {[
          { title: "Shop", links: ["Clothing", "Bags", "Accessories", "Home"] },
          {
            title: "Help",
            links: [
              "Returns & Exchanges",
              "Shipping Policy",
              "Size Guide",
              "Care Instructions",
            ],
          },
          {
            title: "Company",
            links: ["About Us", "Sustainability", "Careers", "Press"],
          },
        ].map((col) => (
          <div key={col.title}>
            <p className="text-xs font-medium tracking-widest uppercase opacity-50 mb-4">
              {col.title}
            </p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <Link
                    to="/products"
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10 max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between gap-2 text-xs opacity-40">
        <span>© 2025 MØREL. All rights reserved.</span>
        <span>
          Privacy Policy · Terms of Service ·{" "}
          <Link to="/admin" className="hover:underline opacity-80 hover:opacity-100">
            Staff Portal
          </Link>
        </span>
      </div>
    </footer>
  );
}
