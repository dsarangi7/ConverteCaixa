/**
 * Indexable URLs for ConverteCaixa.
 *
 * Every public page uses one shape: a trailing slash. Canonical tags, hreflang,
 * internal links, the XML sitemap, and Cloudflare redirects all read this list
 * so they cannot drift apart. The bare root is intentionally absent: `/` is a
 * permanent redirect to `/pt/` and must not be indexed.
 */
import { SITE, type Locale } from './config';

export const DEFAULT_LOCALE_PATH = '/pt/';
const LASTMOD = '2026-11-18';

export interface SeoRoute {
  path: string;
  lang: Locale;
  alternate?: string;
  changefreq: 'monthly';
  priority: string;
  lastmod: string;
}

interface RouteDefinition {
  path: string;
  lang: Locale;
  alternate?: string;
  priority: string;
}

const ROUTE_DEFINITIONS: RouteDefinition[] = [
  { path: '/pt/', lang: 'pt-BR', alternate: '/en/', priority: '0.9' },
  { path: '/pt/converter-maiusculas-minusculas/', lang: 'pt-BR', alternate: '/en/case-converter/', priority: '1.0' },
  { path: '/pt/gerador-de-texto-negrito/', lang: 'pt-BR', alternate: '/en/bold-text-generator/', priority: '1.0' },
  { path: '/pt/sobre/', lang: 'pt-BR', alternate: '/en/about/', priority: '0.5' },
  { path: '/pt/contato/', lang: 'pt-BR', alternate: '/en/contact/', priority: '0.5' },
  { path: '/pt/politica-de-privacidade/', lang: 'pt-BR', alternate: '/en/privacy-policy/', priority: '0.3' },
  { path: '/pt/termos-de-uso/', lang: 'pt-BR', alternate: '/en/terms-and-conditions/', priority: '0.3' },
  { path: '/pt/politica-de-cookies/', lang: 'pt-BR', alternate: '/en/cookie-policy/', priority: '0.3' },
  { path: '/pt/declaracao-de-acessibilidade/', lang: 'pt-BR', alternate: '/en/accessibility-statement/', priority: '0.3' },

  { path: '/en/', lang: 'en', alternate: '/pt/', priority: '0.9' },
  { path: '/en/case-converter/', lang: 'en', alternate: '/pt/converter-maiusculas-minusculas/', priority: '1.0' },
  { path: '/en/bold-text-generator/', lang: 'en', alternate: '/pt/gerador-de-texto-negrito/', priority: '1.0' },
  { path: '/en/uppercase-to-lowercase/', lang: 'en', priority: '0.8' },
  { path: '/en/sentence-case-converter/', lang: 'en', priority: '0.8' },
  { path: '/en/title-case-converter/', lang: 'en', priority: '0.8' },
  { path: '/en/about/', lang: 'en', alternate: '/pt/sobre/', priority: '0.5' },
  { path: '/en/contact/', lang: 'en', alternate: '/pt/contato/', priority: '0.5' },
  { path: '/en/privacy-policy/', lang: 'en', alternate: '/pt/politica-de-privacidade/', priority: '0.3' },
  { path: '/en/terms-and-conditions/', lang: 'en', alternate: '/pt/termos-de-uso/', priority: '0.3' },
  { path: '/en/cookie-policy/', lang: 'en', alternate: '/pt/politica-de-cookies/', priority: '0.3' },
  { path: '/en/accessibility-statement/', lang: 'en', alternate: '/pt/declaracao-de-acessibilidade/', priority: '0.3' },

  { path: '/sitemap/', lang: 'en', priority: '0.2' },
];

/**
 * Retired URLs that Google still requests. They are not pages and must not be
 * indexed. Each slash form redirects once to the live canonical tool.
 */
export const LEGACY_REDIRECTS: ReadonlyArray<{ from: string; to: string }> = [
  { from: '/en/font-text-generator', to: '/en/bold-text-generator/' },
  { from: '/en/font-text-generator/', to: '/en/bold-text-generator/' },
];

export const SEO_ROUTES: SeoRoute[] = ROUTE_DEFINITIONS.map((route) => ({
  ...route,
  changefreq: 'monthly' as const,
  lastmod: LASTMOD,
}));

