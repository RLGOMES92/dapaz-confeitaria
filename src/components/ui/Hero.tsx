import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-[#FFF8F3] hero-dots pt-10 pb-8 px-5">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #C4826A, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #F2D4C8, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-md mx-auto text-center space-y-3">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100 text-rose-500 text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
          <Sparkles size={11} />
          Feito com amor no condomínio
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl font-bold leading-tight text-stone-900">
          Doce{" "}
          <span className="relative inline-block">
            Arte
            {/* Underline accent */}
            <span
              aria-hidden
              className="absolute left-0 -bottom-1 w-full h-1 rounded-full"
              style={{ background: "linear-gradient(90deg, #C4826A, #F2D4C8)" }}
            />
          </span>
        </h1>

        <p className="text-sm text-stone-500 leading-relaxed max-w-xs mx-auto">
          Bolos de pote na pronta entrega e encomendas artesanais, direto para o seu apartamento.
        </p>
      </div>
    </header>
  );
}
