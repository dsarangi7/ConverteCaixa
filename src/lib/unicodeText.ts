export type UnicodeTextStyle =
  | 'boldSerif'
  | 'italicSerif'
  | 'boldItalicSerif'
  | 'boldSans'
  | 'italicSans'
  | 'boldItalicSans'
  | 'monospace'
  | 'script';

type StyleMapping = {
  uppercase?: number;
  lowercase?: number;
  digits?: number;
  uppercaseMap?: Record<string, string>;
  lowercaseMap?: Record<string, string>;
};

const styles: Record<UnicodeTextStyle, StyleMapping> = {
  boldSerif: { uppercase: 0x1d400, lowercase: 0x1d41a, digits: 0x1d7ce },
  italicSerif: {
    uppercase: 0x1d434,
    lowercase: 0x1d44e,
    lowercaseMap: { h: 'ℎ' },
  },
  boldItalicSerif: { uppercase: 0x1d468, lowercase: 0x1d482 },
  boldSans: { uppercase: 0x1d5d4, lowercase: 0x1d5ee, digits: 0x1d7ec },
  italicSans: { uppercase: 0x1d608, lowercase: 0x1d622 },
  boldItalicSans: { uppercase: 0x1d63c, lowercase: 0x1d656 },
  monospace: { uppercase: 0x1d670, lowercase: 0x1d68a, digits: 0x1d7f6 },
  script: {
    uppercaseMap: {
      A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ',
      J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬',
      R: 'ℛ', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵',
    },
    lowercaseMap: {
      a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: 'ℯ', f: '𝒻', g: 'ℊ', h: '𝒽', i: '𝒾',
      j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: 'ℴ', p: '𝓅', q: '𝓆', r: '𝓇',
      s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏',
    },
  },
};

function mapCharacter(character: string, mapping: StyleMapping): string {
  const codePoint = character.codePointAt(0);

  const explicitMapping = mapping.uppercaseMap?.[character] ?? mapping.lowercaseMap?.[character];
  if (explicitMapping) return explicitMapping;

  if (mapping.uppercase && codePoint && codePoint >= 65 && codePoint <= 90) {
    return String.fromCodePoint(mapping.uppercase + codePoint - 65);
  }

  if (mapping.lowercase && codePoint && codePoint >= 97 && codePoint <= 122) {
    return String.fromCodePoint(mapping.lowercase + codePoint - 97);
  }

  if (mapping.digits && codePoint && codePoint >= 48 && codePoint <= 57) {
    return String.fromCodePoint(mapping.digits + codePoint - 48);
  }

  return character;
}

export function convertToUnicodeStyle(text: string, style: UnicodeTextStyle): string {
  const mapping = styles[style];
  return Array.from(text, character => mapCharacter(character, mapping)).join('');
}

export const UNICODE_TEXT_STYLES = [
  'boldSerif',
  'italicSerif',
  'boldItalicSerif',
  'boldSans',
  'italicSans',
  'boldItalicSans',
  'monospace',
  'script',
] as const satisfies readonly UnicodeTextStyle[];