# EstateAI

A premium, frontend-only real estate platform MVP built with React, Vite, Tailwind CSS,
Framer Motion, React Router, React Icons, and Swiper.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## What's inside

- **156 fake luxury properties** generated deterministically in `src/data/properties.js`,
  spanning 30 cities across 21 countries.
- **15 fake agents** in `src/data/agents.js`.
- **Pages**: Landing, Explore (search + filters + sort + pagination), Property Details
  (gallery, amenities, sticky contact card, related properties, map), Favorites, Agents,
  About, Contact, and a custom 404.
- **Favorites** and **dark/light mode** persist via `localStorage`.
- **Property comparison** (UI only) via a floating compare tray, up to 3 properties.
- Toast notifications, loading skeletons, empty states, and a "viewing pass" ticket-style
  property card as the signature visual motif.
- Fully responsive: desktop, tablet, and mobile.

## Notes

- There is intentionally **no backend, database, or authentication** — everything runs
  client-side, per the project brief.
- The "Map Section" is a stylized illustrative placeholder with fake markers, not a real
  map integration.
- Property photos load from Unsplash's CDN at runtime; if any individual photo URL ever
  goes stale, the `Img` component automatically falls back to a placeholder so no image
  ever appears broken.
