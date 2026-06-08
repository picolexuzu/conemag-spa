import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { LeadFormModal } from "./LeadFormModal";

interface LeadModalContextValue {
  openLead: () => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openLead = useCallback(() => setOpen(true), []);
  return (
    <LeadModalContext.Provider value={{ openLead }}>
      {children}
      <LeadFormModal open={open} onClose={() => setOpen(false)} />
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    return { openLead: () => {} };
  }
  return ctx;
}