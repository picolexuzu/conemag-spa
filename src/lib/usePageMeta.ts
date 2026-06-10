import { useEffect } from "react";

interface Meta {
  title?: string;
  description?: string;
  ogImage?: string;
  noindex?: boolean;
}

function upsertMeta(selector: string, attr: "name" | "property", attrValue: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({ title, description, ogImage, noindex }: Meta) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      upsertMeta('meta[name="description"]', "name", "description", description);
      upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    }
    if (title) {
      upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    }
    if (ogImage) {
      upsertMeta('meta[property="og:image"]', "property", "og:image", ogImage);
      upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
    }
    upsertMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow",
    );
  }, [title, description, ogImage, noindex]);
}
