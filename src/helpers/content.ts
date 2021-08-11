const pattern = /(?:\+?([\d|o|O]{1,3}))?[-. (]*([\d|o|O]{3})[-. )]*([\d|o|O]{3,4})[-. ]*([\d|o|O]{4})/; //matches most phone numbers w/wo hyphen, dots, spaces, country code
const advancedPattern = /(?:\+?([\d|o|O]{1,3}))?[-. (]*([\d|o|O]+\w{2,}([\d|o|O]+)|\w+){10,}/; //check for tricks like 038tam88888

export function cleanPhoneNumber(text: string): string {
  var output: string;
  if (pattern.test(text) || advancedPattern.test(text)) {
    const matches = pattern.exec(text) || advancedPattern.exec(text);
    output = text.replace(matches[0].trim(), '{{phone_number}}');
    console.log(matches[0].trim())
    return output;
  } else {
    return text;
  }
}