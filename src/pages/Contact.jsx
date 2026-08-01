import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiCheck } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';

const offices = [
  { city: 'New York', address: '412 Fifth Avenue, Suite 900' },
  { city: 'London', address: '18 Berkeley Square, Mayfair' },
  { city: 'Dubai', address: 'DIFC, Gate Village 7' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    showToast('Your message has been sent — we usually reply within a day', 'success');
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">Get in touch</span>
        <h1 className="mt-2 font-display text-4xl font-semibold text-primary dark:text-surface">Contact Us</h1>
        <p className="mx-auto mt-3 max-w-lg text-primary/50 dark:text-surface/50">
          Questions about a property, a partnership, or just want to say hello — we'd love to hear from you.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <div className="rounded-4xl bg-primary/[0.03] dark:bg-surface/5 p-6">
            <FiMail className="mb-3 text-xl text-accent" />
            <p className="font-semibold text-primary dark:text-surface">Email</p>
            <p className="text-sm text-primary/50 dark:text-surface/50">hello@estateai.com</p>
          </div>
          <div className="rounded-4xl bg-primary/[0.03] dark:bg-surface/5 p-6">
            <FiPhone className="mb-3 text-xl text-accent" />
            <p className="font-semibold text-primary dark:text-surface">Phone</p>
            <p className="text-sm text-primary/50 dark:text-surface/50">+1 (415) 555-0100</p>
          </div>
          {offices.map((o) => (
            <div key={o.city} className="rounded-4xl bg-primary/[0.03] dark:bg-surface/5 p-6">
              <FiMapPin className="mb-3 text-xl text-accent" />
              <p className="font-semibold text-primary dark:text-surface">{o.city}</p>
              <p className="text-sm text-primary/50 dark:text-surface/50">{o.address}</p>
            </div>
          ))}
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="rounded-4xl bg-white dark:bg-secondary p-8 shadow-glass"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <input required placeholder="First name" className="rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-4 py-3 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent" />
            <input required placeholder="Last name" className="rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-4 py-3 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent" />
          </div>
          <input required type="email" placeholder="Email address" className="mt-5 w-full rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-4 py-3 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent" />
          <select required defaultValue="" className="mt-5 w-full rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-4 py-3 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent">
            <option value="" disabled>What can we help with?</option>
            <option>Buying a property</option>
            <option>Selling a property</option>
            <option>Renting a property</option>
            <option>Partnership</option>
            <option>Something else</option>
          </select>
          <textarea required rows={5} placeholder="Your message" className="mt-5 w-full rounded-xl border border-primary/10 dark:border-surface/15 bg-transparent px-4 py-3 text-sm text-primary dark:text-surface focus:outline-none focus:border-accent" />
          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary dark:bg-gold py-3.5 text-sm font-semibold text-surface dark:text-primary transition-transform hover:scale-105"
          >
            {sent ? (<><FiCheck /> Message Sent</>) : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
