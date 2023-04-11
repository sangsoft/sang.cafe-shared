import { SUPPORTED_DISTRICTS, pL } from '../constants';

function removeSubstitutionKey(text: string): string {
  if (!text) {
    return text;
  }
  if (substitutionKey.test(text)) {
    const matches = (text || '').match(substitutionKey);
    return text.replace(matches[0], '');
  } else return text;
}

export function matchWithPatterns(text: string, patterns: RegExp[]): string[] {
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

function matchWithPatternsAndReplace(text: string, patterns: RegExp[], placeholder: string): string {
  const matches = matchWithPatterns(text, patterns);
  return (matches || []).reduce((result: string, match: string) => {
    const formattedMatch = match.trim().replace(/,$/, '');
    return result.replace(formattedMatch, placeholder);
  }, text);
}

//clean Phone Numbers
const generalPhonePattern =
  /\b(?:\+?([\d|o|O]{1,3}))?[-. (]*(?:[\d|o|O]{3})[-. )]*(?:[\d|o|O]{3,4})[-. ]*(?:[\d|o|O]{4})/g; //matches most phone numbers w/wo hyphen, dots, spaces, country code
const spacedPhonePattern = /\b(?:[\d|o|O]{3,4}[\s\.]*){3,11}\b/g; //check for spaced numbers
const substitutionPhonePattern = /\b(?:[\d|o|O]+(?:[\w|\*])+[\d|o|O]+[\w|\*]*){2,}\b/g; //check for tricks like 038tam88888, 038*88888, 03888888bay
const substitutionKey = /\s*(?:[\w|\*])\s*[\=]\s*\d{0,2}\b/g; //check for substitution keys like x = 3, *:4
const phonePatterns = [generalPhonePattern, substitutionPhonePattern, spacedPhonePattern];

export function cleanPhoneNumber(text: string, patterns = phonePatterns): string {
  return matchWithPatternsAndReplace(removeSubstitutionKey(text || ''), patterns, '{{phone_number}}');
}

//Clean Address
const districtNames = Object.keys(SUPPORTED_DISTRICTS)
  .reduce((result, city) => [...result, ...SUPPORTED_DISTRICTS[city]], [])
  .join('|'); //Quan 1|Quan 2|...
const streetNamePattern = new RegExp(`(?:phố|đường)\\s(?:\\s?[A-Z][${pL}]+)+`, 'g');
const streetNameWithNumberPattern = new RegExp(
  `(?:số|ngõ|ngách)?\\s?\\d{1,3}(?:\\/\\d{1,3})?\\s(?:phố|đường)?s?(?:(?!${districtNames}|[Qq]uận|[Hh]uyện)\\s?[A-ZĐ][${pL}]+,?\\s?)+`,
  'g',
);

const streetPatterns = [streetNamePattern, streetNameWithNumberPattern];

export function cleanAddress(text: string, patterns = streetPatterns): string {
  return matchWithPatternsAndReplace(text, patterns, '{{address}}');
}

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
export interface PremiseParsedDetail {
  address: string;
  users: { displayName: string; idNumber: string }[];
}

export function extractPremiseDetail(text: string): PremiseParsedDetail[] {
  const lines = text.split('  - ');
  const users = [];
  let address = [];
  let markTaxCodeROrBusinessLicense = false;
  let markTaxCodeRAndBusinessLicense = false;
  const premiseRe = /(\(\*\) Tài sản:\s*(- Loai:.*))\s*((\(\*\) Đương sự:)\s*(- Ben:.*\s*)+)/gm;

  const addressRe = /(So nha|Dia chi):(.+)/gm;

  const TaxCodeRe = /Ben:(.+); Vai tro:(.+?); (.+?)(Ma thue:)(\d+)/gm;
  const isNullTaxCodeRe = /Ben:(.+); Vai tro:(.+?); (.+?)(Ma thue:)/gm;

  const BusinessLicenseRe = /Ben:(.+); Vai tro:(.+?); (.+?)(Giay phep KD:)(\d+)/gm;
  const isNullBusinessLicenseRe = /Ben:(.+); Vai tro:(.+?); (.+?)(Giay phep KD:)/gm;

  const userRes = /Ben:(.+); Vai tro:(.+?); (.+?)(So CMT,HC:)(\d+)/gm;
  const isNullIdNumberUserRe = /Ben:(.+); Vai tro:(.+?); (.+?)(So CMT,HC:)/gm;

  for (let i = 0; i < lines.length; i++) {
    const lineResults = lines[i].split(premiseRe);
    for (let i = 0; i < lineResults.length; i++) {
      const lineResult = lineResults[i];
      if (lineResult.includes('So nha') || (lineResult.includes('Dia chi') && !lineResult.includes('Ben'))) {
        const newAddress = lineResult.split(addressRe)[2];
        address.push(newAddress);
      }
      console.log(lineResult);
      if (lineResult.includes('Ben:')) {
        if (lineResult.includes('So CMT,HC')) {
          const displayName = lineResult.split(userRes)[3]
            ? lineResult.split(userRes)[3].split(',')[0]
            : lineResult.split(isNullIdNumberUserRe)[3].split(',')[0];
          const idNumber = lineResult.split(userRes)[5] ? lineResult.split(userRes)[5] : '';
          users.push({ displayName, idNumber });
        }
        if (
          (lineResult.toLowerCase().includes('ma so thue') ||
            lineResult.toLowerCase().includes('ma thue') ||
            lineResult.toLowerCase().includes('mst')) &&
          (lineResult.toLowerCase().includes('giay phep kinh doanh') ||
            lineResult.toLowerCase().includes('giay phep kd') ||
            lineResult.toLowerCase().includes('gpkd'))
        ) {
          const displayName = lineResult.split(TaxCodeRe)[3]
            ? lineResult.split(TaxCodeRe)[3].split(',')[0]
            : lineResult.split(isNullTaxCodeRe)[3].split(',')[0];
          const idNumber = lineResult.split(TaxCodeRe)[5]
            ? lineResult.split(TaxCodeRe)[5]
            : lineResult.split(BusinessLicenseRe)[5];
          users.push({ displayName, idNumber });
          markTaxCodeROrBusinessLicense = true;
        }

        if (
          (lineResult.toLowerCase().includes('ma so thue') || lineResult.toLowerCase().includes('ma thue')) &&
          !markTaxCodeROrBusinessLicense
        ) {
          const displayName = lineResult.split(TaxCodeRe)[3]
            ? lineResult.split(TaxCodeRe)[3]
            : lineResult.split(isNullTaxCodeRe)[3];
          const idNumber = lineResult.split(TaxCodeRe)[5] ? lineResult.split(TaxCodeRe)[5] : '';
          users.push({ displayName, idNumber });
          markTaxCodeRAndBusinessLicense = true;
        }

        if (
          (lineResult.toLowerCase().includes('giay phep kinh doanh') ||
            lineResult.toLowerCase().includes('giay phep kd') ||
            lineResult.toLowerCase().includes('gpkd')) &&
          !markTaxCodeROrBusinessLicense
        ) {
          const displayName = lineResult.split(BusinessLicenseRe)[3]
            ? lineResult.split(BusinessLicenseRe)[3]
            : lineResult.split(isNullBusinessLicenseRe)[3];
          const idNumber = lineResult.split(BusinessLicenseRe)[5] ? lineResult.split(BusinessLicenseRe)[5] : '';
          users.push({ displayName, idNumber });
          markTaxCodeRAndBusinessLicense = true;
        }
        if (
          (lineResult.toLowerCase().includes('công ty') ||
            lineResult.toLowerCase().includes('cty') ||
            lineResult.toLowerCase().includes('tnhh') ||
            lineResult.toLowerCase().includes('tmcp')) &&
          !markTaxCodeRAndBusinessLicense &&
          !markTaxCodeROrBusinessLicense
        ) {
          const displayName = lineResult.split(';')[2].split(';')[0];
          const idNumber = lineResult.split(':')[3] ? lineResult.split(':')[3].split(';')[0] : '';
          users.push({ displayName, idNumber });
        }
      }
    }
  }
  // console.log(address);
  // console.log(users);

  return [{ address: address[0], users }];
}
