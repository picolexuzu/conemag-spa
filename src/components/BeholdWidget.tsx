import { useEffect, useRef } from "react";

interface BeholdWidgetProps {
  feedId: string;
}

export function BeholdWidget({ feedId }: BeholdWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Avoid double injection in StrictMode
    const existing = document.querySelector('script[src="https://w.behold.so/widget.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://w.behold.so/widget.js";
      script.type = "module";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="behold-feed w-full"
      data-beholdid={feedId}
    />
  );
}
