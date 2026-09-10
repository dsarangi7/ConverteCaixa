/**
 * Site-wide configuration
 */

export const SITE = {
  name: 'ConverteCaixa',
  nameEN: 'Case Converter by ConverteCaixa',
  domain: 'convertecaixa.com',
  baseUrl: 'https://convertecaixa.com',
  defaultLocale: 'pt-BR',
  locales: ['pt-BR', 'en'] as const,
} as const;

export type Locale = 'pt-BR' | 'en';

export const META = {
  'pt-BR': {
    title: 'Conversor de Texto: Maiúsculas e Minúsculas Online | ConverteCaixa',
    description: 'Converta texto para maiúsculas, minúsculas, frase, título e mais. Conversor online gratuito, rápido e privado, com processamento local no navegador.',
    keywords: 'conversor de texto, converter maiúsculas e minúsculas, maiúsculas para minúsculas, conversor de caixa alta, frase e título',
  },
  en: {
    title: 'Case Converter: Uppercase, Lowercase & Sentence Case Online',
    description: 'Free online case converter for uppercase, lowercase, sentence case, title case and more. Fast, private text conversion processed locally in your browser.',
    keywords: 'case converter, text case converter, uppercase to lowercase, sentence case converter, title case converter, online case converter',
  },
} as const;

export const NAV_ITEMS = {
  'pt-BR': [
    { label: 'Início', href: '/pt/' },
    { label: 'Converter', href: '/pt/converter-maiusculas-minusculas/' },
    { label: 'Texto em Negrito', href: '/pt/gerador-de-texto-negrito/' },
    { label: 'Privacidade', href: '/pt/politica-de-privacidade/' },
    { label: 'Contato', href: '/pt/contato/' },
  ],
  en: [
    { label: 'Home', href: '/en/' },
    { label: 'Converter', href: '/en/case-converter/' },
    { label: 'Bold Text', href: '/en/bold-text-generator/' },
    { label: 'Privacy', href: '/en/privacy-policy/' },
    { label: 'Contact', href: '/en/contact/' },
  ],
} as const;

export const FOOTER_LINKS = {
  'pt-BR': {
    tools: [
      { label: 'Converter Maiúsculas e Minúsculas', href: '/pt/converter-maiusculas-minusculas/' },
      { label: 'Gerador de Texto em Negrito', href: '/pt/gerador-de-texto-negrito/' },
    ],
    legal: [
      { label: 'Sobre Nós', href: '/pt/sobre/' },
      { label: 'Privacidade', href: '/pt/politica-de-privacidade/' },
      { label: 'Termos de Uso', href: '/pt/termos-de-uso/' },
      { label: 'Cookies', href: '/pt/politica-de-cookies/' },
      { label: 'Acessibilidade', href: '/pt/declaracao-de-acessibilidade/' },
      { label: 'Contato', href: '/pt/contato/' },
    ],
  },
  en: {
    tools: [
      { label: 'Case Converter', href: '/en/case-converter/' },
      { label: 'Uppercase to Lowercase', href: '/en/uppercase-to-lowercase/' },
      { label: 'Sentence Case Converter', href: '/en/sentence-case-converter/' },
      { label: 'Title Case Converter', href: '/en/title-case-converter/' },
      { label: 'Bold Text Generator', href: '/en/bold-text-generator/' },
    ],
    legal: [
      { label: 'About', href: '/en/about/' },
      { label: 'Privacy Policy', href: '/en/privacy-policy/' },
      { label: 'Terms & Conditions', href: '/en/terms-and-conditions/' },
      { label: 'Cookie Policy', href: '/en/cookie-policy/' },
      { label: 'Accessibility', href: '/en/accessibility-statement/' },
      { label: 'Contact', href: '/en/contact/' },
    ],
  },
} as const;
