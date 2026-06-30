import { POT_CAKES, PORTFOLIO_ITEMS } from "@/data/products";
import Hero from "@/components/ui/Hero";
import SectionHeader from "@/components/ui/SectionHeader";
import PotCakeCard from "@/components/catalog/PotCakeCard";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import { CartButton, CartDrawer, SocialButtons } from "@/components/cart/CartDrawer";

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <Hero />

      <main className="max-w-lg mx-auto px-4 pb-32 space-y-12">

        {/* ── Section 1: Pronta Entrega ─────────────── */}
        <section>
          <SectionHeader
            emoji="🍫"
            title="Pronta Entrega"
            subtitle="Bolos de pote fresquinhos, disponíveis hoje. Pedido via WhatsApp."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {POT_CAKES.map((product) => (
              <PotCakeCard key={product.id} product={product} />
            ))}
          </div>

          {/* Stock notice */}
          <p className="text-center text-[11px] text-stone-400 mt-4">
            ⚡ Estoque limitado · Atualizado diariamente
          </p>
        </section>

        {/* ── Divider ───────────────────────────────── */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-stone-200" />
          <span className="text-stone-300 text-lg">✦</span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        {/* ── Section 2: Encomendas & Portfólio ──────── */}
        <section>
          <SectionHeader
            emoji="✨"
            title="Encomendas & Portfólio"
            subtitle="Bolos confeitados e papelaria personalizados para o seu evento. Solicite um orçamento pelo WhatsApp."
          />

          <PortfolioGallery items={PORTFOLIO_ITEMS} />
        </section>

        {/* ── Footer ────────────────────────────────── */}
        <footer className="text-center space-y-1 pt-4">
          <p className="font-display text-base font-semibold text-stone-600">
            Doce Arte ✦ Confeitaria Artesanal
          </p>
          <p className="text-[11px] text-stone-400">
            Feito com 💕 para o nosso condomínio
          </p>
        </footer>
      </main>

      {/* ── Cart (floating button + drawer) ─────────── */}
      <CartButton />
      <CartDrawer />
      <SocialButtons />
    </>
  );
}