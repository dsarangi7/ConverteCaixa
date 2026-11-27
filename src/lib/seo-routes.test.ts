import { describe, expect, it } from 'vitest';
import { englishCaseConverterFaq, portugueseCaseConverterFaq } from './case-converter-faq';
import { FOOTER_LINKS, NAV_ITEMS, SITE } from './config';
import { faqAnswerText, faqPageJsonLd, faqPointParts } from './faq-schema';
import redirectsFile from '../../public/_redirects?raw';
import sitemapFile from '../../public/sitemap.xml?raw';
import {
  DEFAULT_LOCALE_PATH,
  SEO_ROUTES,
  absoluteUrl,
  hreflangLinks,
  LEGACY_REDIRECTS,
  renderRedirects,
  renderSitemap,
} from './seo-routes';

const pageSources = import.meta.glob<string>('../pages/**/*.astro', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const layoutSources = import.meta.glob<string>('../layouts/BaseLayout.astro', {
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

    expect(rules.length).toBe(SEO_ROUTES.length + 2 + LEGACY_REDIRECTS.length);
    const legacySources = new Set(LEGACY_REDIRECTS.map((rule) => rule.from));
    for (const [source, destination, code] of rules) {
      expect(code).toBe('301');
      expect(destination.endsWith('/')).toBe(true);
      expect(SEO_ROUTES.some((route) => route.path === destination)).toBe(true);
      if (source !== '/' && source !== '/index.html' && !legacySources.has(source)) {
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

  it('redirects the retired English font-text-generator URL to the bold text generator', () => {
    const redirects = renderRedirects();
    expect(redirects).toContain('/en/font-text-generator /en/bold-text-generator/ 301');
    expect(redirects).toContain('/en/font-text-generator/ /en/bold-text-generator/ 301');
    expect(renderSitemap()).not.toContain('font-text-generator');
    expect(SEO_ROUTES.some((route) => route.path.includes('font-text-generator'))).toBe(false);

    const linked = [
      ...NAV_ITEMS['pt-BR'].map((item) => item.href),
      ...NAV_ITEMS.en.map((item) => item.href),
      ...FOOTER_LINKS['pt-BR'].tools.map((item) => item.href),
      ...FOOTER_LINKS['pt-BR'].legal.map((item) => item.href),
      ...FOOTER_LINKS.en.tools.map((item) => item.href),
      ...FOOTER_LINKS.en.legal.map((item) => item.href),
    ];
    for (const href of linked) {
      expect(href).not.toContain('font-text-generator');
    }
    for (const [file, source] of Object.entries(pageSources)) {
      expect(source, file).not.toContain('font-text-generator');
    }
  });

  it('sends contact FAQ links to a homepage section', () => {
    expect(pageSources['../pages/en/index.astro']).toContain('id="faq"');
    expect(pageSources['../pages/pt/index.astro']).toContain('id="faq"');
    expect(pageSources['../pages/en/contact.astro']).toContain('href="/en/#faq"');
    expect(pageSources['../pages/pt/contato.astro']).toContain('href="/pt/#faq"');
  });
});

describe('FAQPage schema on the primary converter landings', () => {
  const englishOnlyModePaths = [
    '/en/uppercase-to-lowercase/',
    '/en/sentence-case-converter/',
    '/en/title-case-converter/',
  ];

  it('builds FAQPage JSON-LD from the visible converter questions', () => {
    for (const items of [englishCaseConverterFaq, portugueseCaseConverterFaq]) {
      const schema = faqPageJsonLd(items);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toHaveLength(items.length);
      expect(new Set(items.map((item) => item.question)).size).toBe(items.length);

      schema.mainEntity.forEach((entity, index) => {
        const item = items[index];
        expect(entity['@type']).toBe('Question');
        expect(entity.name).toBe(item.question);
        expect(entity.name.trim().length).toBeGreaterThan(0);
        expect(entity.acceptedAnswer).toEqual({
          '@type': 'Answer',
          text: faqAnswerText(item),
        });
        expect(entity.acceptedAnswer.text).toContain(item.answer);
        for (const point of item.points ?? []) {
          const { formula, detail } = faqPointParts(point);
          expect(entity.acceptedAnswer.text).toContain(point);
          expect(formula.length).toBeGreaterThan(0);
          expect(detail ? `${formula} — ${detail}` : formula).toBe(point);
        }
      });
    }
  });

  it('keeps the long-text answers on client-side conversion', () => {
    const english = englishCaseConverterFaq.find((item) => item.question === 'Can I use ConverteCaixa for long texts?');
    const portuguese = portugueseCaseConverterFaq.find(
      (item) => item.question === 'Posso usar o ConverteCaixa para textos longos?',
    );
    expect(english?.answer).toContain('All processing is done locally');
    expect(english?.answer).toContain('no server-imposed size limits');
    expect(portuguese?.answer).toContain('Todo o processamento é feito localmente');
    expect(portuguese?.answer).toContain('sem limites de tamanho impostos pelo servidor');
  });

  it('renders that FAQ on the flagship pages and emits it from the layout', () => {
    const englishPage = pageSources['../pages/en/case-converter.astro'];
    const portuguesePage = pageSources['../pages/pt/converter-maiusculas-minusculas.astro'];
    const layout = layoutSources['../layouts/BaseLayout.astro'];

    expect(englishPage).toContain('faqItems={englishCaseConverterFaq}');
    expect(englishPage).toContain('englishCaseConverterFaq.map');
    expect(portuguesePage).toContain('faqItems={portugueseCaseConverterFaq}');
    expect(portuguesePage).toContain('portugueseCaseConverterFaq.map');
    expect(layout).toContain('faqPageJsonLd(faqItems)');
    expect(layout).toContain('application/ld+json');
  });

  it('does not add Portuguese twins for the English-only mode pages', () => {
    for (const path of englishOnlyModePaths) {
      expect(SEO_ROUTES.find((route) => route.path === path)?.alternate).toBeUndefined();
    }
    expect(pageSources['../pages/pt/uppercase-to-lowercase.astro']).toBeUndefined();
    expect(pageSources['../pages/pt/sentence-case-converter.astro']).toBeUndefined();
    expect(pageSources['../pages/pt/title-case-converter.astro']).toBeUndefined();
  });
});
