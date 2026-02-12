// Mock ecommerce data for the MCP demo

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  inStock: boolean;
  stockCount: number;
  imageUrl: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Membership {
  userId: string;
  tier: "free" | "silver" | "gold" | "platinum";
  status: "active" | "expired" | "cancelled" | "paused";
  startDate: string;
  renewalDate: string;
  benefits: string[];
  pointsBalance: number;
  lifetimePoints: number;
  discountPercent: number;
  freeShipping: boolean;
  prioritySupport: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    priceAtPurchase: number;
  }>;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  shippingAddress: string;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
}

export const products: Product[] = [
  {
    id: "prod_001",
    name: "Wireless Noise-Canceling Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and exceptional sound quality.",
    price: 299.99,
    currency: "USD",
    category: "Electronics",
    inStock: true,
    stockCount: 45,
    imageUrl: "/images/headphones.jpg",
    rating: 4.8,
    reviews: 1247,
  },
  {
    id: "prod_002",
    name: "Ergonomic Mechanical Keyboard",
    description:
      "Split design mechanical keyboard with Cherry MX switches, RGB backlighting, and programmable macros.",
    price: 189.99,
    currency: "USD",
    category: "Electronics",
    inStock: true,
    stockCount: 23,
    imageUrl: "/images/keyboard.jpg",
    rating: 4.6,
    reviews: 892,
  },
  {
    id: "prod_003",
    name: "Organic Cotton T-Shirt",
    description:
      "Soft, breathable organic cotton t-shirt. Available in multiple colors. Sustainably sourced.",
    price: 34.99,
    currency: "USD",
    category: "Apparel",
    inStock: true,
    stockCount: 156,
    imageUrl: "/images/tshirt.jpg",
    rating: 4.4,
    reviews: 2341,
  },
  {
    id: "prod_004",
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 7-day battery life.",
    price: 249.99,
    currency: "USD",
    category: "Electronics",
    inStock: true,
    stockCount: 67,
    imageUrl: "/images/watch.jpg",
    rating: 4.7,
    reviews: 3156,
  },
  {
    id: "prod_005",
    name: "Minimalist Leather Wallet",
    description:
      "Slim RFID-blocking leather wallet with space for 8 cards and a bill compartment.",
    price: 59.99,
    currency: "USD",
    category: "Accessories",
    inStock: true,
    stockCount: 89,
    imageUrl: "/images/wallet.jpg",
    rating: 4.5,
    reviews: 567,
  },
  {
    id: "prod_006",
    name: "Portable Bluetooth Speaker",
    description:
      "Waterproof portable speaker with 360-degree sound, 20-hour playtime, and built-in microphone.",
    price: 79.99,
    currency: "USD",
    category: "Electronics",
    inStock: false,
    stockCount: 0,
    imageUrl: "/images/speaker.jpg",
    rating: 4.3,
    reviews: 1823,
  },
  {
    id: "prod_007",
    name: "Yoga Mat Pro",
    description:
      "Extra thick eco-friendly yoga mat with alignment lines and carrying strap included.",
    price: 68.99,
    currency: "USD",
    category: "Sports",
    inStock: true,
    stockCount: 234,
    imageUrl: "/images/yogamat.jpg",
    rating: 4.9,
    reviews: 445,
  },
  {
    id: "prod_008",
    name: "Stainless Steel Water Bottle",
    description:
      "Double-walled insulated bottle keeps drinks cold 24hrs or hot 12hrs. BPA-free, 32oz capacity.",
    price: 29.99,
    currency: "USD",
    category: "Accessories",
    inStock: true,
    stockCount: 312,
    imageUrl: "/images/bottle.jpg",
    rating: 4.6,
    reviews: 2890,
  },
];

