import { motion } from 'framer-motion';
import { FiStar, FiMail } from 'react-icons/fi';
import Img from '../common/Img';
import { useToast } from '../../context/ToastContext';

export default function AgentCard({ agent, index = 0 }) {
  const { showToast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index, 6) * 0.06 }}
      className="group flex flex-col overflow-hidden rounded-4xl bg-white dark:bg-secondary shadow-sm hover:shadow-glass transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden">
        <Img
          src={agent.photo}
          fallbackSeed={agent.id}
          alt={agent.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <span className="rounded-full glass px-3 py-1 text-xs font-semibold text-surface">
            {agent.experience} yrs experience
          </span>
          <span className="flex items-center gap-1 rounded-full glass px-3 py-1 text-xs font-semibold text-surface">
            <FiStar className="fill-gold text-gold" /> {agent.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-primary dark:text-surface">{agent.name}</h3>
        <p className="text-sm text-accent">{agent.speciality}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-primary/50 dark:text-surface/50 line-clamp-3">
          {agent.bio}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-primary/5 dark:border-surface/10 pt-4">
          <span className="text-xs text-primary/40 dark:text-surface/40">{agent.dealsClosed} deals closed</span>
          <button
            onClick={() => showToast(`A message has been queued for ${agent.name}`, 'success')}
            className="flex items-center gap-1.5 rounded-full bg-primary dark:bg-gold px-4 py-2 text-xs font-semibold text-surface dark:text-primary transition-transform hover:scale-105"
          >
            <FiMail size={13} /> Contact
          </button>
        </div>
      </div>
    </motion.div>
  );
}
