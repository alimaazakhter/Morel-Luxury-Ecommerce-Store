import { Product, Category, Order, TrackingStep } from "../types/ecommerce";

export const PRODUCTS: Product[] = [
  {
    id: "p1", name: "Côte d'Azur Linen Shirt", brand: "Maison Alvarez", price: 189, originalPrice: 240,
    category: "Clothing", rating: 4.8, reviewCount: 124, stock: 8,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&h=750&fit=crop&auto=format",
    ],
    description: "Crafted from 100% Belgian linen, this relaxed-fit shirt embodies effortless summer dressing. The stonewashed finish gives it a lived-in character that only improves with age. Features a spread collar, mother-of-pearl buttons, and a slightly longer back hem.",
    tags: ["summer", "linen", "casual"], reviews: [
      { id: "r1", author: "Sophie M.", rating: 5, date: "June 12, 2025", comment: "Absolutely beautiful shirt. The linen quality is exceptional and it drapes perfectly." },
      { id: "r2", author: "James P.", rating: 4, date: "May 28, 2025", comment: "Great quality, runs slightly large. Sizing down was the right call." },
      { id: "r3", author: "Clara W.", rating: 5, date: "May 14, 2025", comment: "My third purchase from this brand. Never disappoints." },
    ]
  },
  {
    id: "p2", name: "Structured Leather Tote", brand: "Atelier Noor", price: 395,
    category: "Bags", rating: 4.9, reviewCount: 87, stock: 3,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=750&fit=crop&auto=format",
    ],
    description: "Full-grain vegetable-tanned leather from a family tannery in Tuscany. The structured silhouette is supported by a thin steel frame that holds its shape beautifully. Interior features a suede lining, two slip pockets, and a zipped compartment.",
    tags: ["leather", "luxury", "everyday"], reviews: [
      { id: "r4", author: "Natalie K.", rating: 5, date: "June 3, 2025", comment: "Worth every penny. The leather is developing a gorgeous patina already." },
      { id: "r5", author: "Marcus T.", rating: 5, date: "April 19, 2025", comment: "Bought for my wife. She hasn't put it down since." },
    ]
  },
  {
    id: "p3", name: "Merino Wool Turtleneck", brand: "Nordheim", price: 145, originalPrice: 180,
    category: "Clothing", rating: 4.6, reviewCount: 203, stock: 22,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=750&fit=crop&auto=format",
    ],
    description: "Extra-fine 17.5-micron merino from New Zealand sheep. The close-to-body fit keeps you warm without bulk. Fully fashioned construction means zero seams at the sides — just smooth, continuous fabric from hem to underarm.",
    tags: ["wool", "winter", "essentials"], reviews: [
      { id: "r6", author: "Elena R.", rating: 5, date: "January 8, 2025", comment: "No itch whatsoever. The softest turtleneck I have ever owned." },
      { id: "r7", author: "David C.", rating: 4, date: "December 22, 2024", comment: "Great quality but wish it came in more colors." },
    ]
  },
  {
    id: "p4", name: "Ceramic Pour-Over Set", brand: "Studio Form", price: 98,
    category: "Home", rating: 4.7, reviewCount: 156, stock: 14,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=750&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=750&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&h=750&fit=crop&auto=format",
    ],
    description: "Hand-thrown stoneware pour-over dripper and matching carafe. Each piece is unique, made in small batches in our Portland studio. The matte glaze is food-safe and dishwasher-friendly. Set includes dripper, carafe, and a box of our custom-cut filters.",
    tags: ["coffee", "ceramic", "kitchen"], reviews: [
      { id: "r8", author: "Yuki S.", rating: 5, date: "March 30, 2025", comment: "Makes my morning ritual feel genuinely special." },
    ]
  },
  {
    id: "p5", name: "Slim Leather Wallet", brand: "Atelier Noor", price: 125,
    category: "Accessories", rating: 4.5, reviewCount: 341, stock: 31,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=750&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=750&fit=crop&auto=format",
    ],
    description: "Six-card capacity slim bifold in the same Tuscan vegetable-tanned leather as our totes. No unnecessary stitching or branding — just clean lines and enduring quality. Gets better-looking with every year of use.",
    tags: ["leather", "minimal", "everyday"], reviews: [
      { id: "r9", author: "Tom B.", rating: 4, date: "May 5, 2025", comment: "Slim and holds all essentials. Perfect." },
      { id: "r10", author: "Alex G.", rating: 5, date: "April 2, 2025", comment: "Third wallet I have bought here. Never going back to anything else." },
    ]
  },
  {
    id: "p6", name: "Wool Blend Overcoat", brand: "Nordheim", price: 590, originalPrice: 720,
    category: "Clothing", rating: 4.9, reviewCount: 62, stock: 5,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=750&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=750&fit=crop&auto=format",
    ],
    description: "80% wool, 20% cashmere blend woven in a Huddersfield mill operating since 1887. The coat is fully canvassed and half-lined in silk habotai for effortless movement. Oversized silhouette with a single-button closure and deep patch pockets.",
    tags: ["wool", "outerwear", "investment"], reviews: [
      { id: "r11", author: "Isabelle F.", rating: 5, date: "November 14, 2024", comment: "Absolute masterpiece. Already a forever piece." },
    ]
  },
  {
    id: "p7", name: "Handwoven Throw Blanket", brand: "Studio Form", price: 220,
    category: "Home", rating: 4.6, reviewCount: 89, stock: 19,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=750&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=750&fit=crop&auto=format",
    ],
    description: "Woven on a floor loom by artisans in Oaxaca using a traditional herringbone pattern. 100% undyed merino wool in its natural colorways: ivory, dove grey, and warm stone. Measures 140 × 180 cm. Every blanket takes two days to complete.",
    tags: ["wool", "handmade", "artisan"], reviews: [
      { id: "r12", author: "Rosa N.", rating: 5, date: "February 3, 2025", comment: "The most beautiful thing I own. So soft and substantial." },
    ]
  },
  {
    id: "p8", name: "Silk Scarf — Botanical", brand: "Maison Alvarez", price: 165,
    category: "Accessories", rating: 4.7, reviewCount: 118, stock: 0,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=750&fit=crop&auto=format",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=750&fit=crop&auto=format",
    ],
    description: "Hand-printed on 14mm habotai silk in our Barcelona studio. The botanical motif was drawn by our in-house illustrator after a residency in the Pyrenees. 90 × 90 cm. Hand-rolled edges. A seasonal edition — only 200 printed.",
    tags: ["silk", "print", "limited"], reviews: [
      { id: "r13", author: "Ling H.", rating: 5, date: "April 22, 2025", comment: "Stunning print. Already sold out in my size but worth the hunt." },
    ]
  },
];

