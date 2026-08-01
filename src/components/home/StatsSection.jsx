import { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setValue(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-primary dark:text-surface sm:text-5xl">
      {value.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { label: 'Homes listed', value: 156, suffix: '+' },
  { label: 'Countries represented', value: 21 },
  { label: 'Expert agents', value: 15 },
  { label: 'Client satisfaction', value: 98, suffix: '%' },
];

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid grid-cols-2 gap-8 rounded-4xl bg-primary/[0.03] dark:bg-surface/5 p-10 sm:grid-cols-4 sm:p-14">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center"
          >
            <Counter to={s.value} suffix={s.suffix} />
            <p className="mt-2 text-sm text-primary/50 dark:text-surface/50">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
