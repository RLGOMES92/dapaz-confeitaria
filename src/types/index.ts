// ─────────────────────────────────────────────
// Domain Types — Confeitaria
// ─────────────────────────────────────────────

export type Flavor =
  | "Prestígio"
  | "Chocolate Gourmet"
  | "Paçoca"
  | "Ninho com Morango";

export type PortfolioCategory = "Bolos Confeitados" | "Papelaria de Festa";

// ─── Ready-to-deliver products (Bolos de Pote) ───
export interface PotCakeProduct {
  id: string;
  name: string;
  flavor: Flavor;
  description: string;
  price: number; // BRL cents (e.g. 2200 = R$22,00)
  imageUrl: string;
  inStock: boolean;
  badge?: string; // e.g. "Mais Vendido", "Novo"
}

// ─── Portfolio items (Encomendas) ────────────────
export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  imageUrl: string;
  description?: string;
  tags?: string[];
}

// ─── Cart ─────────────────────────────────────────
export interface CartItem {
  productId: string;
  name: string;
  flavor: Flavor;
  price: number; // BRL cents
  quantity: number;
}

// ─── Customer address (persisted in localStorage) ─
export interface CustomerInfo {
  name: string;
  block: string; // Bloco/Torre
  apartment: string;
}

// ─── Checkout payload ─────────────────────────────
export interface CheckoutPayload {
  items: CartItem[];
  customer: CustomerInfo;
  total: number; // BRL cents
}
