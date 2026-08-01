import { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheckCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi';

const ToastContext = createContext(null);

const icons = {
  success: FiCheckCircle,
  info: FiInfo,
  warning: FiAlertTriangle,
};

const accentColor = {
  success: 'text-success',
  info: 'text-accent',
  warning: 'text-gold',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = icons[toast.type] || FiInfo;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className="glass-light pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-3 shadow-glass min-w-[260px] max-w-sm"
              >
                <Icon className={`shrink-0 text-lg ${accentColor[toast.type] || 'text-accent'}`} />
                <p className="text-sm font-medium text-primary dark:text-surface">{toast.message}</p>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="ml-auto shrink-0 text-primary/40 hover:text-primary dark:text-surface/40 dark:hover:text-surface transition-colors"
                  aria-label="Dismiss notification"
                >
                  <FiX />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
