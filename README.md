# 🎂 Doce Arte — Confeitaria Artesanal

PWA Mobile-First para venda de bolos de pote e portfólio de confeitaria, com checkout via WhatsApp.

---

## ✨ Funcionalidades

- **Catálogo de Pronta Entrega** — Bolos de pote com controle de estoque e botões de quantidade
- **Portfólio com abas** — Filtro por "Bolos Confeitados" e "Papelaria de Festa"
- **Carrinho flutuante** — Drawer com resumo do pedido e formulário de entrega
- **Checkout via WhatsApp** — Mensagem formatada enviada diretamente ao número da loja
- **Persistência** — Dados do cliente salvos no `localStorage` para facilitar pedidos futuros
- **PWA** — Instalável no celular via QR Code, funciona como app nativo

---

## 🚀 Setup

### 1. Instalar dependências
```bash
npm install
# ou
pnpm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.local.example .env.local
```
Edite `.env.local` e coloque seu número do WhatsApp:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=5573999990000
```
> Formato: código do país (55) + DDD + número. Sem espaços ou símbolos.

### 3. Adicionar imagens dos produtos
Coloque suas fotos em `/public/images/`:
```
public/
  images/
    pote-prestigio.jpg
    pote-chocolate.jpg
    pote-pacoca.jpg
    pote-ninho.jpg
    portfolio/
      bolo-floral.jpg
      naked-cake.jpg
      ...
```
> **Dica:** Use imagens quadradas (1:1) para o portfólio e 4:3 para os bolos de pote.

### 4. Rodar em desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:3000`

---

## 📦 Deploy (Vercel — recomendado)

```bash
# 1. Instale a CLI da Vercel
npm i -g vercel

# 2. Faça login
vercel login

# 3. Deploy
vercel --prod
```

Adicione a variável `NEXT_PUBLIC_WHATSAPP_NUMBER` no painel da Vercel em:
**Settings → Environment Variables**

---

## 🗂️ Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Tailwind + tokens globais
│   ├── layout.tsx           # Root layout, fontes, PWA meta
│   └── page.tsx             # Página principal (App Router)
├── components/
│   ├── cart/
│   │   └── CartDrawer.tsx   # Botão flutuante + Drawer completo
│   ├── catalog/
│   │   └── PotCakeCard.tsx  # Card de bolo de pote
│   ├── portfolio/
│   │   └── PortfolioGallery.tsx  # Galeria com filtro por categoria
│   └── ui/
│       ├── Hero.tsx         # Cabeçalho com identidade visual
│       └── SectionHeader.tsx
├── data/
│   └── products.ts          # Mock de dados — edite aqui os produtos
├── hooks/
│   └── useCart.tsx          # Context + Reducer do carrinho
├── lib/
│   └── checkout.ts          # handleCheckout, formatPrice, validação
└── types/
    └── index.ts             # Todos os tipos TypeScript
```

---

## ✏️ Personalização

### Trocar sabores / preços
Edite `src/data/products.ts` — o array `POT_CAKES`.

### Adicionar item ao portfólio
Adicione um objeto ao array `PORTFOLIO_ITEMS` em `src/data/products.ts`.

### Marcar produto como esgotado
```ts
{ id: "pot-ninho", ..., inStock: false }
```

### Mudar cores do tema
Edite as classes `bg-rose-500`, `text-rose-500` e o hex `#C4826A` (terracota) nos componentes e no `tailwind.config.ts`.

### Trocar nome da confeitaria
Edite o `title` em `src/app/layout.tsx` e o texto no `Hero.tsx`.

---

## 🛠️ Tech Stack

| Tecnologia | Uso |
|---|---|
| **Next.js 14** (App Router) | Framework React com SSG/SSR |
| **TypeScript** | Tipagem estática em todo o projeto |
| **Tailwind CSS** | Estilização utility-first |
| **Lucide React** | Ícones leves e consistentes |
| **localStorage** | Persistência dos dados do cliente |
| **WhatsApp API** | Checkout sem gateway de pagamento |

---

## 📱 QR Code

Após o deploy, gere um QR Code apontando para a URL do seu site e distribua no condomínio.

Ferramentas gratuitas: [qr-code-generator.com](https://www.qr-code-generator.com) · [qrcode.me](https://qrcode.me)

---

Feito com 💕 para a confeitaria da família.
