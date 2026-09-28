# 🎂 Doce Arte — Confeitaria Digital

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Checkout-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://www.whatsapp.com/)

## 🎯 Visão geral

PWA mobile-first para uma confeitaria artesanal, combinando catálogo de produtos, portfólio visual, carrinho e checkout via WhatsApp.

O projeto representa um caso real de **comércio local + experiência digital + conversão pelo WhatsApp**.

## 💼 Problema de negócio

Pequenos negócios de alimentação frequentemente dependem de mensagens manuais para apresentar produtos, montar pedidos e iniciar conversas comerciais.

### Solução

Uma experiência de compra simplificada que permite ao cliente:

1. descobrir produtos;
2. selecionar quantidades;
3. revisar o pedido;
4. informar dados de entrega;
5. enviar o pedido estruturado diretamente pelo WhatsApp.

## ✨ Funcionalidades

- Catálogo de pronta entrega
- Controle visual de disponibilidade
- Portfólio por categorias
- Carrinho lateral
- Persistência com `localStorage`
- Checkout estruturado via WhatsApp
- PWA instalável
- Layout mobile-first
- Interface responsiva
- Personalização de produtos e preços

## 🏗️ Arquitetura

```
Next.js App Router
│
├── UI / Components
│   ├── Hero
│   ├── Catalog
│   ├── Portfolio
│   └── Cart
│
├── Data
│   └── products.ts
│
├── State
│   └── useCart.tsx
│
├── Business Logic
│   └── checkout.ts
│
└── Types
    └── index.ts
```

## 📁 Estrutura

```
src/
├── app/
├── components/
│   ├── cart/
│   ├── catalog/
│   ├── portfolio/
│   └── ui/
├── data/
├── hooks/
├── lib/
└── types/

public/
README.md
package.json
.env.local.example
```

## 🚀 Instalação

Requisitos: Node.js 18+ e npm.

```bash
git clone https://github.com/RLGOMES92/dapaz-confeitaria.git
cd dapaz-confeitaria
npm install
```

Configure o ambiente:

```bash
cp .env.local.example .env.local
```

Edite:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=SEU_NUMERO
```

Execute:

```bash
npm run dev
```

Acesse `http://localhost:3000`.

## 🚢 Deploy

Compatível com Vercel:

```bash
npm run build
```

Depois configure `NEXT_PUBLIC_WHATSAPP_NUMBER` como variável de ambiente no provedor de hospedagem.

## 📌 Aplicação comercial

A arquitetura pode ser adaptada para restaurantes, lojas, docerias, salões, clínicas e outros negócios locais que recebem pedidos e leads pelo WhatsApp.

---

**Rodrigo Gomes — Sites de Alta Conversão + Agentes de IA**