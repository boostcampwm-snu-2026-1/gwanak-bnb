const INITIAL_CONSONANTS = [
  'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'
];

const MEDIAL_VOWELS = [
  'ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'
];

const FINAL_CONSONANTS = [
  '', 'ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'
];

function isHangulSyllable(char) {
  const code = char.charCodeAt(0);
  return code >= 0xac00 && code <= 0xd7a3;
}

function decomposeHangul(char) {
  const code = char.charCodeAt(0) - 0xac00;
  const cho = Math.floor(code / 588);
  const jung = Math.floor((code % 588) / 28);
  const jong = code % 28;

  const result = [INITIAL_CONSONANTS[cho], MEDIAL_VOWELS[jung]];
  if (jong > 0) result.push(FINAL_CONSONANTS[jong]);
  return result;
}

function textToJamoString(text) {
  return Array.from(text)
    .map((char) => {
      if (isHangulSyllable(char)) {
        return decomposeHangul(char).join('');
      }
      return char;
    })
    .join('');
}

function getInitialConsonants(text) {
  return Array.from(text)
    .map((char) => {
      if (isHangulSyllable(char)) {
        const code = char.charCodeAt(0) - 0xac00;
        return INITIAL_CONSONANTS[Math.floor(code / 588)];
      }
      return char;
    })
    .join('');
}

export function matchesKoreanSearch(query, text) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  const normalizedText = text.toLowerCase();
  if (normalizedText.includes(normalizedQuery)) return true;

  const jamoQuery = textToJamoString(normalizedQuery);
  const jamoText = textToJamoString(normalizedText);
  if (jamoText.includes(jamoQuery)) return true;

  const initialQuery = getInitialConsonants(normalizedQuery);
  const initialText = getInitialConsonants(normalizedText);
  if (initialText.includes(initialQuery)) return true;

  return false;
}
