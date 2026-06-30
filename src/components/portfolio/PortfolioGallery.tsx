"use client";

import { useState } from "react";
import Image from "next/image";
import { MessageCircle, ExternalLink } from "lucide-react";
import type { PortfolioCategory, PortfolioItem } from "@/types";
import { buildPortfolioQuoteUrl } from "@/lib/checkout";

const CATEGORIES: PortfolioCategory[] = ["Bolos Confeitados", "Papelaria de Festa"];

interface Props {
  items: PortfolioItem[];
}

export default function PortfolioGallery({ items }: Props) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>(
    "Bolos Confeitados"
  );

  const filtered = items.filter((item) => item.category === activeCategory);

  return (
    <section>
      {/* Category tabs */}
      <div className="flex gap-2 mb-6 bg-stone-100 p-1 rounded-full">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-1 text-xs font-semibold py-2 px-3 rounded-full transition-all duration-200 ${
              activeCategory === cat
                ? "bg-white text-rose-500 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12 text-stone-400">
          <p className="text-sm">Nenhum item nesta categoria ainda.</p>
        </div>
      )}
    </section>
  );
}

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const quoteUrl = buildPortfolioQuoteUrl(item.title, item.category);

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 group">
      {/* Image */}
      <div className="relative w-full aspect-square bg-stone-100 overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvnx5PQAHkgJTzLCH5QAAAABJRU5ErkJggg=="
        />
      </div>

      {/* Content */}
      <div className="p-3 space-y-2.5">
        <h3 className="font-display text-sm font-semibold text-stone-800 leading-tight line-clamp-2">
          {item.title}
        </h3>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[9px] bg-rose-50 text-rose-400 font-medium px-1.5 py-0.5 rounded-full uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <a
          href={quoteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-[11px] font-bold py-2 px-3 rounded-xl transition-all duration-150"
        >
          <MessageCircle size={12} />
          Solicitar Orçamento
          <ExternalLink size={10} className="opacity-70" />
        </a>
      </div>
    </article>
  );
}