export const CATEGORIES: Category[] = [
  { name: "Clothing", count: 48, image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop&auto=format" },
  { name: "Bags", count: 23, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=500&fit=crop&auto=format" },
  { name: "Accessories", count: 35, image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&h=500&fit=crop&auto=format" },
  { name: "Home", count: 19, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop&auto=format" },
];

export const ORDERS: Order[] = [
  { id: "ORD-2025-0042", date: "June 18, 2025", status: "Delivered", total: 334, items: ["Côte d'Azur Linen Shirt", "Slim Leather Wallet"] },
  { id: "ORD-2025-0028", date: "May 3, 2025", status: "Delivered", total: 145, items: ["Merino Wool Turtleneck"] },
  { id: "ORD-2024-0187", date: "November 30, 2024", status: "Delivered", total: 590, items: ["Wool Blend Overcoat"] },
];

export const TRACKING_STEPS: TrackingStep[] = [
  { label: "Order Placed", date: "June 18, 09:42", done: true },
  { label: "Payment Confirmed", date: "June 18, 09:43", done: true },
  { label: "Processing", date: "June 18, 14:00", done: true },
  { label: "Shipped", date: "June 19, 08:15", done: true },
  { label: "Out for Delivery", date: "June 21, 07:30", done: true },
  { label: "Delivered", date: "June 21, 14:22", done: true },
];
