import { useEffect, useRef } from "react";

interface BeholdWidgetProps {
  feedId: string;
}

export function BeholdWidget({ feedId }: BeholdWidgetProps) {
  useEffect(() => {
    // Avoid double injection in StrictMode
    const existing = document.querySelector('script[src="https://w.behold.so/widget.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://w.behold.so/widget.js";
      script.type = "module";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    // @ts-expect-error custom element from Behold widget script
    <behold-widget feed-id={feedId} style={{ width: "100%", display: "block" }} />
  );
}
