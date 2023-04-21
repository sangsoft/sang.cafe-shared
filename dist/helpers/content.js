"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPremiseDetail = exports.cleanContent = exports.cleanAddress = exports.cleanPhoneNumber = exports.matchWithPatterns = void 0;
const constants_1 = require("../constants");
function removeSubstitutionKey(text) {
    if (!text) {
        return text;
    }
    if (substitutionKey.test(text)) {
        const matches = (text || '').match(substitutionKey);
        return text.replace(matches[0], '');
    }
    else
        return text;
}
function matchWithPatterns(text, patterns) {
    if (!text) {
        return [];
    }
    return patterns
        .reduce((result, pattern) => {
        const matches = (text || '').match(pattern);
        return result.concat(matches);
    }, [])
        .filter((_) => !!_);
}
exports.matchWithPatterns = matchWithPatterns;
function matchWithPatternsAndReplace(text, patterns, placeholder) {
    const matches = matchWithPatterns(text, patterns);
    return (matches || []).reduce((result, match) => {
        const formattedMatch = match.trim().replace(/,$/, '');
        return result.replace(formattedMatch, placeholder);
    }, text);
}
//clean Phone Numbers
const generalPhonePattern = /\b(?:\+?([\d|o|O]{1,3}))?[-. (]*(?:[\d|o|O]{3})[-. )]*(?:[\d|o|O]{3,4})[-. ]*(?:[\d|o|O]{4})/g; //matches most phone numbers w/wo hyphen, dots, spaces, country code
const spacedPhonePattern = /\b(?:[\d|o|O]{3,4}[\s\.]*){3,11}\b/g; //check for spaced numbers
const substitutionPhonePattern = /\b(?:[\d|o|O]+(?:[\w|\*])+[\d|o|O]+[\w|\*]*){2,}\b/g; //check for tricks like 038tam88888, 038*88888, 03888888bay
const substitutionKey = /\s*(?:[\w|\*])\s*[\=]\s*\d{0,2}\b/g; //check for substitution keys like x = 3, *:4
const phonePatterns = [generalPhonePattern, substitutionPhonePattern, spacedPhonePattern];
function cleanPhoneNumber(text, patterns = phonePatterns) {
    return matchWithPatternsAndReplace(removeSubstitutionKey(text || ''), patterns, '{{phone_number}}');
}
exports.cleanPhoneNumber = cleanPhoneNumber;
//Clean Address
const districtNames = Object.keys(constants_1.SUPPORTED_DISTRICTS)
    .reduce((result, city) => [...result, ...constants_1.SUPPORTED_DISTRICTS[city]], [])
    .join('|'); //Quan 1|Quan 2|...
const streetNamePattern = new RegExp(`(?:phố|đường)\\s(?:\\s?[A-Z][${constants_1.pL}]+)+`, 'g');
const streetNameWithNumberPattern = new RegExp(`(?:số|ngõ|ngách)?\\s?\\d{1,3}(?:\\/\\d{1,3})?\\s(?:phố|đường)?s?(?:(?!${districtNames}|[Qq]uận|[Hh]uyện)\\s?[A-ZĐ][${constants_1.pL}]+,?\\s?)+`, 'g');
const streetPatterns = [streetNamePattern, streetNameWithNumberPattern];
function cleanAddress(text, patterns = streetPatterns) {
    return matchWithPatternsAndReplace(text, patterns, '{{address}}');
}
exports.cleanAddress = cleanAddress;
function cleanContent(text) {
    if (!text) {
        return '';
    }
    return text.trim().replace(/[,;]/g, '');
}
exports.cleanContent = cleanContent;
function extractAddressFromDocument(text) {
    // https://regex101.com/r/3BFsJf/1
    const addressRe = /(So nha|Dia chi):(.+)/gm;
    const match = [...text.matchAll(addressRe)];
    return (match[0][2] || '').trim();
}
function replaceAllFromDocument(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
function extractUserInfoFromDocument(text) {
    // const userInfoRe = /- Ben:(.+); Vai tro:(.+?); (.+?)((So CMT,HC|Ma thue|Giay phep KD):)(\d+)/gm;
    const userInfoRe = /- Ben:(.+); Vai tro:(.+?); ((.+?)((So CMT,HC|Ma thue|Ma so thue|MST|Giay phep KD|Giay phep kinh doanh|GPKD):)(\d+|\S\w+|\W)((.+?)((Ma thue|Ma so thue|MST|Giay phep KD|Giay phep kinh doanh|GPKD):)(\d+|\S\w+|\W)|)|(.+))/gm;
    // https://regex101.com/r/p8s3X8/2
    // https://regex101.com/r/ERX0WQ/1
    const matches = [...text.matchAll(userInfoRe)];
    return matches.map((match) => {
        var _a;
        return {
            displayName: cleanContent(match[4] ? match[4] : match[3]),
            idNumber: cleanContent(((_a = match[7]) === null || _a === void 0 ? void 0 : _a.length) > 1 ? match[7] : match[12] ? match[12] : ''),
            raw: match[0],
        };
    });
}
function extractPremiseDetail(text) {
    // https://regex101.com/r/pqPsL1/3
    const cleanedText = replaceAllFromDocument(text, '', '');
    const premiseRe = /(\(\*\) Tài sản:\s*(- .*))\s*((\(\*\) Đương sự:)\s*(- Ben:.*\s*)+)/gm;
    const addressMatches = [...cleanedText.matchAll(premiseRe)];
    return addressMatches.map((match) => {
        return {
            address: extractAddressFromDocument(match[2]),
            raw: match[2],
            users: extractUserInfoFromDocument(match[3]),
        };
    });
}
exports.extractPremiseDetail = extractPremiseDetail;
//# sourceMappingURL=content.js.map