export function eventPresentationPath(slug?: string) {
  return slug ? `/landingpage/${encodeURIComponent(slug)}` : "/landingpage";
}
export const eventThankYouPath = "/landingpage/obrigado";
export const eventCatalogRedirectDelay = 5000;