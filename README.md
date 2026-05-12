# Pipo & Co — Frontend

React storefront for the Pipo & Co pet food e-commerce platform. Built with Vite, Tailwind CSS, and React Router.

> Demo en vivo → [Ver Página web](https://www.pipoandco.com.ar/) 

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Routing | React Router DOM 7 |
| HTTP Client | Axios |
| UI Components | React Bootstrap, Headless UI |
| Icons | Lucide React, Hero Icons |

## Project Structure

```
Front/
├── src/
│   ├── main.jsx              # Entry point — mounts app with BrowserRouter
│   ├── App.jsx               # Root component — routing, cart state, scroll-to-top
│   ├── pages/
│   │   ├── Home/             # Landing page (hero, catalog, testimonials)
│   │   ├── Login/            # Login form
│   │   ├── Register/         # Registration form
│   │   │   └── RegisterConfirmacion/  # Post-registration success screen
│   │   └── Checkout/         # Order form
│   │       └── Confirmacion/ # Order confirmation with WhatsApp link
│   ├── components/
│   │   ├── BarraNav.jsx      # Sticky navbar with user dropdown and cart icon
│   │   ├── Catalogo.jsx      # Product grid fetched from API
│   │   ├── CarritoSidebar.jsx# Sliding cart panel
│   │   ├── Hero.jsx
│   │   ├── BannerPromo.jsx
│   │   ├── Ingredientes.jsx
│   │   ├── Features.jsx
│   │   ├── Testimonios.jsx
│   │   ├── RedesSociales.jsx
│   │   └── Footer.jsx
│   └── assets/               # Images and static files
```

## Routes

| Path | Page |
|---|---|
| `/` | Home — hero, product catalog, features |
| `/login` | Login form |
| `/register` | Registration form |
| `/registro/confirmacion` | Registration success |
| `/checkout` | Order form (requires items in cart) |
| `/checkout/confirmacion` | Order confirmation |

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (see `Back/README.md`)

### Installation

```bash
git clone <repo-url>
cd Front
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:8080
```

### Running

```bash
npm run dev
```

App starts on `http://localhost:5173`.

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Key Features

### Shopping Cart
Cart state lives in `App.jsx` and is passed down via props. Supports adding items, adjusting quantities, and removing products. The cart is displayed in a sliding sidebar (`CarritoSidebar`).

### User Authentication
Users register and log in via the backend API. The session (user object) is stored in `localStorage` and cleared on logout. A custom event keeps multiple tabs in sync.

### Checkout Flow
The checkout page collects shipping details (name, email, phone, address) and delivery mode (`envio` for delivery, `retiro` for pickup). On success the backend sends an order confirmation email and the confirmation page shows a WhatsApp contact link.

### Responsive Design
Mobile-first layout using Tailwind CSS. The navbar collapses to a hamburger menu on small screens.

## Design Tokens

| Token | Value |
|---|---|
| Primary green | `#60804F` |
| Accent green | `#8fbc6a` |
| Background | Dark neutral |

## Backend Integration

All API calls use Axios with the base URL set from `VITE_API_URL`. Key endpoints consumed:

- `POST /api/usuarios/registro` — register
- `POST /api/usuarios/login` — login
- `GET /api/productos` — load product catalog
- `POST /api/pedidos` — submit order
