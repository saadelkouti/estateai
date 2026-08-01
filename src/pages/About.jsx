import { motion } from 'framer-motion';
import { FiCompass, FiShield, FiUsers, FiTrendingUp } from 'react-icons/fi';
import Img from '../components/common/Img';

const values = [
  { icon: FiCompass, title: 'Considered curation', text: "Every listing is reviewed before it reaches you — we'd rather show fewer homes and mean it." },
  { icon: FiShield, title: 'Discretion first', text: 'Many of our clients value privacy as much as square footage. We work quietly, by design.' },
  { icon: FiUsers, title: 'Human, not automated', text: 'Behind every profile is an agent who knows the street, the light, and the neighbors.' },
  { icon: FiTrendingUp, title: 'Market fluency', text: 'Pricing guidance grounded in real comparables, not guesswork or inflated hope.' },
];

export default function About() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Our story</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-primary dark:text-surface sm:text-5xl">
          Real estate, without the noise.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-primary/60 dark:text-surface/60">
          EstateAI began as a simple frustration: the homes worth knowing about were buried under
          thousands that weren't. We built a smaller, more considered platform instead — one
          listing at a time, one relationship at a time.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-4xl"
          >
            <Img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&h=800&fit=crop"
              fallbackSeed="about-1"
              alt="Modern luxury home exterior"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center rounded-4xl bg-primary/[0.03] dark:bg-surface/5 p-10"
          >
            <h2 className="font-display text-2xl font-semibold text-primary dark:text-surface">
              A studio, not a marketplace
            </h2>
            <p className="mt-4 leading-relaxed text-primary/60 dark:text-surface/60">
              We work with a small roster of agents across a handful of the world's most sought
              after locations. That focus lets us go deep — on photography, on pricing, on the
              small details that make a house feel like a home before you've even walked in.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-10 text-center font-display text-3xl font-semibold text-primary dark:text-surface">
          What guides us
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-4xl bg-white dark:bg-secondary p-7 shadow-sm"
            >
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-accent/10 text-accent">
                <v.icon size={20} />
              </div>
              <h3 className="font-display font-semibold text-primary dark:text-surface">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary/50 dark:text-surface/50">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
