"use client";

import { useState, useRef, useEffect } from "react";
import { X, Trash2, ShoppingBag, ChevronUp, Loader2, CheckCircle, Instagram } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice, handleCheckout } from "@/lib/checkout";

// ─────────────────────────────────────────────────────────────────
// Floating Cart Button (centro-inferior)
// ─────────────────────────────────────────────────────────────────
export function CartButton() {
  const { totalItems, totalPrice, toggleCart } = useCart();

  if (totalItems === 0) return null;

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl shadow-stone-900/40 transition-all duration-200"
      aria-label="Abrir carrinho"
    >
      <span className="relative">
        <ShoppingBag size={20} />
        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      </span>
      <span className="text-sm font-semibold">Ver Carrinho</span>
      <span className="text-sm font-bold text-rose-300">{formatPrice(totalPrice)}</span>
      <ChevronUp size={16} className="opacity-60" />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// Floating Social Buttons (canto inferior direito, empilhados)
// ─────────────────────────────────────────────────────────────────
export function SocialButtons() {
  const whatsappUrl = `https://wa.me/5511951799052?text=${encodeURIComponent(
    "Olá! Vim pelo cardápio digital e gostaria de mais informações 😊"
  )}`;
  const instagramUrl = "https://instagram.com/dapaz_confeitaria";

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3">
      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram da Doce Arte"
        className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg active:scale-90 transition-transform duration-150"
        style={{
          background: "linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)",
        }}
      >
        <Instagram size={20} className="text-white" strokeWidth={2} />
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp da Doce Arte"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-[#25D366] shadow-lg active:scale-90 transition-transform duration-150"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.551 4.081 1.515 5.79L.057 23.454a.5.5 0 0 0 .491.607.502.502 0 0 0 .135-.019l5.791-1.526A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75A9.743 9.743 0 0 1 6.28 20.12l-.367-.218-3.796 1 1.007-3.686-.24-.381A9.74 9.74 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
        </svg>
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Cart Drawer (sem formulário de endereço)
// ─────────────────────────────────────────────────────────────────
export function CartDrawer() {
  const { state, totalItems, totalPrice, updateQuantity, removeItem, clearCart, closeCart } =
    useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    if (state.isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state.isOpen, closeCart]);

  function onCheckout() {
    setIsSubmitting(true);

    const result = handleCheckout(state.items, totalPrice);

    if (!result.valid) {
      setIsSubmitting(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      clearCart();
      closeCart();
      setSuccess(false);
      setIsSubmitting(false);
    }, 2000);
  }

  if (!state.isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[92vh] flex flex-col animate-in slide-in-from-bottom duration-300"
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-stone-200 rounded-full" />
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100">
          <div>
            <h2 className="font-display text-lg font-bold text-stone-800">Seu Pedido</h2>
            <p className="text-xs text-stone-400">{totalItems} {totalItems === 1 ? "item" : "itens"}</p>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
            aria-label="Fechar carrinho"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">

          {success && (
            <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
              <CheckCircle className="text-emerald-500" size={48} />
              <p className="font-display text-lg font-bold text-stone-800">
                Pedido enviado!
              </p>
              <p className="text-sm text-stone-500">
                Você será redirecionado ao WhatsApp para combinar a entrega.
              </p>
            </div>
          )}

          {!success && (
            <>
              {state.items.length === 0 && (
                <div className="flex flex-col items-center py-12 gap-3 text-center text-stone-400">
                  <ShoppingBag size={36} strokeWidth={1.5} />
                  <p className="text-sm">Seu carrinho está vazio.</p>
                  <button onClick={closeCart} className="text-rose-500 text-sm font-semibold underline underline-offset-2">
                    Ver produtos
                  </button>
                </div>
              )}

              {state.items.length > 0 && (
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center gap-3 bg-stone-50 rounded-2xl p-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-stone-400 truncate">{item.name}</p>
                        <p className="text-sm font-semibold text-stone-800 truncate">{item.flavor}</p>
                        <p className="text-xs font-bold text-rose-500 mt-0.5">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 border border-stone-200">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-rose-500 transition-colors"
                          aria-label="Diminuir quantidade"
                        >
                          –
                        </button>
                        <span className="w-4 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-500 hover:text-rose-500 transition-colors"
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-rose-50 hover:text-rose-500 text-stone-400 transition-colors"
                        aria-label={`Remover ${item.flavor}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {state.items.length > 0 && !success && (
          <div className="px-5 pt-3 pb-8 border-t border-stone-100 space-y-3 bg-white">
            <div className="flex justify-between items-center">
              <span className="text-sm text-stone-500 font-medium">Total do pedido</span>
              <span className="font-display text-xl font-bold text-stone-800">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <button
              onClick={onCheckout}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 active:scale-[0.98] text-white font-bold py-4 rounded-2xl text-sm transition-all duration-150 shadow-lg shadow-emerald-500/30"
            >
              {isSubmitting ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.108.551 4.081 1.515 5.79L.057 23.454a.5.5 0 0 0 .491.607.502.502 0 0 0 .135-.019l5.791-1.526A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75A9.743 9.743 0 0 1 6.28 20.12l-.367-.218-3.796 1 1.007-3.686-.24-.381A9.74 9.74 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                  </svg>
                  Confirmar via WhatsApp
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-stone-400">
              Você será redirecionado ao WhatsApp para confirmar o pedido
            </p>
          </div>
        )}
      </div>
    </>
  );
}