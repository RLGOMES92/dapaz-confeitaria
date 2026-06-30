import type { PotCakeProduct, PortfolioItem } from "@/types";

// ─────────────────────────────────────────────────────────────────
// Bolos de Pote — Pronta Entrega
// Preços em centavos (BRL) para evitar float arithmetic
// ─────────────────────────────────────────────────────────────────
export const POT_CAKES: PotCakeProduct[] = [
  {
    id: "pot-prestigio",
    name: "Bolo de Pote",
    flavor: "Prestígio",
    description:
      "Camadas de bolo de chocolate com recheio cremoso de coco e cobertura de ganache.",
    price: 2200,
    imageUrl: "/images/pote-prestigio.jpg",
    inStock: true,
    badge: "Mais Vendido",
  },
  {
    id: "pot-chocolate-gourmet",
    name: "Bolo de Pote",
    flavor: "Chocolate Gourmet",
    description:
      "Bolo úmido de cacau 70% com ganache de chocolate belga e raspas crocantes.",
    price: 1200,
    imageUrl: "/images/pote-chocolate.jpg",
    inStock: true,
    badge: "Premium",
  },
  {
    id: "pot-pacoca",
    name: "Bolo de Pote",
    flavor: "Paçoca",
    description:
      "Bolo de amendoim com camadas de creme de paçoca artesanal e farofa crocante.",
    price: 1000,
    imageUrl: "/images/pote-pacoca.jpg",
    inStock: true,
  },
  {
    id: "pot-ninho-morango",
    name: "Bolo de Pote",
    flavor: "Ninho com Morango",
    description:
      "Bolo branco com creme aveludado de leite Ninho e morangos frescos em calda.",
    price: 1200,
    imageUrl: "/images/pote-ninho.jpg",
    inStock: false, // esgotado — demonstra a flag
    badge: "Favorito",
  },
];

// ─────────────────────────────────────────────────────────────────
// Portfólio — Encomendas & Papelaria
// ─────────────────────────────────────────────────────────────────
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Bolos Confeitados
  {
    id: "cake-001",
    title: "Bolo Floral Aquarela",
    category: "Bolos Confeitados",
    imageUrl: "/images/portfolio/bolo-floral.jpg",
    description: "Flores em buttercream estilo aquarela, tema jardim provençal.",
    tags: ["Aniversário", "Feminino", "Floral"],
  },
  {
    id: "cake-002",
    title: "Naked Cake Rústico",
    category: "Bolos Confeitados",
    imageUrl: "/images/portfolio/naked-cake.jpg",
    description: "Camadas expostas com frutas vermelhas e mel de baunilha.",
    tags: ["Casamento", "Rústico", "Frutas"],
  },
  {
    id: "cake-003",
    title: "Bolo Infantil Fazendinha",
    category: "Bolos Confeitados",
    imageUrl: "/images/portfolio/bolo-fazendinha.jpg",
    description: "Animais em pasta americana e capim em chantilly verde.",
    tags: ["Infantil", "Temático", "Fazendinha"],
  },
  {
    id: "cake-004",
    title: "Drip Cake Ombre Rose",
    category: "Bolos Confeitados",
    imageUrl: "/images/portfolio/drip-cake.jpg",
    description: "Degradê em tons de rosa com drip de chocolate ruby.",
    tags: ["Aniversário", "Moderno", "Ombre"],
  },
  {
    id: "cake-005",
    title: "Bolo Geode Cristal",
    category: "Bolos Confeitados",
    imageUrl: "/images/portfolio/bolo-geode.jpg",
    description: "Cristais de açúcar artesanais simulando geodo de ametista.",
    tags: ["Adulto", "Luxo", "Geode"],
  },
  // Papelaria de Festa
  {
    id: "pap-001",
    title: "Kit Papelaria Boho",
    category: "Papelaria de Festa",
    imageUrl: "/images/portfolio/papelaria-boho.jpg",
    description: "Convite, tag, toppers e rótulos em estilo boho com penas e ramos.",
    tags: ["Boho", "Feminino", "Kit Completo"],
  },
  {
    id: "pap-002",
    title: "Convite Digital Aquarela",
    category: "Papelaria de Festa",
    imageUrl: "/images/portfolio/convite-aquarela.jpg",
    description: "Convite animado para WhatsApp com fundo aquarela floral.",
    tags: ["Digital", "Aquarela", "WhatsApp"],
  },
  {
    id: "pap-003",
    title: "Rótulos Personalizados",
    category: "Papelaria de Festa",
    imageUrl: "/images/portfolio/rotulos.jpg",
    description: "Rótulos para garrafinhas, bisnaguinhas e lembrancinhas.",
    tags: ["Rótulos", "Personalizado", "Lembrancinha"],
  },
  {
    id: "pap-004",
    title: "Painel Backdrop Floral",
    category: "Papelaria de Festa",
    imageUrl: "/images/portfolio/backdrop.jpg",
    description: "Arte para impressão de painel backdrop com flores 3D.",
    tags: ["Backdrop", "Painel", "Floral"],
  },
];
