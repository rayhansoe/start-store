export const createUrl = (pathname: string, params: URLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

const adapter = import.meta.env.VITE_ADAPTER as string

export const API_URL = import.meta.env.DEV || import.meta.env.VITE_ADAPTER === "NODE" ? 'http://localhost:3000' : `https://${import.meta.env.VITE_SITE_DOMAIN}.${adapter.toLowerCase()}.app`