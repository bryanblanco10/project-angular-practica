export const normalizeText = (text: string): string => {
  return text.normalize('NFD').replace(/[\u0300-\u036f\s]/g, '').toLowerCase();
}

export const isStringAndNotEmpty = (val: string | null | undefined): boolean => typeof val === 'string' && val !== '';
