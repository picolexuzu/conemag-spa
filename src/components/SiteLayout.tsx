import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { LeadModalProvider } from "./LeadModalProvider";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LeadModalProvider>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </LeadModalProvider>
  );
}
