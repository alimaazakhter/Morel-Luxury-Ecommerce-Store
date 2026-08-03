export type Page = "home" | "listing" | "product" | "cart" | "login" | "checkout" | "confirmation" | "account" | "tracking";
export type CheckoutStep = "shipping" | "payment" | "review";
export type AccountTab = "profile" | "orders" | "wishlist" | "addresses";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  images: string[];
  description: string;
  tags: string[];
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface UserData {
  name: string;
  email: string;
}

export interface Category {
  name: string;
  count: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: string[];
}

export interface TrackingStep {
  label: string;
  date: string;
  done: boolean;
}
