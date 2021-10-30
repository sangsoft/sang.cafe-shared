import { SUPPORTED_DISTRICTS, pL } from "../constants";

function removeSubstitutionKey(text: string): string {
  if (!text) {
    return text;
  }
  if (substitutionKey.test(text)) {
    const matches = (text || '').match(substitutionKey);
    return text.replace(matches[0], '');
  }
  else return text
}

export function matchWithPatterns(text: string, patterns: RegExp[]): string[] {
  if (!text) {
    return [];
  }
  return patterns.reduce((result, pattern) => {
    const matches = (text || '').match(pattern);
    return result.concat(matches);
  }, []).filter(_ => !!_);
}

function matchWithPatternsAndReplace(text: string, patterns: RegExp[], placeholder: string): string {
  const matches = matchWithPatterns(text, patterns);
  return (matches || []).reduce((result: string, match: string) => {
    const formattedMatch = match.trim().replace(/,$/,'');
    return result.replace(formattedMatch, placeholder);
  }, text);
}

//clean Phone Numbers
const generalPhonePattern = /\b(?:\+?([\d|o|O]{1,3}))?[-. (]*(?:[\d|o|O]{3})[-. )]*(?:[\d|o|O]{3,4})[-. ]*(?:[\d|o|O]{4})/g; //matches most phone numbers w/wo hyphen, dots, spaces, country code
const spacedPhonePattern = /\b(?:[\d|o|O]{3,4}[\s\.]*){3,11}\b/g; //check for spaced numbers
const substitutionPhonePattern = /\b(?:[\d|o|O]+(?:[\w|\*])+[\d|o|O]+[\w|\*]*){2,}\b/g; //check for tricks like 038tam88888, 038*88888, 03888888bay
const substitutionKey = /\s*(?:[\w|\*])\s*[\=]\s*\d{0,2}\b/g; //check for substitution keys like x = 3, *:4
const phonePatterns = [generalPhonePattern, substitutionPhonePattern, spacedPhonePattern];

export function cleanPhoneNumber(text: string, patterns = phonePatterns): string {
  return matchWithPatternsAndReplace(removeSubstitutionKey(text || ''), patterns, '{{phone_number}}');
}

//Clean Address
const districtNames = Object.keys(SUPPORTED_DISTRICTS).reduce((result, city) => [...result, ...SUPPORTED_DISTRICTS[city]], []).join('|') //Quan 1|Quan 2|...
const streetNamePattern = new RegExp(`(?:phố|đường)\\s(?:\\s?[A-Z][${pL}]+)+`,'g');
const streetNameWithNumberPattern = new RegExp(`(?:số|ngõ|ngách)?\\s?\\d{1,3}(?:\\/\\d{1,3})?\\s(?:phố|đường)?s?(?:(?!${districtNames}|[Qq]uận|[Hh]uyện)\\s?[A-ZĐ][${pL}]+,?\\s?)+`, 'g');


const streetPatterns = [streetNamePattern, streetNameWithNumberPattern];

export function cleanAddress(text: string, patterns = streetPatterns): string {
  return matchWithPatternsAndReplace(text, patterns, '{{address}}');
}