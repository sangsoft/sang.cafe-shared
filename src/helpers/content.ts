//clean Phone Numbers
const phonePattern = /\b(?:\+?([\d|o|O]{1,3}))?[-. (]*(?:[\d|o|O]{3})[-. )]*(?:[\d|o|O]{3,4})[-. ]*(?:[\d|o|O]{4})/g; //matches most phone numbers w/wo hyphen, dots, spaces, country code
const spacedPhonePattern = /\b(?:[\d|o|O]{3,4}[\s\.]*){3,11}\b/g; //check for spaced numbers
const substitutionPhonePattern = /\b(?:[\d|o|O]+(?:[\w|\*])+[\d|o|O]+[\w|\*]*){2,}\b/g; //check for tricks like 038tam88888, 038*88888, 03888888bay
const substitutionKey = /\s*(?:[\w|\*])\s*[\=]\s*\d{0,2}\b/g; //check for substitution keys like x = 3, *:4
const Patterns = [phonePattern, substitutionPhonePattern, spacedPhonePattern];

function removeSubstitutionKey(text: string): string {
  if (substitutionKey.test(text)) {
    const matches = text.match(substitutionKey);
    return text.replace(matches[0], '');
  }
  else return text
}

function matchPatternsAndReplace(text: string, patterns: RegExp[], placeholder: string): string {
  const output = patterns.reduce((result, pattern) => {
    const matches = result.match(pattern);
    return (matches || []).reduce((result, match) => {
      return result.replace(match.trim(), placeholder)
    }, result);
  }, text);
  return output;
}

export function cleanPhoneNumber(text: string, patterns = Patterns): string {
  return matchPatternsAndReplace(removeSubstitutionKey(text), patterns, '{{phone_number}}');
}

//Clean Address
const streetName = /(?:phố|đường)\s(?:\s?[A-Z]\pL+)+/g;
const streetNameWithNumber = /(?:số|ngõ|ngách)?\s?\d{1,3}(?:\/\d{1,3})?\s(?:phố|đường)?\s?(?:\s?[A-Z]\pL+)+/g;

const streetPatterns = [streetName, streetNameWithNumber];

export function cleanAddress(text: string, patterns = streetPatterns): string {
  return matchPatternsAndReplace(text, patterns, '{{address}}');
}