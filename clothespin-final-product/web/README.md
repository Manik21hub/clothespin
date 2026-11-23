# Clothespin

A sustainability-focused wardrobe management web app that helps you track what you wear, rediscover forgotten pieces, and earn rewards for re-wearing and donating instead of buying new.

## Overview

Clothespin turns your closet into a living wardrobe. Photograph your clothes, log every wear, get insights on your rotation, find nearby donation centers, and earn points redeemable for discounts at circular fashion partners.

### Key Features

- **Pin Your Closet** — Snap photos of items; they're organized by category with optional brand, color, size, and notes
- **Track Every Wear** — One tap logs a wear. See cost-per-wear, streaks, and what's gathering dust
- **Smart Insights** — Category distribution, sustainability score, brand breakdown, environmental impact calculator
- **Donate Locally** — Curated donation centers with distances, hours, and accepted items; log drop-offs via QR code
- **Earn Rewards** — Points for re-wearing rarely used items (+10) and donations (+50/item); redeem for partner discounts
- **Privacy-First** — All data stays in your browser (localStorage). No accounts, no cloud sync, no tracking

## Tech Stack

- **React 19** + **Vite 8** (static output, HashRouter for easy static hosting)
- **Tailwind-free** — Custom CSS with design tokens (CSS custom properties)
- **localStorage** persistence — Single shared store across all screens
- **No backend required** — Fully client-side; works offline after first load

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & Run

```bash
cd clothespin-final-product/web
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

### Deploy

The `dist/` folder is a complete static site. Deploy to any static host:

- **Netlify/Vercel/Cloudflare Pages** — Connect the repo, build command `npm run build`, output `dist`
- **GitHub Pages** — Push `dist/` to a `gh-pages` branch
- **Any web server** — Serve `dist/` as static files

## Project Structure

```
web/
├── public/
│   ├── images/          # 19 optimized WebP item photos, wordmarks, pin icon
│   └── fonts/           # Poppins (Regular, Medium, SemiBold, Bold)
├── src/
│   ├── main.jsx         # App entry, providers, router
│   ├── App.jsx          # Routes: / (landing) and /app/* (app shell)
│   ├── pages/
│   │   └── Landing.jsx  # Marketing landing page
│   ├── app/
│   │   ├── AppShell.jsx # Frame, splash, tabs, toast
│   │   ├── components/  # Sheet, ItemCard, ItemDetail, RewardsModal, DonationQR, etc.
│   │   └── screens/     # Home, Closet, AddItem, Insights, Donate, Profile
│   ├── data/
│   │   ├── items.js          # 19 seed items, category meta, stats helpers
│   │   ├── rewards.js        # 8 rewards, point values, milestones
│   │   └── donationCenters.js# 12 SF mock centers + haversine distance
│   ├── state/
│   │   └── AppState.jsx      # Context + localStorage persistence
│   ├── lib/
│   │   ├── format.js         # Date, relative time, points formatters
│   │   └── image.js          # Client-side JPEG compression
│   └── styles/
│       ├── base.css          # Tokens, reset, buttons, cards, progress
│       ├── landing.css       # Landing page styles
│       └── app.css           # App shell + all screen styles
├── index.html
├── package.json
└── vite.config.js
```

## Points System

| Action | Points |
|--------|--------|
| Donation (per item) | +50 |
| Re-wear rarely/never worn item | +10 |
| First item added | +100 |
| Weekly streak (3+ wears/week) | +25 |
| Milestone reached | +200 |

**Milestones:** 100, 250, 500, 1,000, 1,500, 2,000 points

## Rewards Catalog (Example)

| Reward | Points | Partner |
|--------|--------|---------|
| 10% Off Vintage Finds | 100 | Vintage Revival |
| Free Shipping $25+ | 200 | Thrift Treasure |
| $5 Off Next Purchase | 350 | EcoStyle Boutique |
| Early Access Sale | 500 | Retro Threads |
| 15% Off Everything | 750 | Sustainable Style |
| $20 Off $100+ | 1,000 | Green Fashion Co |
| VIP Shopping Experience | 1,500 | The Circular Closet |
| 25% Off Premium | 2,000 | Luxe Thrift |

## Design System

Colors (CSS custom properties in `base.css`):

```css
--sage: #5f6c37;       /* primary */
--forest: #273617;     /* dark */
--cream: #fefadf;      /* background */
--brown: #dca15d;      /* warm accent */
--rust: #bc6c25;       /* alert/warm */
```

Typography: **Poppins** (400/500/600/700) via `@font-face`

Spacing scale: 4px base, radius 12/18/28px, shadows 3 elevations

## Browser Support

- Chrome 100+, Firefox 100+, Safari 15+, Edge 100+
- Requires `localStorage` (all modern browsers)
- Camera API for photo capture (HTTPS or localhost)

## License

MIT — Free for personal and commercial use.