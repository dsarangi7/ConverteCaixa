/**
 * Text case conversion utility functions
 * Handles Portuguese diacritics, Unicode, and preserves line breaks
 */

export type CaseMode =
  | 'sentence'
  | 'lower'
  | 'upper'
  | 'capitalized'
  | 'title'
  | 'inverse'
  | 'alternating'
  | 'toggle';

export interface ConversionResult {
  text: string;
  stats: TextStats;
}

export interface TextStats {
  characters: number;
  charactersWithoutSpaces: number;
  words: number;
  sentences: number;
  lines: number;
}

/**
 * Count text statistics
 */
export function countTextStats(text: string): TextStats {
  if (!text) {
    return {
      characters: 0,
      charactersWithoutSpaces: 0,
      words: 0,
      sentences: 0,
      lines: 0,
    };
  }

  const characters = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, '').length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentences = text.trim()
    ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length
    : 0;
  const lines = text.split('\n').length;

  return {
    characters,
    charactersWithoutSpaces,
    words,
    sentences,
    lines,
  };
}

/**
 * Check if a character is a letter (supports Unicode/Portuguese)
 */
function isLetter(char: string): boolean {
  return /[a-zA-ZÀ-ÿ]/u.test(char);
}

/**
 * Check if a character is uppercase
 */
function isUpperCase(char: string): boolean {
  return char === char.toUpperCase() && isLetter(char);
}

/**
 * Sentence case: lowercase the text and capitalize each sentence start.
 */
export function toSentenceCase(text: string): string {
  if (!text) return text;

  const hasLetter = /[a-zA-ZÀ-ÿ]/u.test(text);
  const isAllUppercase = hasLetter && text === text.toUpperCase();

  if (isAllUppercase) {
    const normalizedText = text.toLowerCase();

    return normalizedText.replace(
      /(^|[.!?]\s+)([a-zA-ZÀ-ÿ])/g,
      (_, prefix: string, letter: string) => `${prefix}${letter.toUpperCase()}`,
    );
  }

  const sentences = text.split(/([.!?]+\s*)/);
  let result = '';
  let capitalizeNext = true;

  for (const part of sentences) {
    if (capitalizeNext) {
      result += part.replace(/([a-zA-ZÀ-ÿ])/, (match) => {
        capitalizeNext = false;
        return match.toUpperCase();
      });
    } else {
      result += part;
    }

    capitalizeNext = part.includes('.') || part.includes('!') || part.includes('?');
  }

  return result;
}

/**
 * Lowercase conversion
 */
export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

/**
 * Uppercase conversion
 */
export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

/**
 * Capitalized case: capitalize first letter of each word
 */
export function toCapitalizedCase(text: string): string {
  if (!text) return text;

  return text.replace(/\b\w/g, char => char.toUpperCase());
}

/**
 * Title case: capitalize first letter of each word, with exceptions
 */
export function toTitleCase(text: string): string {
  if (!text) return text;

  const minorWords = new Set([
    'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor',
    'on', 'at', 'to', 'from', 'by', 'in', 'of', 'with',
    'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might',
    'shall', 'can', 'need', 'dare', 'ought', 'used',
    // Portuguese
    'a', 'as', 'o', 'os', 'um', 'uma', 'uns', 'umas',
    'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na',
    'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob',
    'e', 'ou', 'mas', 'que', 'se', 'não', 'mais',
    'é', 'são', 'está', 'estão', 'foi', 'foram',
  ]);

  const words = text.split(/\s+/);

  return words.map((word, index) => {
    if (index === 0 || !minorWords.has(word.toLowerCase())) {
      return word.replace(/\b\w/g, char => char.toUpperCase());
    }
    return word.toLowerCase();
  }).join(' ');
}

/**
 * Inverse case: swap uppercase and lowercase
 */
export function toInverseCase(text: string): string {
  if (!text) return text;

  return text.split('').map(char => {
    if (isUpperCase(char)) {
      return char.toLowerCase();
    }
    return char.toUpperCase();
  }).join('');
}

/**
 * Alternating case: alternate between uppercase and lowercase
 */
export function toAlternatingCase(text: string): string {
  if (!text) return text;

  let uppercase = true;
  return text.split('').map(char => {
    if (!isLetter(char)) return char;
    const result = uppercase ? char.toUpperCase() : char.toLowerCase();
    uppercase = !uppercase;
    return result;
  }).join('');
}

/**
 * Toggle case: swap case for each letter
 */
export function toToggleCase(text: string): string {
  if (!text) return text;

  return text.split('').map(char => {
    if (isUpperCase(char)) {
      return char.toLowerCase();
    }
    return char.toUpperCase();
  }).join('');
}

/**
 * Convert text to the specified case mode
 */
export function convertCase(text: string, mode: CaseMode): string {
  if (!text) return text;

  switch (mode) {
    case 'sentence':
      return toSentenceCase(text);
    case 'lower':
      return toLowerCase(text);
    case 'upper':
      return toUpperCase(text);
    case 'capitalized':
      return toCapitalizedCase(text);
    case 'title':
      return toTitleCase(text);
    case 'inverse':
      return toInverseCase(text);
    case 'alternating':
      return toAlternatingCase(text);
    case 'toggle':
      return toToggleCase(text);
    default:
      return text;
  }
}

/**
 * Get the display name for a case mode
 */
export function getCaseModeName(mode: CaseMode, lang: 'pt' | 'en'): string {
  const names: Record<CaseMode, { pt: string; en: string }> = {
    sentence: { pt: 'Frase', en: 'Sentence' },
    lower: { pt: 'Minúsculas', en: 'lowercase' },
    upper: { pt: 'MAIÚSCULAS', en: 'UPPERCASE' },
    capitalized: { pt: 'Capitalizado', en: 'Capitalized' },
    title: { pt: 'Título', en: 'Title Case' },
    inverse: { pt: 'Inverso', en: 'Inverse' },
    alternating: { pt: 'Alternado', en: 'aLtErNaTiNg' },
    toggle: { pt: 'Alternar', en: 'tOGGLE' },
  };

  return names[mode][lang];
}

/**
 * History manager for undo/redo
 */
export class ConversionHistory {
  private history: string[] = [];
  private currentIndex: number = -1;
  private maxSize: number;

  constructor(maxSize: number = 50) {
    this.maxSize = maxSize;
  }

  push(state: string): void {
    // Remove any future states if we're in the middle of history
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    // Add new state
    this.history.push(state);

    // Limit history size
    if (this.history.length > this.maxSize) {
      this.history.shift();
    } else {
      this.currentIndex++;
    }
  }

  undo(): string | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo(): string | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }
}
