"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import type { PotCakeProduct } from "@/types";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/checkout";

interface Props {
  product: PotCakeProduct;
}

export default function PotCakeCard({ product }: Props) {
  const { state, addItem, updateQuantity } = useCart();

  const cartItem = state.items.find((i) => i.productId === product.id);
  const qty = cartItem?.quantity ?? 0;

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      flavor: product.flavor,
      price: product.price,
    });
  }

  function handleDecrement() {
    updateQuantity(product.id, qty - 1);
  }

  return (
    <article
      className={`relative bg-white rounded-2xl shadow-sm border overflow-hidden transition-all duration-200 ${
        product.inStock
          ? "border-stone-100 hover:shadow-md hover:-translate-y-0.5"
          : "border-stone-100 opacity-70"
      }`}
    >
      {/* Badge */}
      {product.badge && product.inStock && (
        <span className="absolute top-3 left-3 z-10 bg-rose-500 text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
          {product.badge}
        </span>
      )}

      {/* Out-of-stock overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
          <span className="bg-stone-700 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            Esgotado
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative w-full h-44 bg-stone-100">
        <Image
          src={product.imageUrl}
          alt={`${product.name} sabor ${product.flavor}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvnx5PQAHkgJTzLCH5QAAAABJRU5ErkJggg=="
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <p className="text-[11px] font-medium text-rose-400 uppercase tracking-widest mb-0.5">
            {product.name}
          </p>
          <h3 className="font-display text-lg font-semibold text-stone-800 leading-tight">
            {product.flavor}
          </h3>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="font-display text-xl font-bold text-stone-800">
            {formatPrice(product.price)}
          </span>

          {/* Quantity controls */}
          {product.inStock && (
            <div className="flex items-center gap-2">
              {qty > 0 ? (
                <div className="flex items-center gap-2 bg-stone-50 rounded-full px-1 border border-stone-200">
                  <button
                    onClick={handleDecrement}
                    aria-label="Remover um"
                    className="w-8 h-8 flex items-center justify-center rounded-full text-stone-600 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                  >
                    <Minus size={14} strokeWidth={2.5} />
                  </button>
                  <span className="w-5 text-center text-sm font-bold text-stone-800">
                    {qty}
                  </span>
                  <button
                    onClick={handleAdd}
                    aria-label="Adicionar um"
                    className="w-8 h-8 flex items-center justify-center rounded-full text-stone-600 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                  >
                    <Plus size={14} strokeWidth={2.5} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-all duration-150"
                >
                  <ShoppingBag size={13} />
                  Adicionar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
