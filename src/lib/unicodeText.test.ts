import { describe, expect, it } from 'vitest';
import { convertToUnicodeStyle } from './unicodeText';

describe('Unicode text styles', () => {
  it('maps uppercase, lowercase, and digits for bold serif', () => {
    expect(convertToUnicodeStyle('Az09', 'boldSerif')).toBe('𝐀𝐳𝟎𝟗');
  });

  it('preserves punctuation, spaces, and line breaks', () => {
    expect(convertToUnicodeStyle('Hello, 42!\nNext.', 'boldSans')).toBe('𝗛𝗲𝗹𝗹𝗼, 𝟰𝟮!\n𝗡𝗲𝘅𝘁.');
  });

  it('preserves accented Portuguese characters and unsupported symbols', () => {
    expect(convertToUnicodeStyle('Olá, ação € 😀', 'italicSerif')).toBe('𝑂𝑙á, 𝑎çã𝑜 € 😀');
  });

  it('uses the assigned Unicode character for italic serif h', () => {
    expect(convertToUnicodeStyle('what is my name', 'italicSerif')).toBe('𝑤ℎ𝑎𝑡 𝑖𝑠 𝑚𝑦 𝑛𝑎𝑚𝑒');
  });

  it('uses the available script mappings and preserves unsupported script letters', () => {
    expect(convertToUnicodeStyle('ABC xyz', 'script')).toBe('𝒜ℬ𝒞 𝓍𝓎𝓏');
  });

  it('returns empty input unchanged', () => {
    expect(convertToUnicodeStyle('', 'monospace')).toBe('');
  });

  it('leaves digits unchanged for styles without digit variants', () => {
    expect(convertToUnicodeStyle('2026', 'italicSerif')).toBe('2026');
  });
});