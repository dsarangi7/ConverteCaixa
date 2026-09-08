import { describe, it, expect } from 'vitest';
import {
  convertCase,
  toSentenceCase,
  toLowerCase,
  toUpperCase,
  toCapitalizedCase,
  toTitleCase,
  toInverseCase,
  toAlternatingCase,
  toToggleCase,
  countTextStats,
  ConversionHistory,
} from './converter';

describe('Text Case Conversion', () => {
  describe('toSentenceCase', () => {
    it('capitalizes first letter of sentence', () => {
      expect(toSentenceCase('hello world')).toBe('Hello world');
    });

    it('handles multiple sentences', () => {
      expect(toSentenceCase('hello world. how are you? i am fine!')).toBe('Hello world. How are you? I am fine!');
    });

    it('handles empty string', () => {
      expect(toSentenceCase('')).toBe('');
    });

    it('preserves existing capitalization in middle of sentences', () => {
      expect(toSentenceCase('the NASA rocket launched. it was amazing.')).toBe('The NASA rocket launched. It was amazing.');
    });

    it('handles Portuguese text', () => {
      expect(toSentenceCase('olá mundo. como vai?')).toBe('Olá mundo. Como vai?');
    });

    it('normalizes all-caps multiline text', () => {
      expect(toSentenceCase('HOLLAND SHIPYARD FPS\nRETROFIT BATTERY SYSTEM\nDESIGN'))
        .toBe('Holland shipyard fps\nretrofit battery system\ndesign');
    });

    it('normalizes all-caps text while preserving sentence starts', () => {
      expect(toSentenceCase('HELLO WORLD. HOW ARE YOU? I AM FINE!'))
        .toBe('Hello world. How are you? I am fine!');
    });
  });

  describe('toLowerCase', () => {
    it('converts to lowercase', () => {
      expect(toLowerCase('HELLO WORLD')).toBe('hello world');
    });

    it('handles mixed case', () => {
      expect(toLowerCase('HeLLo WoRLd')).toBe('hello world');
    });

    it('preserves accented characters', () => {
      expect(toLowerCase('OLA MUNDO')).toBe('ola mundo');
      expect(toLowerCase('ÇÃÃE')).toBe('çããe');
    });

    it('handles empty string', () => {
      expect(toLowerCase('')).toBe('');
    });
  });

  describe('toUpperCase', () => {
    it('converts to uppercase', () => {
      expect(toUpperCase('hello world')).toBe('HELLO WORLD');
    });

    it('handles mixed case', () => {
      expect(toUpperCase('HeLLo WoRLd')).toBe('HELLO WORLD');
    });

    it('preserves accented characters', () => {
      expect(toUpperCase('olá mundo')).toBe('OLÁ MUNDO');
      expect(toUpperCase('çaão')).toBe('ÇAÃO');
    });

    it('handles empty string', () => {
      expect(toUpperCase('')).toBe('');
    });
  });

  describe('toCapitalizedCase', () => {
    it('capitalizes first letter of each word', () => {
      expect(toCapitalizedCase('hello world')).toBe('Hello World');
    });

    it('handles multiple words', () => {
      expect(toCapitalizedCase('the quick brown fox')).toBe('The Quick Brown Fox');
    });

    it('handles empty string', () => {
      expect(toCapitalizedCase('')).toBe('');
    });

    it('handles Portuguese text', () => {
      expect(toCapitalizedCase('olá mundo cruel')).toBe('Olá Mundo Cruel');
    });
  });

  describe('toTitleCase', () => {
    it('capitalizes significant words', () => {
      expect(toTitleCase('the art of war')).toBe('The Art of War');
    });

    it('lowercases minor words', () => {
      expect(toTitleCase('a tale of two cities')).toBe('A Tale of Two Cities');
    });

    it('handles Portuguese minor words', () => {
      expect(toTitleCase('a arte da guerra')).toBe('A Arte da Guerra');
    });

    it('capitalizes first word always', () => {
      expect(toTitleCase('the answer is 42')).toBe('The Answer is 42');
    });

    it('handles empty string', () => {
      expect(toTitleCase('')).toBe('');
    });
  });

  describe('toInverseCase', () => {
    it('inverts case', () => {
      expect(toInverseCase('Hello World')).toBe('hELLO wORLD');
    });

    it('handles all uppercase', () => {
      expect(toInverseCase('HELLO')).toBe('hello');
    });

    it('handles all lowercase', () => {
      expect(toInverseCase('hello')).toBe('HELLO');
    });

    it('preserves non-letter characters', () => {
      expect(toInverseCase('Hello, World! 123')).toBe('hELLO, wORLD! 123');
    });

    it('handles empty string', () => {
      expect(toInverseCase('')).toBe('');
    });
  });

  describe('toAlternatingCase', () => {
    it('alternates case', () => {
      expect(toAlternatingCase('hello')).toBe('HeLlO');
    });

    it('handles even length', () => {
      expect(toAlternatingCase('hell')).toBe('HeLl');
    });

    it('handles odd length', () => {
      expect(toAlternatingCase('hello')).toBe('HeLlO');
    });

    it('preserves non-letter characters', () => {
      expect(toAlternatingCase('hello world')).toBe('HeLlO wOrLd');
    });

    it('handles empty string', () => {
      expect(toAlternatingCase('')).toBe('');
    });
  });

  describe('toToggleCase', () => {
    it('toggles case', () => {
      expect(toToggleCase('Hello')).toBe('hELLO');
    });

    it('handles all uppercase', () => {
      expect(toToggleCase('HELLO')).toBe('hello');
    });

    it('handles all lowercase', () => {
      expect(toToggleCase('hello')).toBe('HELLO');
    });

    it('preserves non-letter characters', () => {
      expect(toToggleCase('Hello, World!')).toBe('hELLO, wORLD!');
    });

    it('handles empty string', () => {
      expect(toToggleCase('')).toBe('');
    });
  });

  describe('convertCase', () => {
    it('delegates to correct function', () => {
      expect(convertCase('hello', 'lower')).toBe('hello');
      expect(convertCase('HELLO', 'upper')).toBe('HELLO');
      expect(convertCase('hello world', 'sentence')).toBe('Hello world');
      expect(convertCase('hello world', 'capitalized')).toBe('Hello World');
      expect(convertCase('the art of war', 'title')).toBe('The Art of War');
      expect(convertCase('Hello', 'inverse')).toBe('hELLO');
      expect(convertCase('hello', 'alternating')).toBe('HeLlO');
      expect(convertCase('Hello', 'toggle')).toBe('hELLO');
    });

    it('handles empty string for all modes', () => {
      const modes = ['sentence', 'lower', 'upper', 'capitalized', 'title', 'inverse', 'alternating', 'toggle'] as const;
      modes.forEach(mode => {
        expect(convertCase('', mode)).toBe('');
      });
    });
  });
});

