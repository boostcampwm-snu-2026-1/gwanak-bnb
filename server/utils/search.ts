import { disassemble } from "es-hangul";

const normalizeText = (value: string) => value.trim().toLowerCase();
const disassembleText = (value: string) => disassemble(normalizeText(value));

export const searchIncludes = (source: string, query: string) => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return true;
  }

  const normalizedSource = normalizeText(source);

  return (
    normalizedSource.includes(normalizedQuery) ||
    disassembleText(source).includes(disassembleText(query))
  );
};
