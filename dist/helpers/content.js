"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
//clean Phone Numbers
const generalPhonePattern = /\b(?:\+?([\d|o|O]{1,3}))?[-. (]*(?:[\d|o|O]{3})[-. )]*(?:[\d|o|O]{3,4})[-. ]*(?:[\d|o|O]{4})/g; //matches most phone numbers w/wo hyphen, dots, spaces, country code
const spacedPhonePattern = /\b(?:[\d|o|O]{3,4}[\s\.]*){3,11}\b/g; //check for spaced numbers
const substitutionPhonePattern = /\b(?:[\d|o|O]+(?:[\w|\*])+[\d|o|O]+[\w|\*]*){2,}\b/g; //check for tricks like 038tam88888, 038*88888, 03888888bay
const substitutionKey = /\s*(?:[\w|\*])\s*[\=]\s*\d{0,2}\b/g; //check for substitution keys like x = 3, *:4
const phonePatterns = [generalPhonePattern, substitutionPhonePattern, spacedPhonePattern];
function removeSubstitutionKey(text) {
    if (substitutionKey.test(text)) {
        const matches = text.match(substitutionKey);
        return text.replace(matches[0], '');
    }
    else
        return text;
}
function matchPatternsAndReplace(text, patterns, placeholder) {
    const output = patterns.reduce((result, pattern) => {
        const matches = result.match(pattern);
        return (matches || []).reduce((result, match) => {
            const formattedMatch = match.trim().replace(/,$/, '');
            return result.replace(formattedMatch, placeholder);
        }, result);
    }, text);
    return output;
}
function cleanPhoneNumber(text, patterns = phonePatterns) {
    return matchPatternsAndReplace(removeSubstitutionKey(text), patterns, '{{phone_number}}');
}
exports.cleanPhoneNumber = cleanPhoneNumber;
//Clean Address
const districtNames = Object.keys(constants_1.SUPPORTED_DISTRICTS).reduce((result, city) => [...result, ...constants_1.SUPPORTED_DISTRICTS[city]], []).join('|'); //Quan 1|Quan 2|...
const streetNamePattern = new RegExp(`(?:phố|đường)\\s(?:\\s?[A-Z][${constants_1.pL}]+)+`, 'g');
const streetNameWithNumberPattern = new RegExp(`(?:số|ngõ|ngách)?\\s?\\d{1,3}(?:\\/\\d{1,3})?\\s(?:phố|đường)?s?(?:(?!${districtNames}|[Qq]uận|[Hh]uyện)\\s?[A-ZĐ][${constants_1.pL}]+,?\\s?)+`, 'g');
const streetPatterns = [streetNamePattern, streetNameWithNumberPattern];
function cleanAddress(text, patterns = streetPatterns) {
    return matchPatternsAndReplace(text, patterns, '{{address}}');
}
exports.cleanAddress = cleanAddress;
//# sourceMappingURL=content.js.map