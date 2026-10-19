export function eventPresentationPath(slug?: string) {
  return slug ? `/landingpage/equipamentos/${encodeURIComponent(slug)}` : "/landingpage/equipamentos";
}