"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { CartItem, CustomerInfo } from "@/types";

// ─────────────────────────────────────────────────────────────────
// State shape
// ─────────────────────────────────────────────────────────────────
interface CartState {
  items: CartItem[];
  customer: CustomerInfo;
  isOpen: boolean;
}

const INITIAL_CUSTOMER: CustomerInfo = { name: "", block: "", apartment: "" };

const INITIAL_STATE: CartState = {
  items: [],
  customer: INITIAL_CUSTOMER,
  isOpen: false,
};

// ─────────────────────────────────────────────────────────────────
// Actions
// ─────────────────────────────────────────────────────────────────
type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "SET_CUSTOMER"; payload: Partial<CustomerInfo> }
  | { type: "SET_OPEN"; payload: boolean }
  | { type: "HYDRATE"; payload: Partial<CartState> };

// ─────────────────────────────────────────────────────────────────
// Reducer
// ─────────────────────────────────────────────────────────────────
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.productId === action.payload.productId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.payload.productId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.productId !== productId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === productId ? { ...i, quantity } : i
        ),
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.productId !== action.payload.productId),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "SET_CUSTOMER":
      return { ...state, customer: { ...state.customer, ...action.payload } };

    case "SET_OPEN":
      return { ...state, isOpen: action.payload };

    case "HYDRATE":
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

// ─────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────
interface CartContextValue {
  state: CartState;
  totalItems: number;
  totalPrice: number; // cents
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setCustomer: (fields: Partial<CustomerInfo>) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─────────────────────────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────────────────────────
const CUSTOMER_KEY = "confeitaria:customer";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  // Hydrate customer info from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CUSTOMER_KEY);
      if (stored) {
        const customer = JSON.parse(stored) as CustomerInfo;
        dispatch({ type: "HYDRATE", payload: { customer } });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist customer info whenever it changes
  useEffect(() => {
    const hasData =
      state.customer.name || state.customer.block || state.customer.apartment;
    if (hasData) {
      localStorage.setItem(CUSTOMER_KEY, JSON.stringify(state.customer));
    }
  }, [state.customer]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items]
  );

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);

  const setCustomer = useCallback((fields: Partial<CustomerInfo>) => {
    dispatch({ type: "SET_CUSTOMER", payload: fields });
  }, []);

  const openCart = useCallback(() => dispatch({ type: "SET_OPEN", payload: true }), []);
  const closeCart = useCallback(() => dispatch({ type: "SET_OPEN", payload: false }), []);
  const toggleCart = useCallback(
    () => dispatch({ type: "SET_OPEN", payload: !state.isOpen }),
    [state.isOpen]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setCustomer,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      state,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setCustomer,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
