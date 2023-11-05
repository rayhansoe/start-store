export const getCookieObject: (cookieString: string) => {
  [key: string]: string;
} = (cookieString: string) => Object.fromEntries(cookieString.split('; ').map(v => v.split(/=(.*)/s).map(decodeURIComponent)))