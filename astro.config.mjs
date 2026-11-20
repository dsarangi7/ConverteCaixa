// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { DEFAULT_LOCALE_PATH, findRoute, LEGACY_REDIRECTS } from './src/lib/seo-routes.ts';

/**
 * @param {{ url?: string }} req
 * @param {{ statusCode: number, setHeader: (name: string, value: string) => void, end: (body?: string) => void }} res
 * @param {() => void} next
 */
function canonicalRedirect(req, res, next) {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const { pathname, search } = url;

  const legacy = LEGACY_REDIRECTS.find((rule) => rule.from === pathname);
  if (legacy) {
    res.statusCode = 301;
    res.setHeader('Location', `${legacy.to}${search}`);
    res.end();
    return;
  }

  if (pathname === '/' || pathname === '/index.html') {
    res.statusCode = 301;
    res.setHeader('Location', `${DEFAULT_LOCALE_PATH}${search}`);
    res.end();
    return;
  }

  if (!pathname.endsWith('/') && !pathname.includes('.')) {
    const target = `${pathname}/`;
    if (findRoute(target)) {
      res.statusCode = 301;
      res.setHeader('Location', `${target}${search}`);
      res.end();
      return;
    }
  }

  next();
}

/** @type {import('vite').Plugin} */
const canonicalRedirectPlugin = {
  name: 'canonical-redirects',
  configureServer(server) {
    return () => {
      server.middlewares.stack.unshift({ route: '', handle: canonicalRedirect });
    };
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://convertecaixa.com',
  // Canonical URLs end with a slash. Directory output writes `/page/index.html`,
  // which Cloudflare Pages serves at `/page/`. Slashless paths and `/` are
  // permanent redirects in `public/_redirects`, generated from `src/lib/seo-routes.ts`.
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss(), canonicalRedirectPlugin],
  },
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    format: 'directory',
  },
});
