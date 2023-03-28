"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractPremiseDetail = exports.cleanAddress = exports.cleanPhoneNumber = exports.matchWithPatterns = void 0;
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
// function extract premise detail from a string into a list of display name and id number
// input:
// (*) Nhóm HS:
//   - * Nhom HS:Ủy quyền; So CC:005881; Phong CC: VPCC Văn Thị Mỹ Đức; CC vien:Cao Hoàng Lân; Ngay cap so: 29/06/2021
// - Ghi chú: xin phép xây dựng sửa chữa
// (*) Tài sản:
//   - Loai:Nhà ở So seri:0 So vao so:2154/2007/UB-GCN Dia chi:A65(Phải) Nguyễn Trãi,Phường Nguyễn Cư Trinh,Quận 1,TP. Hồ Chí Minh
// (*) Đương sự:
//   - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); NGUYỄN CÔNG MINH, So CMT,HC:079055000834, Ngay sinh:00/00/1955
//   - Ben:Bên ủy quyền; Vai tro:Bên ủy quyền (Bên A); Đoàn Thị Kim Chi, So CMT,HC:079155000278, Ngay sinh:00/00/1955
//   - Ben:Bên nhận ủy quyền; Vai tro:Bên nhận ủy quyền (Bên B); Đinh Thị Thu Thủy, So CMT,HC:023845562, Ngay sinh:00/00/1984
// output: [{displayName: "NGUYỄN CÔNG MINH", idNumber: "079055000834"}, {displayName: "Đoàn Thị Kim Chi", idNumber: "079155000278"}, {displayName: "Đinh Thị Thu Thủy", idNumber: "023845562"}]
function extractPremiseDetail(text) {
    const lines = text.split('  - ');
    const result = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('So CMT,HC')) {
            const displayName = line.split(',')[0].split(':')[1];
            const idNumber = line.split(',')[1].split(':')[1];
            result.push({ displayName, idNumber });
        }
    }
    return result;
}
exports.extractPremiseDetail = extractPremiseDetail;
//# sourceMappingURL=content.js.map