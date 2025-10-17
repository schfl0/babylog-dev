export const APP_ORIGIN = typeof window !== "undefined" ? window.location.origin : import.meta.env.VITE_APP_ORIGIN || "http://localhost:3000";

export function buildUrl(path){
  if(/^https?:\/\//.test(path)) return path;
  if(path.startsWith("/")) path = path.slice(1);

  return `${APP_ORIGIN}/${path}`
}