describe('Portuguese Diacritics', () => {
  it('preserves accents in sentence case', () => {
    expect(toSentenceCase('olá mundo')).toBe('Olá mundo');
  });

  it('preserves cedilla', () => {
    expect(toUpperCase('laço')).toBe('LAÇO');
    expect(toLowerCase('LAÇO')).toBe('laço');
  });

  it('preserves tilde', () => {
    expect(toUpperCase('ã')).toBe('Ã');
    expect(toLowerCase('Ã')).toBe('ã');
  });

  it('handles mixed Portuguese text', () => {
    const input = 'O São Paulo é uma cidade grande.';
    const result = toSentenceCase(input);
    expect(result).toBe('O São Paulo é uma cidade grande.');
  });

  it('handles Brazilian Portuguese idiom', () => {
    expect(toTitleCase('a arte da guerra')).toBe('A Arte da Guerra');
  });
});

describe('Unicode Support', () => {
  it('handles emoji', () => {
    expect(toUpperCase('hello 🌍')).toBe('HELLO 🌍');
  });

  it('handles Chinese characters', () => {
    expect(toUpperCase('你好世界')).toBe('你好世界');
  });

  it('handles Japanese characters', () => {
    expect(toUpperCase('こんにちは')).toBe('こんにちは');
  });

  it('handles Cyrillic', () => {
    expect(toUpperCase('привет')).toBe('ПРИВЕТ');
  });
});

