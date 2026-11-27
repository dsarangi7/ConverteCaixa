/**
 * FAQPage JSON-LD shared by pages that show a real FAQ.
 * The answer text is the same copy visitors can read on the page.
 */

const POINT_SEPARATOR = ' — ';

export interface FaqItem {
  question: string;
  answer: string;
  points?: readonly string[];
}

export function faqPointParts(point: string): { formula: string; detail: string } {
  const splitAt = point.indexOf(POINT_SEPARATOR);
  if (splitAt === -1) return { formula: point, detail: '' };
  return {
    formula: point.slice(0, splitAt),
    detail: point.slice(splitAt + POINT_SEPARATOR.length),
  };
}

export function faqAnswerText(item: FaqItem): string {
  const points = item.points?.map((point) => point.trim()).filter((point) => point.length > 0) ?? [];
  if (points.length === 0) return item.answer;
  return `${item.answer} ${points.join(' ')}`;
}

export function faqPageJsonLd(items: readonly FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswerText(item),
      },
    })),
  };
}
