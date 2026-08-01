import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiLinkedin, FiArrowUpRight } from 'react-icons/fi';

const columns = [
  {
    title: 'Discover',
    links: [
      { label: 'Explore Properties', to: '/explore' },
      { label: 'Featured Homes', to: '/explore?featured=true' },
      { label: 'Our Agents', to: '/agents' },
      { label: 'Favorites', to: '/favorites' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About EstateAI', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-primary text-surface">
      <div className="absolute inset-0 bg-aurora opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold text-primary font-display font-bold">
                E
              </span>
              <span className="font-display text-xl font-semibold">
                Estate<span className="text-gradient-gold">AI</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-surface/60">
              Find Your Dream Home. A curated collection of exceptional residences, matched to
              the way you actually want to live.
            </p>
            <div className="mt-6 flex gap-3">
              {[FiInstagram, FiTwitter, FiLinkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-surface/15 text-surface/70 transition-colors hover:border-gold hover:text-gold"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-surface/40">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-surface/70 transition-colors hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-surface/40">
              Stay in the know
            </h4>
            <p className="mt-5 text-sm text-surface/60">
              New listings and market notes, twice a month. No noise.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-2 rounded-full glass p-1.5"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                className="w-full bg-transparent px-4 py-2 text-sm text-surface placeholder:text-surface/40 focus:outline-none"
              />
              <button
                type="submit"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-primary transition-transform hover:scale-105"
                aria-label="Subscribe"
              >
                <FiArrowUpRight />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-surface/10 pt-8 sm:flex-row">
          <p className="text-xs text-surface/40">
            © {new Date().getFullYear()} EstateAI. Crafted for those who notice the details.
          </p>
          <div className="flex gap-6 text-xs text-surface/40">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
