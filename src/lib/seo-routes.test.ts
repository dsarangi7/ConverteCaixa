import { describe, expect, it } from 'vitest';
import { FOOTER_LINKS, NAV_ITEMS, SITE } from './config';
import redirectsFile from '../../public/_redirects?raw';
import sitemapFile from '../../public/sitemap.xml?raw';
import {
  DEFAULT_LOCALE_PATH,
  SEO_ROUTES,
  absoluteUrl,
  hreflangLinks,
  renderRedirects,
  renderSitemap,
} from './seo-routes';

const pageSources = import.meta.glob<string>('../pages/**/*.astro', {
  query: '?raw',
  import: 'default',
  eager: true,
});

describe('indexable routes', () => {
  it('uses trailing-slash paths and omits the bare root', () => {
    expect(SEO_ROUTES.map((route) => route.path)).not.toContain('/');
    expect(SEO_ROUTES.map((route) => route.path)).not.toContain(SITE.baseUrl);
    for (const route of SEO_ROUTES) {
      expect(route.path.startsWith('/')).toBe(true);
      expect(route.path.endsWith('/')).toBe(true);
      expect(absoluteUrl(route.path)).toBe(`${SITE.baseUrl}${route.path}`);
    }
  });

  it('points x-default at the Portuguese URL when a translation exists', () => {
    for (const route of SEO_ROUTES) {
      const links = hreflangLinks(route);
      const xDefault = links.find((link) => link.hreflang === 'x-default');
      expect(xDefault?.href.endsWith('/')).toBe(true);
      expect(xDefault?.href).not.toBe(`${SITE.baseUrl}/`);

      if (route.alternate) {
        const alternate = SEO_ROUTES.find((candidate) => candidate.path === route.alternate);
        expect(alternate).toBeDefined();
        const portuguese = route.lang === 'pt-BR' ? route.path : route.alternate;
        expect(xDefault?.href).toBe(absoluteUrl(portuguese));
        expect(hreflangLinks(alternate!).map((link) => `${link.hreflang} ${link.href}`)).toEqual(
          links.map((link) => `${link.hreflang} ${link.href}`),
        );
      } else {
        expect(links.map((link) => link.hreflang)).toEqual([route.lang, 'x-default']);
        expect(xDefault?.href).toBe(absoluteUrl(route.path));
      }
    }
  });

  it('lists only those routes in the sitemap', () => {
    const xml = renderSitemap();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(locs).toEqual(SEO_ROUTES.map((route) => absoluteUrl(route.path)));
    expect(locs).not.toContain(`${SITE.baseUrl}/`);
    expect(xml).not.toContain(`${SITE.baseUrl}</loc>`);
    expect(xml).toContain('hreflang="pt-BR"');
    expect(xml).toContain('hreflang="x-default"');
    expect(sitemapFile).toBe(xml);
  });

  it('permanently redirects the root and every slashless path to the canonical', () => {
    const redirects = renderRedirects();
    expect(redirects).toContain(`/ ${DEFAULT_LOCALE_PATH} 301`);
    expect(redirects).toContain(`/index.html ${DEFAULT_LOCALE_PATH} 301`);

    const rules = redirects
      .split('\n')
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => line.split(' '));

    expect(rules.length).toBe(SEO_ROUTES.length + 2);
    for (const [source, destination, code] of rules) {
      expect(code).toBe('301');
      expect(destination.endsWith('/')).toBe(true);
      expect(SEO_ROUTES.some((route) => route.path === destination)).toBe(true);
      if (source !== '/' && source !== '/index.html') {
        expect(source.endsWith('/')).toBe(false);
      }
    }

    const destinations = new Set(rules.map(([, destination]) => destination));
    for (const [source] of rules) {
      expect(destinations.has(source)).toBe(false);
    }

    expect(redirectsFile).toBe(redirects);
  });

  it('keeps navigation, footer, and page canonicals on the same paths', () => {
    const linked = [
      ...NAV_ITEMS['pt-BR'].map((item) => item.href),
      ...NAV_ITEMS.en.map((item) => item.href),
      ...FOOTER_LINKS['pt-BR'].tools.map((item) => item.href),
      ...FOOTER_LINKS['pt-BR'].legal.map((item) => item.href),
      ...FOOTER_LINKS.en.tools.map((item) => item.href),
      ...FOOTER_LINKS.en.legal.map((item) => item.href),
    ];
    for (const href of linked) {
      expect(SEO_ROUTES.some((route) => route.path === href)).toBe(true);
    }

    const canonicals: string[] = [];
    for (const [file, source] of Object.entries(pageSources)) {
      const matches = [...source.matchAll(/const canonical = `\$\{SITE\.baseUrl\}([^`]+)`;/g)];
      if (file.endsWith('/404.astro')) {
        expect(source).toContain('noindex={true}');
        expect(matches).toHaveLength(0);
        continue;
      }
      expect(matches, file).toHaveLength(1);
      canonicals.push(matches[0][1]);
    }

    expect(canonicals.sort()).toEqual(SEO_ROUTES.map((route) => route.path).sort());
  });

  it('gives the HTML sitemap an inbound link from both footers', () => {
    expect(FOOTER_LINKS.en.legal.some((link) => link.href === '/sitemap/')).toBe(true);
    expect(FOOTER_LINKS['pt-BR'].legal.some((link) => link.href === '/sitemap/')).toBe(true);
  });

  it('keeps indexable meta descriptions in the snippet range', () => {
    for (const [file, source] of Object.entries(pageSources)) {
      if (file.endsWith('/404.astro')) continue;
      const match = source.match(/const description = '([^']*)'/);
      expect(match, file).not.toBeNull();
      const length = match?.[1].length ?? 0;
      expect(length, `${file} is ${length} characters`).toBeGreaterThanOrEqual(100);
      expect(length, `${file} is ${length} characters`).toBeLessThanOrEqual(160);
    }
  });

  it('opts mailto links out of email obfuscation that 404s for crawlers', () => {
    for (const [file, source] of Object.entries(pageSources)) {
      for (const match of source.matchAll(/<a href="mailto:[^"]+">[^<]+<\/a>/g)) {
        const start = match.index ?? 0;
        const around = source.slice(Math.max(0, start - 24), start + match[0].length + 24);
        expect(around, file).toContain('<!--email_off-->');
        expect(around, file).toContain('<!--/email_off-->');
      }
    }
  });

  it('sends contact FAQ links to a homepage section', () => {
    expect(pageSources['../pages/en/index.astro']).toContain('id="faq"');
    expect(pageSources['../pages/pt/index.astro']).toContain('id="faq"');
    expect(pageSources['../pages/en/contact.astro']).toContain('href="/en/#faq"');
    expect(pageSources['../pages/pt/contato.astro']).toContain('href="/pt/#faq"');
  });
});