describe('Edge Cases', () => {
  it('handles URLs', () => {
    const url = 'https://example.com/path';
    expect(toLowerCase(url)).toBe('https://example.com/path');
    expect(toUpperCase(url)).toBe('HTTPS://EXAMPLE.COM/PATH');
  });

  it('handles email addresses', () => {
    const email = 'user@example.com';
    expect(toLowerCase(email)).toBe('user@example.com');
    expect(toUpperCase(email)).toBe('USER@EXAMPLE.COM');
  });

  it('handles quotation marks', () => {
    expect(toSentenceCase('"hello world"')).toBe('"Hello world"');
    expect(toSentenceCase("'hello world'")).toBe("'Hello world'");
  });

  it('handles line breaks', () => {
    const input = 'line one\nline two\nline three';
    const result = toUpperCase(input);
    expect(result).toContain('\n');
    expect(result).toBe('LINE ONE\nLINE TWO\nLINE THREE');
  });

  it('handles multiple paragraphs', () => {
    const input = 'paragraph one.\n\nparagraph two.';
    const result = toSentenceCase(input);
    expect(result).toBe('Paragraph one.\n\nParagraph two.');
  });

  it('handles very long input', () => {
    const longText = 'a'.repeat(100000);
    const result = toUpperCase(longText);
    expect(result.length).toBe(100000);
    expect(result).toBe('A'.repeat(100000));
  });

  it('handles acronyms', () => {
    expect(toSentenceCase('the NASA mission was a success')).toBe('The NASA mission was a success');
  });

  it('handles empty input safely', () => {
    expect(convertCase('', 'sentence')).toBe('');
    expect(convertCase(null as any, 'sentence')).toBe(null);
    expect(convertCase(undefined as any, 'sentence')).toBe(undefined);
  });

  it('handles numbers', () => {
    expect(toUpperCase('hello 123 world')).toBe('HELLO 123 WORLD');
  });

  it('handles special characters', () => {
    expect(toUpperCase('hello! @#$%^&*()')).toBe('HELLO! @#$%^&*()');
  });
});

describe('Text Stats', () => {
  it('counts characters', () => {
    const stats = countTextStats('hello');
    expect(stats.characters).toBe(5);
    expect(stats.charactersWithoutSpaces).toBe(5);
  });

  it('counts characters without spaces', () => {
    const stats = countTextStats('hello world');
    expect(stats.characters).toBe(11);
    expect(stats.charactersWithoutSpaces).toBe(10);
  });

  it('counts words', () => {
    const stats = countTextStats('hello world');
    expect(stats.words).toBe(2);
  });

  it('counts sentences', () => {
    const stats = countTextStats('hello. world! how?');
    expect(stats.sentences).toBe(3);
  });

  it('counts lines', () => {
    const stats = countTextStats('line1\nline2\nline3');
    expect(stats.lines).toBe(3);
  });

  it('handles empty text', () => {
    const stats = countTextStats('');
    expect(stats.characters).toBe(0);
    expect(stats.charactersWithoutSpaces).toBe(0);
    expect(stats.words).toBe(0);
    expect(stats.sentences).toBe(0);
    expect(stats.lines).toBe(0);
  });

  it('handles single word', () => {
    const stats = countTextStats('hello');
    expect(stats.words).toBe(1);
    expect(stats.sentences).toBe(1);
  });
});

describe('Conversion History', () => {
  it('tracks history', () => {
    const history = new ConversionHistory();
    history.push('hello');
    history.push('world');
    expect(history.canUndo()).toBe(true);
    expect(history.canRedo()).toBe(false);
  });

  it('undoes changes', () => {
    const history = new ConversionHistory();
    history.push('hello');
    history.push('world');
    const state = history.undo();
    expect(state).toBe('hello');
  });

  it('redoes changes', () => {
    const history = new ConversionHistory();
    history.push('hello');
    history.push('world');
    history.undo();
    const state = history.redo();
    expect(state).toBe('world');
  });

  it('clears history', () => {
    const history = new ConversionHistory();
    history.push('hello');
    history.push('world');
    history.clear();
    expect(history.canUndo()).toBe(false);
    expect(history.canRedo()).toBe(false);
  });

  it('respects max size', () => {
    const history = new ConversionHistory(3);
    history.push('a');
    history.push('b');
    history.push('c');
    history.push('d');
    expect(history.canUndo()).toBe(true);
  });
});
