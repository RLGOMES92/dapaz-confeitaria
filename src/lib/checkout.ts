import type { CartItem } from "@/types";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5511951799052";

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

function buildWhatsAppMessage(items: CartItem[], total: number): string {
  const lines: string[] = [
    "🎂 *NOVO PEDIDO — Doce Arte*",
    "─────────────────────────",
    "",
    "*📋 Itens do Pedido:*",
    "",
  ];

  items.forEach((item) => {
    lines.push(`• ${item.quantity}x *${item.flavor}* — ${formatPrice(item.price * item.quantity)}`);
  });

  lines.push("");
  lines.push("─────────────────────────");
  lines.push(`💰 *Total: ${formatPrice(total)}*`);
  lines.push("");
  lines.push("_Pedido feito pelo cardápio digital_ 🏘️");

  return lines.join("\n");
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function handleCheckout(items: CartItem[], total: number): ValidationResult {
  if (items.length === 0) {
    return { valid: false, errors: { cart: "Carrinho vazio." } };
  }

  const message = buildWhatsAppMessage(items, total);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");

  return { valid: true, errors: {} };
}

export function buildPortfolioQuoteUrl(itemTitle: string, category: string): string {
  const message = [
    `Olá! Vi o portfólio de vocês e tenho interesse em um orçamento. 🎨`,
    ``,
    `*Item:* ${itemTitle}`,
    `*Categoria:* ${category}`,
    ``,
    `Poderia me passar mais informações sobre disponibilidade e valores?`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}