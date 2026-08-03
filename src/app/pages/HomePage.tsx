import { Link } from "react-router";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { CATEGORIES } from "../data/mockData";
import { ProductCard } from "../components/ProductCard";
import { PageTransition } from "../components/PageTransition";

export function HomePage() {
  const { products } = useShop();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <PageTransition>
      <div>
        {/* Hero */}
        <section className="relative h-[72vh] min-h-[480px] flex items-center overflow-hidden bg-stone-900">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop&auto=format"
            alt="Editorial lifestyle hero"
            className="absolute inset-0 w-full h-full object-cover opacity-55"
          />
          <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs tracking-[0.25em] uppercase text-amber-400 mb-4 font-medium"
            >
              Summer Collection 2025
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontFamily: "var(--font-display)" }}
              className="text-white text-5xl sm:text-7xl font-semibold leading-[1.05] max-w-xl mb-6"
            >
              Dressed for the&nbsp;long&nbsp;run.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/70 text-lg max-w-sm mb-8"
            >
              Timeless pieces that grow better with every season. No trends — just craft.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/products"
                className="bg-white text-stone-900 px-7 py-3 text-sm font-semibold hover:bg-stone-100 transition-colors rounded-sm shadow-md"
              >
                Shop Now
              </Link>
              <Link
                to="/products"
                className="border border-white/50 text-white px-7 py-3 text-sm font-medium hover:border-white transition-colors rounded-sm"
              >
                New Arrivals
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <h2
              style={{ fontFamily: "var(--font-display)" }}
              className="text-3xl font-semibold"
            >
              Shop by Category
            </h2>
            <Link
              to="/products"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              All categories <ChevronRight size={14} />
            </Link>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.name} variants={itemVariants}>
                <Link
                  to={`/products?category=${cat.name}`}
                  className="group relative rounded-md overflow-hidden aspect-[3/4] bg-stone-200 block"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <p className="text-white font-semibold text-lg leading-tight">
                      {cat.name}
                    </p>
                    <p className="text-white/60 text-sm mt-0.5">{cat.count} items</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Featured Products */}
        <section className="bg-secondary py-20 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">
                  Handpicked
                </p>
                <h2
                  style={{ fontFamily: "var(--font-display)" }}
                  className="text-3xl font-semibold"
                >
                  Featured Products
                </h2>
              </div>
              <Link
                to="/products"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products.slice(0, 4).map((p) => (
                <motion.div key={p.id} variants={itemVariants}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Banner */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="relative rounded-md overflow-hidden bg-stone-800 h-72 flex items-center shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=500&fit=crop&auto=format"
              alt="New arrivals"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="relative px-10">
              <p className="text-amber-400 text-xs tracking-widest uppercase mb-3">
                Just Arrived
              </p>
              <h3
                style={{ fontFamily: "var(--font-display)" }}
                className="text-white text-4xl font-semibold mb-4"
              >
                Autumn Preview
              </h3>
              <Link
                to="/products"
                className="inline-block bg-accent text-accent-foreground px-6 py-2.5 text-sm font-semibold rounded-sm hover:bg-amber-600 transition-colors shadow-md"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