// Mock membership data
const memberships: Map<string, Membership> = new Map([
  [
    "user_demo",
    {
      userId: "user_demo",
      tier: "gold",
      status: "active",
      startDate: "2024-06-15T00:00:00Z",
      renewalDate: "2026-06-15T00:00:00Z",
      benefits: [
        "10% discount on all orders",
        "Free standard shipping",
        "Early access to sales",
        "Priority customer support",
        "Birthday bonus points",
      ],
      pointsBalance: 4250,
      lifetimePoints: 12800,
      discountPercent: 10,
      freeShipping: true,
      prioritySupport: true,
    },
  ],
  [
    "user_002",
    {
      userId: "user_002",
      tier: "platinum",
      status: "active",
      startDate: "2023-01-10T00:00:00Z",
      renewalDate: "2026-01-10T00:00:00Z",
      benefits: [
        "15% discount on all orders",
        "Free express shipping",
        "Early access to sales",
        "Priority customer support",
        "Birthday bonus points",
        "Exclusive member-only products",
        "Free gift wrapping",
      ],
      pointsBalance: 18500,
      lifetimePoints: 54200,
      discountPercent: 15,
      freeShipping: true,
      prioritySupport: true,
    },
  ],
  [
    "user_003",
    {
      userId: "user_003",
      tier: "silver",
      status: "active",
      startDate: "2025-03-20T00:00:00Z",
      renewalDate: "2026-03-20T00:00:00Z",
      benefits: [
        "5% discount on all orders",
        "Free standard shipping on orders over $50",
        "Member-only newsletter",
      ],
      pointsBalance: 1200,
      lifetimePoints: 3400,
      discountPercent: 5,
      freeShipping: false,
      prioritySupport: false,
    },
  ],
  [
    "user_004",
    {
      userId: "user_004",
      tier: "free",
      status: "active",
      startDate: "2025-11-01T00:00:00Z",
      renewalDate: "2026-11-01T00:00:00Z",
      benefits: ["Earn points on purchases", "Access to member deals"],
      pointsBalance: 150,
      lifetimePoints: 150,
      discountPercent: 0,
      freeShipping: false,
      prioritySupport: false,
    },
  ],
]);

// In-memory cart storage (in production, this would be a database)
const carts: Map<string, Cart> = new Map();

// Sample orders for demo
export const orders: Order[] = [
  {
    id: "ord_001",
    userId: "user_demo",
    items: [
      { productId: "prod_001", quantity: 1, priceAtPurchase: 299.99 },
      { productId: "prod_005", quantity: 2, priceAtPurchase: 59.99 },
    ],
    status: "shipped",
    total: 419.97,
    shippingAddress: "123 Demo Street, San Francisco, CA 94102",
    createdAt: "2025-01-28T10:30:00Z",
    estimatedDelivery: "2025-02-05T18:00:00Z",
    trackingNumber: "1Z999AA10123456784",
  },
  {
    id: "ord_002",
    userId: "user_demo",
    items: [{ productId: "prod_004", quantity: 1, priceAtPurchase: 249.99 }],
    status: "delivered",
    total: 249.99,
    shippingAddress: "123 Demo Street, San Francisco, CA 94102",
    createdAt: "2025-01-15T14:20:00Z",
    estimatedDelivery: "2025-01-22T18:00:00Z",
    trackingNumber: "1Z999AA10123456785",
  },
  {
    id: "ord_003",
    userId: "user_demo",
    items: [
      { productId: "prod_003", quantity: 3, priceAtPurchase: 34.99 },
      { productId: "prod_008", quantity: 1, priceAtPurchase: 29.99 },
    ],
    status: "processing",
    total: 134.96,
    shippingAddress: "123 Demo Street, San Francisco, CA 94102",
    createdAt: "2025-02-01T09:15:00Z",
    estimatedDelivery: "2025-02-08T18:00:00Z",
  },
];

// Cart helper functions
export function getCart(userId: string): Cart {
  let cart = carts.get(userId);
  if (!cart) {
    cart = {
      id: `cart_${userId}`,
      userId,
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    carts.set(userId, cart);
  }
  return cart;
}

export function addToCart(
  userId: string,
  productId: string,
  quantity: number
): Cart {
  const cart = getCart(userId);
  const existingItem = cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      productId,
      quantity,
      addedAt: new Date().toISOString(),
    });
  }

  cart.updatedAt = new Date().toISOString();
  return cart;
}

export function removeFromCart(userId: string, productId: string): Cart {
  const cart = getCart(userId);
  cart.items = cart.items.filter((item) => item.productId !== productId);
  cart.updatedAt = new Date().toISOString();
  return cart;
}

export function updateCartItemQuantity(
  userId: string,
  productId: string,
  quantity: number
): Cart {
  const cart = getCart(userId);
  const item = cart.items.find((item) => item.productId === productId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(userId, productId);
    }
    item.quantity = quantity;
    cart.updatedAt = new Date().toISOString();
  }

  return cart;
}

export function getOrder(orderId: string): Order | undefined {
  return orders.find((order) => order.id === orderId);
}

export function getUserOrders(userId: string): Order[] {
  return orders.filter((order) => order.userId === userId);
}

export function getUserMembership(userId: string): Membership | undefined {
  return memberships.get(userId);
}
