export interface SalesDataPoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface CategoryShare {
  name: string;
  value: number;
  color: string;
}

export const MONTHLY_SALES_DATA: SalesDataPoint[] = [
  { month: "Jan", revenue: 8400, orders: 72 },
  { month: "Feb", revenue: 9800, orders: 84 },
  { month: "Mar", revenue: 12300, orders: 105 },
  { month: "Apr", revenue: 11100, orders: 96 },
  { month: "May", revenue: 14500, orders: 128 },
  { month: "Jun", revenue: 18900, orders: 164 },
  { month: "Jul", revenue: 21400, orders: 190 },
];

export const CATEGORY_SHARE_DATA: CategoryShare[] = [
  { name: "Clothing", value: 45, color: "#C8933A" },
  { name: "Bags", value: 25, color: "#5C8A6E" },
  { name: "Accessories", value: 18, color: "#2E6DA4" },
  { name: "Home", value: 12, color: "#C05C3A" },
];

export const ADMIN_METRICS = {
  totalRevenue: 96400,
  revenueGrowth: "+18.4%",
  totalOrders: 839,
  ordersGrowth: "+12.1%",
  avgOrderValue: 114.9,
  conversionRate: 3.42,
};
