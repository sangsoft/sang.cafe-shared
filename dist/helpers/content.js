"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pattern = /(?:\+?([\d|o|O]{1,3}))?[-. (]*(?:[\d|o|O]{3})[-. )]*(?:[\d|o|O]{3,4})[-. ]*(?:[\d|o|O]{4})/g; //matches most phone numbers w/wo hyphen, dots, spaces, country code
const spacedPattern = /(?:[\d|o|O]+\s*){7,11}/g; //check for spaced numbers
const substitutionPattern = /(?:[\d|o|O]+(?:[\w|\*])+[\d|o|O]+[\w|\*]*){2,}/g; //check for tricks like 038tam88888, 038*88888, 03888888bay
const substitutionKey = /\s*(?:[\w|\*])+\s*[\=\:]\s*\d+/g; //check for substitution keys like x = 3, *:4
const Patterns = [pattern, substitutionPattern, spacedPattern];
function removeSubstitutionKey(text) {
    if (substitutionKey.test(text)) {
        const matches = text.match(substitutionKey);
        return text.replace(matches[0], '');
    }
    else
        return text;
}
function cleanPhoneNumber(text, patterns = Patterns) {
    const output = patterns.reduce((result, pattern) => {
        const matches = result.match(pattern);
        return (matches || []).reduce((result, match) => {
            return result.replace(match.trim(), '{{phone_number}}');
        }, result);
    }, removeSubstitutionKey(text));
    return output;
}
exports.cleanPhoneNumber = cleanPhoneNumber;
function cleanAddress(text) {
    return text;
}
exports.cleanAddress = cleanAddress;
//# sourceMappingURL=content.js.map