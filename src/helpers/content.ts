const pattern = /(?:\+?([\d|o|O]{1,3}))?[-. (]*([\d|o|O]{3})[-. )]*([\d|o|O]{3,4})[-. ]*([\d|o|O]{4})/; //matches most phone numbers w/wo hyphen, dots, spaces, country code
//const advancedPattern = /(?:\+?([\d|o|O]{1,3}))?[-. (]*([\d|o|O]+\w+([\d|o|O]+)|\w+){10,}/; 
const advancedPattern = /([\d|o|O]+(\w+|\W+|\*)([\d|o|O]+)|\w+){10,}/; //check for tricks like 038tam88888
const spacedPattern = /([\d|o|O]+\s*){7,11}/; //check for spaced numbers

const Patterns = [pattern, advancedPattern, spacedPattern];

export function cleanPhoneNumber(text: string, patterns = Patterns): string {
  var output: string;
  for (const pattern of patterns) {
    if (pattern.test(text)) {
      const matches = text.match(pattern);
      const output = text.replace(matches[0].trim(), '{{phone_number}}');
      return output
    }
  } 
    return text
  }
  /*
  if (pattern.test(text) || advancedPattern.test(text)) {
    const matches = pattern.exec(text) || advancedPattern.exec(text);
    output = text.replace(matches[0].trim(), '{{phone_number}}');
    console.log(matches[0].trim())
    return output;
  } else {
    return text;
  }
  */
