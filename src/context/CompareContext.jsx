import { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from './ToastContext';

const CompareContext = createContext(null);
const MAX_COMPARE = 3;

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState([]);
  const { showToast } = useToast();

  const toggleCompare = useCallback((id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= MAX_COMPARE) {
        showToast(`You can compare up to ${MAX_COMPARE} properties at a time`, 'warning');
        return prev;
      }
      return [...prev, id];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearCompare = () => setCompareIds([]);

  return (
    <CompareContext.Provider value={{ compareIds, toggleCompare, clearCompare, MAX_COMPARE }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}
