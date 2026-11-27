/**
 * Visible FAQ copy for the primary case-converter landings.
 * English-only mode pages are intentionally absent: they have no Portuguese twin.
 */
import type { FaqItem } from './faq-schema';

export const englishCaseConverterFaq: readonly FaqItem[] = [
  {
    question: 'How do I change case in Microsoft Excel?',
    answer: 'In Excel, use the following functions:',
    points: [
      '=UPPER(A1) — Converts to uppercase',
      '=LOWER(A1) — Converts to lowercase',
      '=PROPER(A1) — Converts to capitalized',
    ],
  },
  {
    question: 'How do I change case in Microsoft Word?',
    answer:
      'In Word, select the text and press Shift+F3 to toggle between uppercase, lowercase, and capitalized. For more options, use Format > Text > Change Case.',
  },
  {
    question: 'How do I change case in Google Sheets?',
    answer: 'In Google Sheets, use the same functions as Excel:',
    points: ['=UPPER(A1)', '=LOWER(A1)', '=PROPER(A1)'],
  },
  {
    question: 'What is the difference between sentence case and title case?',
    answer:
      'Sentence case capitalizes only the first letter of each sentence. Title case capitalizes the first letter of each significant word, keeping articles and prepositions lowercase.',
  },
  {
    question: 'How do I fix accidental Caps Lock text?',
    answer:
      'Paste your ALL CAPS text into the converter, select "lowercase" mode, and the text will be converted to lowercase. You can then use "Capitalized" or "Sentence" mode to fix the capitalization as needed.',
  },
  {
    question: 'Can I use ConverteCaixa for long texts?',
    answer:
      'Yes. ConverteCaixa is optimized for texts of any length, from a single word to entire documents. All processing is done locally, with no server-imposed size limits.',
  },
];

export const portugueseCaseConverterFaq: readonly FaqItem[] = [
  {
    question: 'Como converter maiúsculas e minúsculas no Microsoft Excel?',
    answer: 'No Excel, use as funções:',
    points: [
      '=UPPER(A1) — Converte para maiúsculas',
      '=LOWER(A1) — Converte para minúsculas',
      '=PROPER(A1) — Converte para capitalizado',
    ],
  },
  {
    question: 'Como converter maiúsculas e minúsculas no Microsoft Word?',
    answer:
      'No Word, selecione o texto e pressione Shift+F3 para alternar entre maiúsculas, minúsculas e capitalizado. Para mais opções, use Formatar > Texto > Caixa Alta/Baixa.',
  },
  {
    question: 'Como converter maiúsculas e minúsculas no Google Sheets?',
    answer: 'No Google Sheets, use as mesmas funções do Excel:',
    points: ['=UPPER(A1)', '=LOWER(A1)', '=PROPER(A1)'],
  },
  {
    question: 'Qual a diferença entre frase e título?',
    answer:
      'Frase capitaliza apenas a primeira letra de cada frase. Título capitaliza a primeira letra de cada palavra significativa, mantendo artigos e preposições em minúsculas.',
  },
  {
    question: 'Posso usar o ConverteCaixa para textos longos?',
    answer:
      'Sim. O ConverteCaixa é otimizado para textos de qualquer tamanho, desde uma palavra até documentos inteiros. Todo o processamento é feito localmente, sem limites de tamanho impostos pelo servidor.',
  },
];