export function withTrailingSlash(pathname: string): string {
  const pathOnly = pathname.split(/[?#]/, 1)[0] || '/';
  const withLeading = pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
  if (withLeading === '/') return '/';
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

export function absoluteUrl(pathname: string): string {
  return `${SITE.baseUrl}${withTrailingSlash(pathname)}`;
}

export function findRoute(pathname: string): SeoRoute | undefined {
  const normalized = withTrailingSlash(pathname);
  return SEO_ROUTES.find((route) => route.path === normalized);
}

export interface HreflangLink {
  hreflang: 'pt-BR' | 'en' | 'x-default';
  href: string;
}

export function hreflangLinks(route: SeoRoute): HreflangLink[] {
  if (!route.alternate) {
    const href = absoluteUrl(route.path);
    return [
      { hreflang: route.lang, href },
      { hreflang: 'x-default', href },
    ];
  }

  const alternate = SEO_ROUTES.find((candidate) => candidate.path === route.alternate);
  if (!alternate) {
    throw new Error(`Missing hreflang alternate for ${route.path}: ${route.alternate}`);
  }

  const portuguese = route.lang === 'pt-BR' ? route : alternate;
  const english = route.lang === 'en' ? route : alternate;
  return [
    { hreflang: 'pt-BR', href: absoluteUrl(portuguese.path) },
    { hreflang: 'en', href: absoluteUrl(english.path) },
    { hreflang: 'x-default', href: absoluteUrl(portuguese.path) },
  ];
}

export function localeSwitchHrefs(pathname: string): { pt: string; en: string } {
  const route = findRoute(pathname);
  if (!route) return { pt: DEFAULT_LOCALE_PATH, en: '/en/' };
  if (route.lang === 'pt-BR') {
    return { pt: route.path, en: route.alternate ?? '/en/' };
  }
  return { pt: route.alternate ?? DEFAULT_LOCALE_PATH, en: route.path };
}

function xmlEscape(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function renderSitemap(routes: SeoRoute[] = SEO_ROUTES): string {
  const urls = routes.map((route) => {
    const links = hreflangLinks(route)
      .map((link) => `    <xhtml:link rel="alternate" hreflang="${link.hreflang}" href="${xmlEscape(link.href)}" />`)
      .join('\n');
    return `  <url>
    <loc>${xmlEscape(absoluteUrl(route.path))}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${links}
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n\n')}
</urlset>
`;
}

export function renderRedirects(routes: SeoRoute[] = SEO_ROUTES): string {
  const lines = [
    '# Permanent redirects for Cloudflare Pages. Redirects run before static files.',
    '# The site root is not a page: it permanently sends visitors to the Portuguese homepage.',
    `/ ${DEFAULT_LOCALE_PATH} 301`,
    `/index.html ${DEFAULT_LOCALE_PATH} 301`,
    '',
    '# One URL style: trailing slash. Slashless paths redirect to that canonical.',
  ];

  const seen = new Set<string>();
  for (const route of routes) {
    const bare = route.path.slice(0, -1);
    if (!bare || seen.has(bare)) continue;
    seen.add(bare);
    lines.push(`${bare} ${route.path} 301`);
  }

  if (LEGACY_REDIRECTS.length > 0) {
    lines.push('');
    lines.push('# Retired URLs. Both slash forms go straight to the live canonical, with no extra hop.');
    for (const redirect of LEGACY_REDIRECTS) {
      lines.push(`${redirect.from} ${redirect.to} 301`);
    }
  }

  lines.push('');
  return lines.join('\n');
}

export function assertSeoRoutes(routes: SeoRoute[] = SEO_ROUTES): void {
  const byPath = new Map(routes.map((route) => [route.path, route]));
  const paths = new Set<string>();

  for (const route of routes) {
    if (route.path === '/' || !route.path.startsWith('/') || !route.path.endsWith('/') || route.path.includes('//')) {
      throw new Error(`Canonical path must be a single trailing-slash URL: ${route.path}`);
    }
    if (paths.has(route.path)) {
      throw new Error(`Duplicate canonical path: ${route.path}`);
    }
    paths.add(route.path);

    if (!route.alternate) continue;
    const other = byPath.get(route.alternate);
    if (!other || other.alternate !== route.path || other.lang === route.lang) {
      throw new Error(`hreflang pair is not reciprocal: ${route.path} -> ${route.alternate}`);
    }
  }
}

function assertLegacyRedirects(routes: SeoRoute[] = SEO_ROUTES): void {
  const paths = new Set(routes.map((route) => route.path));
  const sources = new Set<string>();

  for (const redirect of LEGACY_REDIRECTS) {
    if (!redirect.from.startsWith('/') || redirect.from.includes('//') || sources.has(redirect.from)) {
      throw new Error(`Invalid legacy redirect source: ${redirect.from}`);
    }
    if (paths.has(redirect.from)) {
      throw new Error(`Legacy redirect shadows an indexable URL: ${redirect.from}`);
    }
    if (!paths.has(redirect.to)) {
      throw new Error(`Legacy redirect must land on an indexable URL: ${redirect.to}`);
    }
    sources.add(redirect.from);
  }
}

assertSeoRoutes();
assertLegacyRedirects();
