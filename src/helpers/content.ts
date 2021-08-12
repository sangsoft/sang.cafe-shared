const pattern = /(?:\+?([\d|o|O]{1,3}))?[-. (]*([\d|o|O]{3})[-. )]*([\d|o|O]{3,4})[-. ]*([\d|o|O]{4})/; //matches most phone numbers w/wo hyphen, dots, spaces, country code
const spacedPattern = /([\d|o|O]+\s*){7,11}/; //check for spaced numbers
const substitutionPattern = /([\d|o|O]+([\w|\*])+[\d|o|O]+[\w|\*]*){2,}/g; //check for tricks like 038tam88888, 038*88888, 03888888bay
const substitutionKey = /\s*([\w|\*])+\s*[\=\:]\s*\d+/g; //check for substitution keys like x = 3, *:4
const Patterns = [pattern, substitutionPattern, spacedPattern];

function removeSubstitutionKey(text: string): string {
  if (substitutionKey.test(text)) {
    const matches = text.match(substitutionKey);
    return text.replace(matches[0], '');
  }
  else return text
}

export function cleanPhoneNumber(text: string, patterns = Patterns): string {
  const textSubstitutionKeyRemoved = removeSubstitutionKey(text);
  for (const pattern of patterns) {
    if (pattern.test(textSubstitutionKeyRemoved)) {
      const matches = textSubstitutionKeyRemoved.match(pattern);
      return textSubstitutionKeyRemoved.replace(matches[0].trim(), '{{phone_number}}');
    }
  }

  return text;
}

export function cleanAddress(text: string): string {
  return text;
}